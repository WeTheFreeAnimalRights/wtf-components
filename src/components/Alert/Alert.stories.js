import { Alert } from './index';
import '../../base.css';

export default {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'Default Alert Text',
        },
    },
};

export const Primary = {
    args: {
        children: 'This is an alert and it will be shown like this',
        theme: 'empty',
        title: 'Alert title',
        showTitle: true,
    },
};
