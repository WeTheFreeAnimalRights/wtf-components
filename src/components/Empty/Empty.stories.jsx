import { Empty } from './index';
import { AppStateProvider } from '../../store';
import '../../base.css';

export default {
    title: 'Components/Empty',
    component: Empty,
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            action: 'clicked',
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

export const Primary = {
    args: {
        title: 'Lorem Ipsum Title',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        buttonLabel: 'Click',
    },
};
