import { Mic, Video, RefreshCcw } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
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
  cam = true,        // camera optional
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
  const [selectedCamId, setSelectedCamId] = useState(''); // allow sentinel/real id later
  const [selectedMicId, setSelectedMicId] = useState(''); // mic required

  // UI state
  const [labelsAvailable, setLabelsAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ----- Device helpers -----
  const parseDevices = useCallback((devices) => {
    const vids = [];
    const auds = [];
    devices.forEach((d) => {
      if (d.kind === 'videoinput') {
        vids.push({
          deviceId: d.deviceId, // may be '' before permission
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

    // If no prior selection, preselect first option (may be sentinel pre-permission)
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

      // Normalize selections if they still point to a sentinel and we now have real ids
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

  // When modal opens, enumerate (labels may be empty until permission)
  useEffect(() => {
    if (!open) return;
    enumerate();
  }, [open, enumerate]);

  // Hot-plug listener
  useEffect(() => {
    if (!navigator.mediaDevices?.addEventListener) return;
    const handler = () => enumerate();
    navigator.mediaDevices.addEventListener('devicechange', handler);
    return () => navigator.mediaDevices.removeEventListener('devicechange', handler);
  }, [enumerate]);

  // ----- Request permission first (broad) -----
  const requestPermissions = async () => {
    try {
      setErrorMessage('');
      setHasRequested(true);

      const wantAudio = true;          // mic is mandatory
      const wantVideo = !!cam;         // cam optional

      const stream = await navigator.mediaDevices.getUserMedia({
        video: wantVideo,
        audio: wantAudio,
      });

      const gotVideo = stream.getVideoTracks().length > 0;
      const gotAudio = stream.getAudioTracks().length > 0;

      setCamGranted(!!cam && gotVideo);
      setMicGranted(gotAudio);

      await enumerate(); // labels appear post-grant

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
    // Mic required: must have permission
    if (!micGranted) {
      setErrorMessage(
        t?.('media-access-modal-mic-required-permission') ||
          'Microphone access is required. Please allow microphone permissions.'
      );
      return;
    }

    // Mic selection required (sentinel counts as "system default")
    if (!selectedMicId) {
      setErrorMessage(
        t?.('media-access-modal-select-microphone-required') || 'Please select a microphone.'
      );
      return;
    }

    if (isFunction(onDevicesSelected)) {
      const isMicSentinel = selectedMicId.includes(DEFAULT_SENTINEL);
      const isCamSentinel = selectedCamId.includes(DEFAULT_SENTINEL);

      onDevicesSelected({
        // If sentinel, pass empty string to indicate "system default" to caller
        audioDeviceId: isMicSentinel ? '' : selectedMicId,
        videoDeviceId: camGranted ? (isCamSentinel ? '' : selectedCamId) : '',
      });
    }
    if (isFunction(onClose)) onClose();
  };

  // Map to Select options (never empty strings)
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
        // Prevent closing until mic is granted and something is selected
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
        description={t('media-access-modal-desc ription')}
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

          {/* Step 1: ask for permissions */}
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

          {/* Step 2: show selectors (mic required; cam optional) */}
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

              <Button className="w-full mt-6" onClick={finish}>
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
