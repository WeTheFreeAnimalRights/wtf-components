import { Empty } from './index';

export default {
    title: 'Components/Empty',
    component: Empty,
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            action: 'clicked',
        },
    },
};

export const Primary = {
    args: {
        title: 'Lorem Ipsum Title',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        buttonLabel: 'Click',
    },
};
