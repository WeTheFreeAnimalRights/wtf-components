import { Mic, Video, RefreshCcw } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { isFunction } from 'lodash-es';
import { useTranslations } from '../../../hooks/useTranslations';
import { Alert } from '../../Alert';
import { Button } from '../../Button';
import { Modal, ModalContainer } from '../../Modal';
import { Select } from '../../Select';

const DEFAULT_SENTINEL = '__default__';

export const MediaAccessModal = ({
  open,
  onClose,
  onDevicesSelected, // optional: ({ audioDeviceId, videoDeviceId }) => void
  cam = true, // camera optional
  // mic is ALWAYS required in this flow
  ...props
}) => {
  const { t } = useTranslations();

  // Permission / flow state
  const [hasRequested, setHasRequested] = useState(false);
  const [camGranted, setCamGranted] = useState(false);
  const [micGranted, setMicGranted] = useState(false);

  // Device lists + selections
  const [videoInputs, setVideoInputs] = useState([]);
  const [audioInputs, setAudioInputs] = useState([]);
  const [selectedCamId, setSelectedCamId] = useState('');
  const [selectedMicId, setSelectedMicId] = useState('');

  // UI state
  const [labelsAvailable, setLabelsAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Autofocus ref for Continue
  const continueBtnRef = useRef(null);

  // ----- Device helpers -----
  const parseDevices = useCallback((devices) => {
    const vids = [];
    const auds = [];
    devices.forEach((d) => {
      if (d.kind === 'videoinput') {
        vids.push({
          deviceId: d.deviceId,
          label: d.label || 'Camera',
          kind: d.kind,
          groupId: d.groupId,
        });
      } else if (d.kind === 'audioinput') {
        auds.push({
          deviceId: d.deviceId,
          label: d.label || 'Microphone',
          kind: d.kind,
          groupId: d.groupId,
        });
      }
    });
    setVideoInputs(vids);
    setAudioInputs(auds);

    if (!selectedCamId && vids.length) {
      const first = vids[0].deviceId && String(vids[0].deviceId).length
        ? String(vids[0].deviceId)
        : `${DEFAULT_SENTINEL}-cam-0`;
      setSelectedCamId(first);
    }
    if (!selectedMicId && auds.length) {
      const first = auds[0].deviceId && String(auds[0].deviceId).length
        ? String(auds[0].deviceId)
        : `${DEFAULT_SENTINEL}-mic-0`;
      setSelectedMicId(first);
    }
  }, [selectedCamId, selectedMicId]);

  const enumerate = useCallback(async () => {
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      setLabelsAvailable(list.some((d) => !!d.label));
      parseDevices(list);

      setSelectedMicId((prev) => {
        if (!prev || prev.includes(DEFAULT_SENTINEL)) {
          const firstReal = list.find((d) => d.kind === 'audioinput' && d.deviceId)?.deviceId;
          return firstReal ? String(firstReal) : prev || `${DEFAULT_SENTINEL}-mic-0`;
        }
        return prev;
      });
      setSelectedCamId((prev) => {
        if (!prev || prev.includes(DEFAULT_SENTINEL)) {
          const firstReal = list.find((d) => d.kind === 'videoinput' && d.deviceId)?.deviceId;
          return firstReal ? String(firstReal) : prev || `${DEFAULT_SENTINEL}-cam-0`;
        }
        return prev;
      });
    } catch (err) {
      console.error('enumerateDevices failed', err);
    }
  }, [parseDevices]);

  // Pre-check existing permissions; if granted, skip the "Grant" step
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    (async () => {
      try {
        const canQuery = !!navigator.permissions?.query;
        let micState = null;
        let camState = null;

        if (canQuery) {
          micState = await navigator.permissions.query({ name: 'microphone' }).catch(() => null);
          camState = cam ? await navigator.permissions.query({ name: 'camera' }).catch(() => null) : null;
        }

        const micIsGranted = micState?.state === 'granted';
        const camIsGranted = cam ? (camState?.state === 'granted') : false;

        await enumerate();

        if (!cancelled) {
          if (micIsGranted || camIsGranted) {
            setMicGranted(micIsGranted);
            setCamGranted(camIsGranted);
            setHasRequested(true);
          }
        }
      } catch (e) {
        console.debug('Permission pre-check skipped', e);
        await enumerate();
      }
    })();

    return () => { cancelled = true; };
  }, [open, cam, enumerate]);

  // Hot-plug listener
  useEffect(() => {
    if (!navigator.mediaDevices?.addEventListener) return;
    const handler = () => enumerate();
    navigator.mediaDevices.addEventListener('devicechange', handler);
    return () => navigator.mediaDevices.removeEventListener('devicechange', handler);
  }, [enumerate]);

  // Autofocus Continue when selectors appear
  useEffect(() => {
    if (hasRequested && (micGranted || camGranted)) {
      // wait a tick so the button is mounted
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => continueBtnRef.current?.focus?.());
      } else {
        setTimeout(() => continueBtnRef.current?.focus?.(), 0);
      }
    }
  }, [hasRequested, micGranted, camGranted]);

  // ----- Request permission first (broad) -----
  const requestPermissions = async () => {
    try {
      setErrorMessage('');
      setHasRequested(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: !!cam,
        audio: true, // mic mandatory
      });

      setCamGranted(!!cam && stream.getVideoTracks().length > 0);
      setMicGranted(stream.getAudioTracks().length > 0);

      await enumerate();
      stream.getTracks().forEach((t) => t.stop());
    } catch (error) {
      console.error('Permission request failed:', error);
      setCamGranted(false);
      setMicGranted(false);

      if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
        setErrorMessage(
          t?.('media-access-modal-permission-denied') ||
          'Permission denied. We need microphone access for calls. Please enable it in your browser settings.'
        );
      } else if (error?.name === 'NotFoundError') {
        setErrorMessage(
          t?.('media-access-modal-no-devices-found') ||
          'No compatible microphone (or camera) was found. Please connect a device and try again.'
        );
      } else {
        setErrorMessage(
          (t?.('media-access-modal-generic-error-prefix') ||
            'An error occurred while trying to access your microphone/camera. ') +
          (error?.message || '')
        );
      }
    }
  };

  // ----- Validate selections and finish -----
  const finish = () => {
    if (!micGranted) {
      setErrorMessage(
        t?.('media-access-modal-mic-required-permission') ||
        'Microphone access is required. Please allow microphone permissions.'
      );
      return;
    }
    if (!selectedMicId) {
      setErrorMessage(
        t?.('media-access-modal-select-microphone-required') ||
        'Please select a microphone.'
      );
      return;
    }

    if (isFunction(onDevicesSelected)) {
      const isMicSentinel = selectedMicId.includes(DEFAULT_SENTINEL);
      const isCamSentinel = selectedCamId.includes(DEFAULT_SENTINEL);

      onDevicesSelected({
        audioDeviceId: isMicSentinel ? '' : selectedMicId,
        videoDeviceId: camGranted ? (isCamSentinel ? '' : selectedCamId) : '',
      });
    }
    if (isFunction(onClose)) onClose();
  };

  const camOptions = videoInputs.map((d, idx) => ({
    value: d.deviceId && String(d.deviceId).length
      ? String(d.deviceId)
      : `${DEFAULT_SENTINEL}-cam-${idx}`,
    label: d.label || (idx === 0 ? 'Default camera' : `Camera ${idx + 1}`),
  }));

  const micOptions = audioInputs.map((d, idx) => ({
    value: d.deviceId && String(d.deviceId).length
      ? String(d.deviceId)
      : `${DEFAULT_SENTINEL}-mic-${idx}`,
    label: d.label || (idx === 0 ? 'Default microphone' : `Microphone ${idx + 1}`),
  }));

  return (
    <ModalContainer
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          const canClose = micGranted && !!selectedMicId;
          if (canClose) {
            if (isFunction(onClose)) onClose();
          } else {
            setErrorMessage(
              t?.('media-access-modal-mic-required-permission') ||
              'Microphone access is required. Please allow microphone and select a device to continue.'
            );
          }
        }
      }}
    >
      <Modal
        title={
          <div className="px-6 py-5 space-y-0 bg-gray-800 text-white rounded-t-md pe-12 sm:pe-6">
            {t('media-access-modal-title')}{' '}
          </div>
        }
        description={t('media-access-modal-description')}
        showDescription={false}
        showCloseButton={false}
        className="w-10/12 sm:w-2/3 lg:w-[900px] h-auto p-0 gap-0 border-0 max-w-[500px] rounded-md"
        contentClassName="bg-gray-100 dark:bg-gray-900 rounded-b-md max-h-[75vh] pt-6"
        headerClassName="space-y-0 border-b border-gray-300 dark:border-gray-500"
        setWidth={false}
        overflow
        {...props}
      >
        <div className="p-6 pt-0">
          <div className="flex flex-row items-center gap-2 mb-2">
            <Mic className="w-6 h-6" />
            {cam && <Video className="w-6 h-6" />}
          </div>

          <h2 className="text-lg font-bold">
            {cam
              ? (t('media-access-modal-enable-cam-mic-title') || 'Enable your camera and microphone')
              : (t('media-access-modal-enable-mic-title') || 'Enable your microphone')}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {cam
              ? (t('media-access-modal-enable-cam-mic-description') ||
                'We need microphone access (required) and camera (optional) for calls.')
              : (t('media-access-modal-enable-mic-description') ||
                'We need microphone access for calls.')}
          </p>

          {/* Step 1: ask for permissions — skipped automatically if already granted */}
          {!hasRequested && (
            <>
              <Button className="w-full mt-4" onClick={requestPermissions}>
                {t('media-access-modal-grant-permissions')}
              </Button>
              {!labelsAvailable && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t('media-access-modal-labels-hidden-hint') ||
                    'Device names may appear generic until you grant access. Click “Grant permissions” to reveal exact names.'}
                </p>
              )}
            </>
          )}

          {/* Step 2: selectors (mic required; cam optional) */}
          {hasRequested && (micGranted || camGranted) && (
            <div className="mt-4 space-y-3">
              {/* Microphone (REQUIRED) */}
              {micGranted ? (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('media-access-modal-microphone-label') || 'Microphone'}
                  </label>
                  <div className="flex gap-2">
                    <Select
                      value={selectedMicId}
                      onValueChange={setSelectedMicId}
                      options={micOptions}
                      placeholder={
                        micOptions.length
                          ? t('media-access-modal-microphone-placeholder') || 'Choose microphone'
                          : t('media-access-modal-no-microphone') || 'No microphone found'
                      }
                      align="start"
                      disabled={micOptions.length === 0}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={enumerate}
                      className="shrink-0"
                      title={t('media-access-modal-refresh') || 'Refresh'}
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert
                  className="mt-2"
                  variant="destructive"
                  title={t('media-access-modal-error-title')}
                >
                  {t?.('media-access-modal-mic-required-permission') ||
                    'Microphone access is required. Please enable it in your browser settings and try again.'}
                </Alert>
              )}

              {/* Camera (OPTIONAL) */}
              {cam && camGranted && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('media-access-modal-camera-label') || 'Camera'}
                  </label>
                  <div className="flex gap-2">
                    <Select
                      value={selectedCamId}
                      onValueChange={setSelectedCamId}
                      options={camOptions}
                      placeholder={
                        camOptions.length
                          ? t('media-access-modal-camera-placeholder') || 'Choose camera'
                          : t('media-access-modal-no-camera') || 'No camera found'
                      }
                      align="start"
                      disabled={camOptions.length === 0}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={enumerate}
                      className="shrink-0"
                      title={t('media-access-modal-refresh') || 'Refresh'}
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Button
                ref={continueBtnRef}
                autoFocus
                className="w-full mt-6"
                onClick={finish}
              >
                {t('common-continue') || 'Continue'}
              </Button>
            </div>
          )}

          {/* Errors (permission or validation) */}
          {errorMessage && (
            <Alert
              className="mt-6"
              variant="destructive"
              title={t('media-access-modal-error-title')}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Help text when permission denied */}
          {errorMessage && (
            <div className="mt-6">
              <h3 className="font-bold">
                {t('media-access-modal-how-to-enable-permissions-title')}
              </h3>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('media-access-modal-how-to-enable-permissions-description')}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </ModalContainer>
  );
};

MediaAccessModal.displayName = 'MediaAccessModal';
