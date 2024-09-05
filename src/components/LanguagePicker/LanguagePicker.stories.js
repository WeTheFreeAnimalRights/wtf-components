import { RecoilRoot } from 'recoil';
import { LanguagePicker } from './index';
import { useTranslations } from '../../hooks/useTranslations';
import '../../base.css';
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
            <RecoilRoot>
                <div className="flex">
                    <LanguagesSet Story={Story} />
                </div>
            </RecoilRoot>
        ),
    ],
};

export const Primary = {
    args: {
        align: 'bottom-bottom-left',
    },
};
