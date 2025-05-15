import { Confirm } from './index';
import { useConfirm } from './useConfirm';
import { Button } from '../Button';
import { AppStateProvider } from '../../store';

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
            <AppStateProvider>
                <Story />
            </AppStateProvider>
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
