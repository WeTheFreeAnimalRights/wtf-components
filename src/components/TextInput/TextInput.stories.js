import { TextInput } from './index';
import '../../base.css';

export default {
    title: 'Components/TextInput',
    component: TextInput,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        placeholder: 'Put your name here',
        name: 'name',
        type: 'text',
        maxLength: 20,
    },
};

export const Email = {
    args: {
        placeholder: 'Put your email here',
        name: 'email',
        type: 'email',
    },
};
