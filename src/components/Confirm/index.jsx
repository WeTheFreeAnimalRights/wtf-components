import { isFunction } from 'lodash-es';
import { confirmState } from '../../appState';
import { useTranslations } from '../../hooks/useTranslations';
import { Modal, ModalContainer } from '../Modal';
import { Button } from '../Button';
import { useGlobalState } from '../../store/AppState';

export const Confirm = () => {
    const { t } = useTranslations();
    const [confirmObj, setConfirmObj] = useGlobalState(confirmState);

    return (
        <ModalContainer
            open={Boolean(confirmObj.visible)}
            onOpenChange={(value) =>
                setConfirmObj({
                    ...confirmObj,
                    visible: value,
                })
            }
        >
            <Modal title={confirmObj.title} description={confirmObj.message}>
                <Button
                    onClick={() => {
                        if (isFunction(confirmObj.callback)) {
                            confirmObj.callback();
                        }
                        setConfirmObj({
                            ...confirmObj,
                            visible: false,
                        });
                    }}
                >
                    {t('confirm-ok')}
                </Button>
                {confirmObj.hideCancel !== true && (
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() =>
                            setConfirmObj({
                                ...confirmObj,
                                visible: false,
                            })
                        }
                    >
                        {t('confirm-cancel')}
                    </Button>
                )}
            </Modal>
        </ModalContainer>
    );
};
Confirm.displayName = 'Confirm';

export { useConfirm } from './useConfirm';
