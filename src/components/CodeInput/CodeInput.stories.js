import { CodeInput } from './index';
import '../../base.css';

export default {
    title: 'Components/CodeInput',
    component: CodeInput,
    tags: ['autodocs'],
    argTypes: {
        onComplete: {
            action: 'complete',
        },
    },
};

export const Primary = {
    args: {
        label: 'Code',
        codeLength: 5,
    },
};
