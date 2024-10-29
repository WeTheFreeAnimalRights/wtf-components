import { RecoilRoot } from 'recoil';
import { Select } from './index';
import '../../base.css';

export default {
    title: 'Components/Select',
    component: Select,
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
        placeholder: 'Select one',
        options: [
            {
                value: 'good',
                label: 'Good',
            },
            {
                value: 'so-and-so',
                label: 'So and so',
            },
            {
                value: 'bad',
                label: 'Bad',
            },
        ],
    },
};
