import { LanguagePicker } from './index';
import { useTranslations } from '../../hooks/useTranslations';
import { AppStateProvider } from '../../store';
import { useEffect } from 'react';

const LanguagesSet = ({ Story }) => {
    const { setLanguages } = useTranslations();
    useEffect(() => {
        setLanguages([
            {
                code: 'en',
                label: 'English',
                direction: 'ltr',
            },
            {
                code: 'he',
                label: 'Hebrew',
                direction: 'rtl',
            },
        ]);
    }, []);

    return <Story />;
};

export default {
    title: 'Components/LanguagePicker',
    component: LanguagePicker,
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'changed',
        },
    },
    decorators: [
        (Story) => (
            <AppStateProvider56>
                <div className="flex">
                    <LanguagesSet Story={Story} />
                </div>
            </AppStateProvider56>
        ),
    ],
};

export const Primary = {
    args: {
        align: 'bottom-bottom-left',
    },
};
