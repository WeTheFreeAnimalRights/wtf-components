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
    args: {
        label: 'This is a sexy checkbox shown especially for you',
    },
};
