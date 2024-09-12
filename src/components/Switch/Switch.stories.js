import { Switch } from './index';
import '../../base.css';

export default {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        onCheckedChange: {
            action: 'changed',
        },
    },
};

export const Primary = {
    args: {},
};
