import { fn } from '@storybook/test';
import { Button } from './index';
import '../../base.css';

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { onClick: fn() },
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'Default Button Text',
        },
    },
};

export const Primary = {
    args: {
        children: 'Button',
        theme: 'full',
    },
};
