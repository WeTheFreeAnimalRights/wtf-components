import { useState } from 'react';
import { getFeedbackKey } from './getFeedbackKey';
import { useTranslations } from '../../hooks/useTranslations';
import { useRequest } from '../../hooks/useRequest';
import { useCode } from '../../hooks/useCode';
import { parseResourceFeedbackOptions } from '../../helpers/parseResourceFeedbackOptions';
import { SecureStore } from '../../store/SecureStore';
import { Preloader } from '../Preloader';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { FeedbackIcon } from '../FeedbackIcon';
import { Spinner } from '../Spinner';
import { isFunction } from 'lodash-es';
import { cn } from '_/lib/utils';

export const FeedbackForm = ({ resourceId, className, gridClassName, onVote }) => {
    const { t } = useTranslations();

    // Fetch the options
    const [options, setOptions] = useState({});
    const requests = [
        {
            url: 'feedback',
            api: 'public',
            method: 'get',
            callback: ({ data }) => {
                const parsed = parseResourceFeedbackOptions(data.data);
                setOptions(parsed);
            },
        },
    ];

    // Saved options
    const [selectedId, setSelectedId] = useState(null);

    // Success
    const [submitted, setSubmitted] = useState(false);

    // Submit method
    const { code } = useCode();
    const { loading, error, request } = useRequest();
    const sendRepsonse = async (id) => {
        setSelectedId(id);
        await request(
            {
                url: 'resources',
                segments: [resourceId, 'feedback'],
                api: 'public',
                method: 'post',
                body: {
                    feedback_option_id: id,
                    resource_id: resourceId,
                    code_id: code.id,
                },
            },
            () => {
                SecureStore.remove(getFeedbackKey(resourceId, code));
            },
            () => {
                SecureStore.set(getFeedbackKey(resourceId, code), id, 7); // 7 days expiration
                setSubmitted(true);
                if (isFunction(onVote)) {
                    onVote(id);
                }
            }
        );
    };

    return (
        <Preloader requests={requests} className="w-full h-full relative">
            <article className={className}>
                <h2 className="text-xl font-semibold mb-4">
                    {t('field-label-pause-feedback')}
                </h2>

                {loading && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-white/75 z-10 flex flex-col items-center justify-center dark:bg-gray-800/75">
                        <Spinner />
                    </div>
                )}

                {error && (
                    <Alert
                        className="mb-3"
                        variant="destructive"
                        title={t('feedback-error')}
                    >
                        {error}
                    </Alert>
                )}

                {submitted ? (
                    <Alert className="mb-3" title={t('form-success-title')}>
                        {t('form-success-text')}
                    </Alert>
                ) : (
                    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4', gridClassName)}>
                        {(options?.all || []).map(
                            ({ type, description, id }) => (
                                <Button
                                    variant="outline"
                                    className={cn(
        'p-3 md:p-4 whitespace-normal flex flex-row md:flex-col items-center justify-center hover:shadow-md hover:bg-background dark:hover:bg-accent transition-all transform duration-100',
        {
            'border-2 border-primary scale-105': selectedId === id,
        }
    )}
                                    size="auto"
                                    key={`option-${id}`}
                                    onClick={() => sendRepsonse(id)}
                                >
                                    <FeedbackIcon
                                        name={type}
                                        className="me-3 md:me-0 md:mb-3"
                                        isPublic
                                    />
                                    <div className="text-start grow md:grow-0 md:text-center">
                                        {description}
                                    </div>
                                </Button>
                            )
                        )}
                    </div>
                )}
            </article>
        </Preloader>
    );
};

export { getFeedbackKey } from './getFeedbackKey';
export { getFeedbackValue } from './getFeedbackValue';
