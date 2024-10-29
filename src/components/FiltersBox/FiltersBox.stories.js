import { RecoilRoot } from 'recoil';
import { action } from '@storybook/addon-actions';
import { FiltersBox } from './index';
import '../../base.css';
import { StandardSelect, StandardSwitch } from '../StandardForm';

export default {
    title: 'Components/FiltersBox',
    component: FiltersBox,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = () => {
    return (
        <FiltersBox onApplied={action('applied')}>
            <StandardSwitch name="isActive">Active</StandardSwitch>

            <StandardSelect
                name="day"
                placeholder="Select one"
                options={[
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
                ]}
                value="bad"
            >
                Day
            </StandardSelect>
        </FiltersBox>
    );
};
