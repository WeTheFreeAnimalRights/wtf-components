import { DatePicker } from './index';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'changed',
        },
    },
};

export const Primary = {
    args: {
        placeholder: 'Select a date',
    },
};
