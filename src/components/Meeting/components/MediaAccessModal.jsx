import { Mic, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isFunction } from 'lodash-es';
import { useTranslations } from '../../../hooks/useTranslations';
import { Alert } from '../../Alert';
import { Button } from '../../Button';
import { Modal, ModalContainer } from '../../Modal';

export const MediaAccessModal = ({
    open,
    onClose,
    cam = true,
    mic = true,
    ...props
}) => {
    const { t } = useTranslations();
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // If no requirement, then do nothing
        if (!open || (!cam && !mic)) {
            return;
        }

        // Check if camera & microphone permissions have already been granted
        const checkPermissions = async () => {
            try {
                const cameraStatus = await navigator.permissions.query({
                    name: 'camera',
                });
                const micStatus = await navigator.permissions.query({
                    name: 'microphone',
                });

                const camPermissionGranted =
                    !cam || cameraStatus.state === 'granted';
                const micPermissionGranted =
                    !mic || micStatus.state === 'granted';

                if (camPermissionGranted && micPermissionGranted) {
                    setPermissionsGranted(true);
                    if (isFunction(onClose)) {
                        onClose();
                    }
                }
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };

        checkPermissions();
    }, [open, onClose]);

    const requestMediaAccess = async () => {
        try {
            setErrorMessage(''); // Clear any previous error messages
            await navigator.mediaDevices.getUserMedia({
                video: cam,
                audio: mic,
            });
            setPermissionsGranted(true);
            if (isFunction(onClose)) {
                onClose();
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
            if (error.name === 'NotAllowedError') {
                setErrorMessage(
                    'Permission denied. We need access to your camera and microphone for video and audio calls. Please enable access in your browser settings.'
                );
            } else {
                setErrorMessage(
                    'An error occurred while trying to access your camera and microphone.'
                );
            }
        }
    };

    // Don't render if permissions are granted or if no permissions needed
    if (permissionsGranted || (!cam && !mic)) {
        return null;
    }

    return (
        <ModalContainer
            open={open}
            onOpenChange={(value) => {
                if (!value && !open && isFunction(onClose)) {
                    onClose();
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
                closeButtonClassName="top-5 end-5"
                closeIconClassName="w-6 h-6 text-white"
                className="w-10/12 sm:w-2/3 lg:w-[900px] h-auto p-0 gap-0 border-0 max-w-[500px] rounded-md"
                contentClassName="bg-gray-100 dark:bg-gray-900 rounded-b-md max-h-[75vh] pt-6"
                headerClassName="space-y-0 border-b border-gray-300 dark:border-gray-500"
                setWidth={false}
                overflow
                {...props}
            >
                <div className="p-6 pt-0">
                    <div className="flex flex-row items-center gap-2 mb-2">
                        {mic && <Mic className="w-6 h-6" />}
                        {cam && <Video className="w-6 h-6" />}
                    </div>
                    <h2 className="text-lg font-bold">
                        {cam &&
                            mic &&
                            t('media-access-modal-enable-cam-mic-title')}
                        {cam &&
                            !mic &&
                            t('media-access-modal-enable-cam-title')}
                        {!cam &&
                            mic &&
                            t('media-access-modal-enable-mic-title')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cam &&
                            mic &&
                            t('media-access-modal-enable-cam-mic-description')}
                        {cam &&
                            !mic &&
                            t('media-access-modal-enable-cam-description')}
                        {!cam &&
                            mic &&
                            t('media-access-modal-enable-mic-description')}
                    </p>
                    <Button
                        className="w-full mt-6"
                        onClick={requestMediaAccess}
                    >
                        {t('media-access-modal-grant-permissions')}
                    </Button>

                    {/* Show error message if permission is denied */}
                    {errorMessage && (
                        <Alert
                            className="mt-6"
                            variant="destructive"
                            title={t('media-access-modal-error-title')}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    {/* Suggest how to enable permissions manually */}
                    {errorMessage && (
                        <div className="mt-6">
                            <h3 className="font-bold">
                                {t(
                                    'media-access-modal-how-to-enable-permissions-title'
                                )}
                            </h3>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {t(
                                    'media-access-modal-how-to-enable-permissions-description'
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </ModalContainer>
    );
};
