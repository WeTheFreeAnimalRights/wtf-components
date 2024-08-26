import { CodeInput } from './index';
import '../../base.css';

export default {
    title: 'Components/CodeInput',
    component: CodeInput,
    tags: ['autodocs'],
    argTypes: {
        onEnd: {
            action: 'end',
        },
    },
};

export const Primary = {
    args: {
        label: 'Code',
        name: 'code',
        codeLength: 5,
    },
};
