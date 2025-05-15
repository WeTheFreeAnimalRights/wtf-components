import { Badge } from './index';

export default {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'Badge',
        },
    },
};

export const Primary = {
    args: {
        children: 'Badge',
        variant: 'simple',
    },
};
