import { Modal, ModalTrigger, ModalContainer } from './index';
import { Button } from '../Button';

export default {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        onClose: {
            action: 'closed',
        },
    },
};

export const Primary = () => {
    return (
        <ModalContainer>
            <ModalTrigger>
                <Button>Click me</Button>
            </ModalTrigger>
            <Modal title="Modal Title" description="Modal description">
                Content goes here
            </Modal>
        </ModalContainer>
    );
};
