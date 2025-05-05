import { RecoilRoot } from 'recoil';
import { DatePicker } from './index';
import '../../base.css';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
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
