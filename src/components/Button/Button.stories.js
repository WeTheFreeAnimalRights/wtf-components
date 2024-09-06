import { Button } from './index';
import '../../base.css';

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'Default Button Text',
        },
        onClick: {
            action: 'clicked',
        },
    },
};

export const Primary = {
    args: {
        children: 'Button',
        variant: 'default',
        size: 'default',
    },
};
