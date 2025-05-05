import { useState, useRef, useEffect } from 'react';
import { isArray, isFunction } from 'lodash-es';
import { validateCode } from '../../helpers/validateCode';
import { getCDNUrl } from '../../helpers/getCDNUrl';
import { useCode } from '../../hooks/useCode';
import { useTranslations } from '../../hooks/useTranslations';
import { useRequest } from '../../hooks/useRequest';
import { Modal, ModalContainer, ModalTrigger } from '../Modal';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { CodeInput } from '../CodeInput';
import { Button } from '../Button';

export const CodeSelector = ({
    className = '',
    onCodeSelect,
    platform = '3movies',
}) => {
    // Code related things
    const { code, selected, setCode, defaultCode } = useCode();

    // Translations
    const { t } = useTranslations();

    // States and requests
    const [modalVisible, setModalVisible] = useState(!selected);
    const [typedCode, setTypedCode] = useState('');
    const { request, loading, error, setError } = useRequest();

    // We need to select the input text when it becomes
    // visible or when the form errrors
    const codeInputRef = useRef(null);
    useEffect(() => {
        if (modalVisible && codeInputRef.current) {
            codeInputRef.current.select();
        }
    }, [modalVisible, error]);

    // Method to reset the form back to normal
    // used when submitting and closing the modal
    const resetForm = () => {
        // Reset the form
        setTypedCode('');

        // Set to show no error
        setError(false);
    };

    // Send the data to the server
    const sendDataToApi = async (code) => {
        const data = await request(
            {
                url: 'validateCode',
                params: {
                    'filter[code]': code || '-',
                    include: 'team.organization',
                },
            },
            () => {
                // Focus on the code in case of error
                codeInputRef.current.select();
            }
        );

        if (!isArray(data?.data) || data?.data?.length <= 0) {
            throw new Error(t('entercode-error'));
        }

        // Get the code
        const firstCode = data.data.find(Boolean);
        setCode(firstCode);

        // Hide the modal and reset the form
        setModalVisible(false);
        resetForm();

        // Callback
        if (isFunction(onCodeSelect)) {
            onCodeSelect(firstCode);
        }
    };

    // Method that gets called when the form
    // gets submitted g
    const onSubmit = (newCode) => {
        // Validate the code first
        const validationResponse = validateCode(newCode);
        if (validationResponse !== true) {
            setError(t(validationResponse));
            return;
        }

        // Send to the API
        sendDataToApi(newCode);
    };

    // Get the card image url
    const cardImageUrl = getCDNUrl(`${platform}/bg-code.jpg`);

    return (
        <ModalContainer
            open={modalVisible}
            onOpenChange={(value) => {
                if (selected) {
                    setModalVisible(value);
                }
            }}
        >
            <ModalTrigger>
                <button
                    type="button"
                    className={`hidden bg-gray-700 hover:bg-gray-500 sm:flex flex-row items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors group ${className}`}
                    onClick={() => setModalVisible(true)}
                    title={
                        code.empty
                            ? t('entercode-header-tooltip-add')
                            : t('entercode-header-tooltip-change')
                    }
                >
                    <div
                        className={`text-xs text-gray-500 ${!code.empty ? 'me-2' : 'italic'} group-hover:text-gray-300 transition-colors`}
                    >
                        {code.empty
                            ? t('entercode-header-no-code')
                            : t('entercode-header-current-code')}
                    </div>
                    {!code.empty && (
                        <div className="uppercase">{code.code}</div>
                    )}
                </button>
            </ModalTrigger>

            <Modal
                onClose={() => {
                    setModalVisible(false);
                    resetForm();
                }}
                noPadding
                showCloseButton={Boolean(selected)}
                showTitle
                title={
                    code.empty
                        ? t('entercode-heading')
                        : t('entercode-change-"{0}"', [code.code])
                }
                description={t('entercode-dialog-description')}
                showDescription={false}
            >
                <div className="text-center mt-6 px-6  text-gray-600 dark:text-gray-300">
                    {t('entercode-text')}
                </div>
                <form
                    className="p-2 sm:p-6 relative"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(typedCode);
                    }}
                >
                    {loading && (
                        <div className="absolute z-20 top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-center bg-white/85 dark:bg-gray-800/85">
                            <Spinner />
                        </div>
                    )}
                    <div className="text-center">
                        <div className="inline-block items-center">
                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="mb-4 w-full"
                                >
                                    {error}
                                </Alert>
                            )}

                            <CodeInput
                                name="code"
                                ref={codeInputRef}
                                errored={Boolean(error)}
                                disabled={loading}
                                onComplete={(newCode) => {
                                    onSubmit(newCode);
                                }}
                                onChange={(value) => {
                                    setTypedCode(value);
                                }}
                                value={typedCode}
                            />
                            <Button type="submit" className="mt-4 w-full">
                                {t('entercode-submit')}
                            </Button>

                            <div className="flex items-center mt-2 justify-end">
                                <Button
                                    variant="link"
                                    size="auto"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        // Set the recoil store
                                        setCode(defaultCode);

                                        // Hide the modal and reset the form
                                        setModalVisible(false);
                                        resetForm();

                                        // Callback
                                        if (isFunction(onCodeSelect)) {
                                            onCodeSelect(defaultCode);
                                        }
                                    }}
                                >
                                    {t('entercode-no-code')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <img src={cardImageUrl} alt="img" draggable="false" />
            </Modal>
        </ModalContainer>
    );
};
