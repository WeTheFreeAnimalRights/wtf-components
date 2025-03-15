import Markdown from 'react-markdown';
import { useTranslations } from '../../hooks/useTranslations';

export const SectionHeadingText = ({
    text = '',
    boldClassName = '',
    italicClassName = '',
}) => {
    const { t } = useTranslations();

    return (
        <Markdown
            components={{
                strong: ({ node, ...rest }) => {
                    return (
                        <strong
                            className={`${boldClassName || ''} text-wtf-pink font-bold`}
                            {...rest}
                        />
                    );
                },
                em: ({ node, ...rest }) => {
                    return (
                        <em
                            className={`${italicClassName || ''} italic`}
                            {...rest}
                        />
                    );
                },
            }}
        >
            {t(text)}
        </Markdown>
    );
};
