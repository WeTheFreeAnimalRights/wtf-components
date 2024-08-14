import { fn } from '@storybook/test';
import { CodeInput } from './index';
import '../../base.css';

export default {
    title: 'Components/CodeInput',
    component: CodeInput,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        label: 'Code',
        name: 'code',
        codeLength: 5,
        onEnd: fn(),
    },
};
