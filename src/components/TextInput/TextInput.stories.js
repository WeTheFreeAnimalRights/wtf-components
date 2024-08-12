import { TextInput } from './index';
import '../../base.css';

export default {
    title: 'Components/TextInput',
    component: TextInput,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        label: 'Name',
        placeholder: 'Put your name here',
        name: 'name',
        type: 'text',
        maxLength: 20,
    },
};

export const Email = {
    args: {
        label: 'Email',
        placeholder: 'Put your email here',
        name: 'email',
        type: 'email',
    },
};
