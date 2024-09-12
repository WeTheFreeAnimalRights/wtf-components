import { UploadInput } from './index';
import '../../base.css';
import { RecoilRoot } from 'recoil';

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
            <RecoilRoot>
                <div className="flex">
                    <Story />
                </div>
            </RecoilRoot>
        ),
    ],
};

export const Primary = {
    args: {},
};
