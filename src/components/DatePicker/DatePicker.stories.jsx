import { DatePicker } from './index';
import { AppStateProvider } from '../../store';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <AppStateProvider>
                <Story />
            </AppStateProvider>
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
