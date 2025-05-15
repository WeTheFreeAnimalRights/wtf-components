import { isFunction } from 'lodash-es';
import { Modal, ModalContainer } from '../Modal';
import { FeedbackForm } from '../FeedbackForm';

export const FeedbackModal = ({ open, onClose, title, resourceId }) => {
    return (
        <ModalContainer
            open={open}
            onOpenChange={(value) => {
                if (!value && isFunction(onClose)) {
                    onClose();
                }
            }}
        >
            <Modal title={title} showTitle={false}>
                <FeedbackForm
                    resourceId={resourceId}
                    onVote={() => {
                        if (isFunction(onClose)) {
                            onClose();
                        }
                    }}
                    gridClassName="lg:grid-cols-2"
                />
            </Modal>
        </ModalContainer>
    );
};
