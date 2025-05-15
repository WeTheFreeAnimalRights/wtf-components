import { SectionHeadingText } from './SectionHeadingText';

export const SectionHeading = ({
    text = '',
    className = '',
    level = 2,
    align = 'left',
    uppercase = true,
}) => {
    const Tag = `h${level}`;

    return (
        <Tag
            className={`${className || ''}
                ${align === 'left' || align === 'start' ? 'text-start' : 'text-center'}
                ${level === 1 ? 'text-2xl sm:text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}
                font-semibold tracking-tight
                text-gray-900 dark:text-white
                ${uppercase ? 'uppercase' : ''}
            `}
        >
            <SectionHeadingText text={text} />
        </Tag>
    );
};

export { SectionHeadingText };
