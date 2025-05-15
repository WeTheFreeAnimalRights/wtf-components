import { ThemeToggle } from './index';
import '../../base.css';

export default {
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
    tags: ['autodocs'],
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
