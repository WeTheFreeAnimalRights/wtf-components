import { action } from '@storybook/addon-actions';
import { FiltersBox } from './index';
import { StandardSelect, StandardSwitch } from '../StandardForm';

export default {
    title: 'Components/FiltersBox',
    component: FiltersBox,
    tags: ['autodocs'],
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
