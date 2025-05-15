import { ToggleGroupInput } from './index';
import '../../base.css';

import { Frown, Laugh, Smile } from 'lucide-react';

export default {
    title: 'Components/ToggleGroupInput',
    component: ToggleGroupInput,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        value: ['good', 'bad'],
        showLabel: true,
        options: [
            {
                value: 'good',
                label: 'Good',
                icon: <Laugh className="w-4 h-4" />,
            },
            {
                value: 'so-and-so',
                label: 'So and so',
                icon: <Smile className="w-4 h-4" />,
            },
            {
                value: 'bad',
                label: 'Bad',
                icon: <Frown className="w-4 h-4" />,
            },
        ],
    },
};
