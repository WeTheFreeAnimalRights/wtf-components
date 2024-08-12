import { RecoilRoot } from 'recoil';
import { ThemeToggle } from './index';
import '../../base.css';

export default {
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
    tags: ['autodocs'],
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
