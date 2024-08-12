import { RecoilRoot } from 'recoil';
import { Modal } from './index';
import '../../base.css';

export default {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        onClose: {
            action: 'closed',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ height: '400px' }}>
                <RecoilRoot>
                    <Story />
                </RecoilRoot>
            </div>
        ),
    ],
};

export const Primary = {
    args: {
        children: 'Modal content here',
        title: 'Modal Title',
        visible: true,
        showTitle: true,
        setOverflow: false,
    },
};
