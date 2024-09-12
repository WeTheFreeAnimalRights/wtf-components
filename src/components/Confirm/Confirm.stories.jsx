import { RecoilRoot } from 'recoil';
import { Confirm } from './index';
import { useConfirm } from './useConfirm';
import '../../base.css';
import { Button } from '../Button';

export default {
    title: 'Components/Confirm',
    component: Confirm,
    tags: ['autodocs'],
    argTypes: {
        onClose: {
            action: 'closed',
        },
    },
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = () => {
    const { confirm } = useConfirm();
    return (
        <>
            <Button
                onClick={() =>
                    confirm({
                        title: 'Pay attention',
                        message: 'Are you sure?',
                        callback: () => {
                            alert('YES');
                        },
                    })
                }
            >
                Click me
            </Button>
            <Confirm />
        </>
    );
};
