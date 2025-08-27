import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const StandardMarkdown = ({ children, aProps }) => {
    const blockMarginClasses = 'my-3 first:mt-0 last:mb-0';
    const blockClasses = `whitespace-pre-line ${blockMarginClasses}`;

    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ node, ...rest }) => {
                    return (
                        <h1
                            className={`font-bold text-xl ${blockClasses}`}
                            {...rest}
                        />
                    );
                },
                h2: ({ node, ...rest }) => {
                    return (
                        <h2
                            className={`font-bold text-lg ${blockClasses}`}
                            {...rest}
                        />
                    );
                },
                h3: ({ node, ...rest }) => {
                    return (
                        <h3 className={`font-bold ${blockClasses}`} {...rest} />
                    );
                },
                h4: ({ node, ...rest }) => {
                    return (
                        <h4
                            className={`font-semibold ${blockClasses}`}
                            {...rest}
                        />
                    );
                },
                h5: ({ node, ...rest }) => {
                    return (
                        <h5
                            className={`font-bold text-sm ${blockClasses}`}
                            {...rest}
                        />
                    );
                },
                h6: ({ node, ...rest }) => {
                    return (
                        <h6
                            className={`font-semibold text-sm ${blockClasses}`}
                            {...rest}
                        />
                    );
                },
                p: ({ node, ...rest }) => {
                    return <p className={blockClasses} {...rest} />;
                },
                ul: ({ node, ...rest }) => {
                    return (
                        <ul
                            className={`list-inside list-disc ps-1 space-y-1 ${blockMarginClasses}`}
                            {...rest}
                        />
                    );
                },
                ol: ({ node, ...rest }) => {
                    return (
                        <ol
                            className={`list-inside list-decimal ps-1 space-y-1 ${blockMarginClasses}`}
                            {...rest}
                        />
                    );
                },
                li: ({ node, ...rest }) => {
                    return (
                        <li className={`whitespace-pre-line ps-2`} {...rest} />
                    );
                },
                strong: ({ node, ...rest }) => {
                    return <strong className={`font-bold`} {...rest} />;
                },
                em: ({ node, ...rest }) => {
                    return <em className={`italic`} {...rest} />;
                },
                a: ({ node, ...rest }) => {
                    return (
                        <a
                            className={`underline hover:no-underline cursor-pointer`}
                            {...rest}
                            {...aProps}
                        />
                    );
                },
                del: ({ node, ...rest }) => {
                    return <del className={`line-through`} {...rest} />;
                },
                table: ({ node, ...rest }) => {
                    return <table className={`border-0`} {...rest} />;
                },
                th: ({ node, ...rest }) => {
                    return (
                        <th
                            className={`font-bold py-1 px-2 border border-muted`}
                            {...rest}
                        />
                    );
                },
                td: ({ node, ...rest }) => {
                    return (
                        <td
                            className={`border py-1 px-2 border-muted`}
                            {...rest}
                        />
                    );
                },
            }}
        >
            {children}
        </Markdown>
    );
};
