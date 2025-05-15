import { Card } from './index';
import '../../base.css';
import { AppStateProvider } from '../../store';

export default {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <AppStateProvider>
                <Story />
            </AppStateProvider>
        ),
    ],
    argTypes: {
        onClick: {
            action: 'clicked',
        },
    },
};

export const Vertical = {
    args: {
        title: 'Lorem Ipsum Title',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere tellus sit amet dapibus condimentum. Suspendisse accumsan tellus risus, ut placerat tellus lacinia ac. Praesent in tincidunt est, sed imperdiet velit.',
        image: 'https://picsum.photos/seed/picsum/1920/1080',
        layout: 'vertical',
    },
};

export const Horizontal = {
    args: {
        title: 'Lorem Ipsum Title',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere tellus sit amet dapibus condimentum. Suspendisse accumsan tellus risus, ut placerat tellus lacinia ac. Praesent in tincidunt est, sed imperdiet velit.',
        image: 'https://picsum.photos/seed/picsum/1920/1080',
        layout: 'horizontal',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere tellus sit amet dapibus condimentum. Suspendisse accumsan tellus risus, ut placerat tellus lacinia ac. Praesent in tincidunt est, sed imperdiet velitLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere tellus sit amet dapibus condimentum. Suspendisse accumsan tellus risus, ut placerat tellus lacinia ac. Praesent in tincidunt est, sed imperdiet velit',
    },
};
