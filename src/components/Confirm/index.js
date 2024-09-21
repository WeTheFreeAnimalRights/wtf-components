import { useRecoilState } from 'recoil';
import { confirmState } from '../../recoilState';
import { useTranslations } from '../../hooks/useTranslations';
import { Modal, ModalContainer } from '../Modal';
import { Button } from '../Button';

export const Confirm = () => {
    const { t } = useTranslations();
    const [confirmObj, setConfirmObj] = useRecoilState(confirmState);

    return (
        <ModalContainer open={Boolean(confirmObj.visible)}>
            <Modal title={confirmObj.title} description={confirmObj.message}>
                <Button
                    onClick={() => {
                        if (typeof confirmObj.callback === 'function') {
                            confirmObj.callback();
                        }
                        setConfirmObj({
                            ...confirmObj,
                            visible: false,
                        });
                    }}
                >
                    {t('Yes')}
                </Button>
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
                    {t('Cancel')}
                </Button>
            </Modal>
        </ModalContainer>
    );
};
Confirm.displayName = 'Confirm';
