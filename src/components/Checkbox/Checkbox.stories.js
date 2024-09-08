import { Checkbox } from './index';
import '../../base.css';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'changed',
        },
    },
};

export const Primary = {
    args: {},
};
