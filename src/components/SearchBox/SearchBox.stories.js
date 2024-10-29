import { RecoilRoot } from 'recoil';
import { action } from '@storybook/addon-actions';
import { SearchBox } from './index';
import '../../base.css';

export default {
    title: 'Components/SearchBox',
    component: SearchBox,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = {
    args: {
        onSearch: action('search'),
    },
};
