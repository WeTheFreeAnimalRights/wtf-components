import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from '../../Alert';
import { Button } from '../../Button';
import { Modal, ModalContainer } from '../../Modal';
import { Select } from '../../Select';
import { Checkbox } from '../../Checkbox';
import { ParticipantNoCamera } from './ParticipantNoCamera';
import { useTranslations } from '../../../hooks/useTranslations';
import { useCountdown } from '../../../hooks/useCountdown';
import { Tooltip } from '../../Tooltip';

export const MediaAccessModal = ({
    open,
    onClose,
    onCancel,
    onDevicesSelected,
    children,
    cam = true,
    startWithCameraOn = true,
    countdown,
    continueDisabled,
    cancelDisabled,
    continueTooltip,
    ...props
}) => {
    const { t } = useTranslations();
    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedAudio, setSelectedAudio] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [requesting, setRequesting] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [error, setError] = useState('');
    const [cameraOn, setCameraOn] = useState(startWithCameraOn);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    const readDevices = useCallback(async () => {
        if (!navigator.mediaDevices?.enumerateDevices) return;
        try {
            const list = await navigator.mediaDevices.enumerateDevices();
            const videos = list.filter((d) => d.kind === 'videoinput');
            const audios = list.filter((d) => d.kind === 'audioinput');
            setVideoDevices(videos);
            setAudioDevices(audios);

            const videoIds = videos.map(
                (d, idx) => d.deviceId || `video-${idx}`
            );
            const audioIds = audios.map(
                (d, idx) => d.deviceId || `audio-${idx}`
            );

            setSelectedVideo((prev) => {
                if (prev && videoIds.includes(prev)) return prev;
                return videoIds[0] || '';
            });

            setSelectedAudio((prev) => {
                if (prev && audioIds.includes(prev)) return prev;
                return audioIds[0] || '';
            });
        } catch (err) {
            console.error('Failed to enumerate devices', err);
        }
    }, []);

    const startStream = useCallback(async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setError('This browser cannot access media devices.');
            return;
        }

        setRequesting(true);
        setError('');

        try {
            const shouldUseExactVideo =
                !!selectedVideo &&
                selectedVideo !== 'default' &&
                !selectedVideo.startsWith('video-');
            const shouldUseExactAudio =
                !!selectedAudio &&
                selectedAudio !== 'default' &&
                !selectedAudio.startsWith('audio-');

            const constraints = {
                audio: shouldUseExactAudio
                    ? { deviceId: { exact: selectedAudio } }
                    : true,
                video: cam
                    ? shouldUseExactVideo
                        ? { deviceId: { exact: selectedVideo } }
                        : true
                    : false,
            };

            const stream =
                await navigator.mediaDevices.getUserMedia(constraints);
            stopStream();

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                if (typeof videoRef.current.play === 'function') {
                    videoRef.current.play().catch(() => {});
                }
            }
            if (cam) {
                stream.getVideoTracks().forEach((track) => {
                    track.enabled = cameraOn;
                });
            }
            setHasPermission(true);
            await readDevices();
        } catch (err) {
            console.error('Unable to start media preview', err);
            setError(
                err?.message ||
                    'We could not access your microphone/camera. Please allow permissions and try again.'
            );
            setHasPermission(false);
        } finally {
            setRequesting(false);
        }
    }, [cam, readDevices, selectedAudio, selectedVideo, stopStream]);

    const checkExistingPermission = useCallback(async () => {
        if (!navigator.permissions?.query) return;
        try {
            const mic = await navigator.permissions
                .query({ name: 'microphone' })
                .catch(() => null);
            const camera = cam
                ? await navigator.permissions
                      .query({ name: 'camera' })
                      .catch(() => null)
                : null;
            if (
                mic?.state === 'granted' &&
                (!cam || camera?.state === 'granted')
            ) {
                await startStream();
            }
        } catch (err) {
            console.warn('Permission pre-check failed', err);
        }
    }, [cam, startStream]);

    useEffect(() => {
        if (!open) {
            stopStream();
            setHasPermission(false);
            setError('');
            return;
        }
        readDevices();
        checkExistingPermission();
    }, [checkExistingPermission, open, readDevices, stopStream]);

    useEffect(() => {
        if (!open || !hasPermission) return;
        startStream();
    }, [open, hasPermission, selectedAudio, selectedVideo, startStream]);

    useEffect(() => {
        if (!cam || !hasPermission || !streamRef.current) return;
        const stream = streamRef.current;
        stream.getVideoTracks().forEach((track) => {
            track.enabled = cameraOn;
        });
        if (cameraOn && videoRef.current) {
            videoRef.current.srcObject = stream;
            if (typeof videoRef.current.play === 'function') {
                videoRef.current.play().catch(() => {});
            }
        }
    }, [cam, cameraOn, hasPermission]);

    useEffect(() => () => stopStream(), [stopStream]);

    useEffect(() => {
        setCameraOn(startWithCameraOn);
    }, [startWithCameraOn]);

    const handleProceed = () => {
        endCountdown();
        if (onDevicesSelected) {
            onDevicesSelected({
                audioDeviceId: selectedAudio || '',
                videoDeviceId: cam ? selectedVideo || '' : '',
                cameraOn,
            });
        }
        if (onClose) onClose();
    };

    const handleCancel = () => {
        endCountdown();
        setCanceled(true);
        if (onCancel) onCancel();
    };

    const videoOptions = videoDevices.map((device, idx) => ({
        value: device.deviceId || `video-${idx}`,
        label:
            device.label ||
            (device.deviceId === 'default'
                ? t('media-acess-modal-default-camera')
                : t('media-acess-modal-camera-count', {
                      count: idx + 1,
                  })),
    }));

    const audioOptions = audioDevices.map((device, idx) => ({
        value: device.deviceId || `audio-${idx}`,
        label:
            device.label ||
            (device.deviceId === 'default'
                ? t('media-acess-modal-default-microphone')
                : t('media-acess-modal-microphone-count', {
                      count: idx + 1,
                  })),
    }));

    // Countdown
    const {
        value: countdownValue,
        start: startCountdown,
        end: endCountdown,
    } = useCountdown(countdown, () => {
        if (onCancel) onCancel();
    });

    useEffect(() => {
        if (!open) {
            endCountdown();
            return;
        }

        if (countdown !== undefined && countdown !== null) {
            startCountdown();
        }
    }, [countdown, endCountdown, open, startCountdown]);

    return (
        <ModalContainer
            open={open}
            onOpenChange={(value) => {
                if (!value && value === open && onClose && !canceled) onClose();
            }}
        >
            <Modal
                title={t('media-acess-modal-title')}
                description={t('media-acess-modal-description')}
                className={children ? 'w-full max-w-5xl' : 'w-full max-w-xl'}
                contentClassName="max-h-[75vh]"
                showCloseButton={false}
                overflow
                {...props}
            >
                <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
                    <div
                        className={`grid grid-cols-1 ${
                            children ? 'lg:grid-cols-2' : ''
                        } gap-4`}
                    >
                        <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden min-h-[320px] flex flex-col items-stretch">
                            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-full">
                                {cam && hasPermission && cameraOn && (
                                    <video
                                        ref={videoRef}
                                        muted
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover aspect-video"
                                    />
                                )}
                                {hasPermission && (!cam || !cameraOn) && (
                                    <div className="absolute inset-0 flex items-center justify-center left-0 top-0 right-0 bottom-0">
                                        <ParticipantNoCamera name="You" />
                                    </div>
                                )}
                                {!hasPermission && (
                                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 left-0 top-0 right-0 bottom-0">
                                        <div className="text-center text-sm text-gray-200 px-6">
                                            {t(
                                                'media-acess-modal-permission-overlay'
                                            )}
                                        </div>
                                        <Button
                                            onClick={startStream}
                                            disabled={requesting}
                                        >
                                            {requesting
                                                ? t(
                                                      'media-acess-modal-requesting'
                                                  )
                                                : t(
                                                      'media-acess-modal-request-permissions'
                                                  )}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {hasPermission && (
                                <div className="p-4 space-y-2 bg-gray-50 dark:bg-gray-900 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-300">
                                            {t('media-acess-modal-camera')}
                                        </span>
                                        <label className="flex items-center gap-2 text-xs text-gray-200">
                                            <span className="text-muted-foreground">
                                                {cameraOn
                                                    ? t('camera-on')
                                                    : t('camera-off')}
                                            </span>
                                            <Checkbox
                                                className="h-4 w-4"
                                                checked={cameraOn}
                                                disabled={
                                                    !cam || !hasPermission
                                                }
                                                onCheckedChange={(value) =>
                                                    setCameraOn(!!value)
                                                }
                                            />
                                        </label>
                                    </div>

                                    {cam && (
                                        <Select
                                            value={selectedVideo}
                                            onValueChange={setSelectedVideo}
                                            options={videoOptions}
                                            placeholder={t(
                                                'media-acess-modal-choose-camera'
                                            )}
                                            disabled={!hasPermission}
                                        />
                                    )}

                                    <div className="space-y-2">
                                        <span className="text-sm text-gray-300">
                                            {t('media-acess-modal-microphone')}
                                        </span>
                                        <Select
                                            value={selectedAudio}
                                            onValueChange={setSelectedAudio}
                                            options={audioOptions}
                                            placeholder={t(
                                                'media-acess-modal-choose-microphone'
                                            )}
                                            disabled={!hasPermission}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {children && (
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 min-h-[320px] flex items-center justify-center">
                                <div className="w-full flex items-center justify-center">
                                    {children}
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <Alert
                            variant="destructive"
                            title={t('media-acess-modal-error-title')}
                        >
                            {error}
                        </Alert>
                    )}

                    <div className="flex justify-end gap-3">
                        {onCancel && (
                            <Button
                                variant="ghost"
                                onClick={handleCancel}
                                disabled={cancelDisabled}
                            >
                                {t('media-acess-modal-cancel', [
                                    countdownValue,
                                ])}
                            </Button>
                        )}
                        <Tooltip
                            message={
                                continueTooltip ||
                                (!hasPermission
                                    ? t('media-acess-modal-tooltip-permission')
                                    : requesting
                                      ? t(
                                            'media-acess-modal-tooltip-requesting'
                                        )
                                      : t('media-access-modal-toltip-proceed'))
                            }
                            asChild
                            className="max-w-xs text-center"
                        >
                            <div>
                                <Button
                                    onClick={handleProceed}
                                    disabled={
                                        !hasPermission ||
                                        requesting ||
                                        continueDisabled
                                    }
                                >
                                    {t('media-acess-modal-proceed', [
                                        countdownValue,
                                    ])}
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </Modal>
        </ModalContainer>
    );
};

MediaAccessModal.displayName = 'MediaAccessModal';
