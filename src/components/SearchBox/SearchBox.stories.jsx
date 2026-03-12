import { action } from 'storybook/actions';
import { SearchBox } from './index';

export default {
    title: 'Components/SearchBox',
    component: SearchBox,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        onSearch: action('search'),
    },
};
