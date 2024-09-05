import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { Select } from './index';
import '../../base.css';
import { useTheme } from 'hooks/useTheme';

const ThemeSet = ({ Story, isDark }) => {
    const { setTheme } = useTheme();

    useEffect(() => {
        if (isDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [isDark]);

    return <Story />;
};

export default {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    decorators: [
        (Story, { globals }) => {
            const { backgrounds } = globals;
            const isDark = backgrounds?.value === '#000000';
            return (
                <RecoilRoot>
                    <ThemeSet isDark={isDark} Story={Story} />
                </RecoilRoot>
            );
        },
    ],
};

export const Primary = {
    args: {
        label: 'How are you today',
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
    parameters: {
        direction: 'rtl',
    },
};
