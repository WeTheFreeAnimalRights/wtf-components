import { UploadInput } from './index';
import '../../base.css';

export default {
    title: 'Components/UploadInput',
    component: UploadInput,
    tags: ['autodocs'],
    argTypes: {
        onSelect: {
            action: 'selected',
        },
    },
    decorators: [
        (Story) => (
            <div className="flex">
                <Story />
            </div>
        ),
    ],
};

export const Primary = {
    args: {},
};
