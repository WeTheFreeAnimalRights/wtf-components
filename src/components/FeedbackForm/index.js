import { useState } from 'react';
import { getFeedbackKey } from './getFeedbackKey';
import { useTranslations } from '../../hooks/useTranslations';
import { useRequest } from '../../hooks/useRequest';
import { useCode } from '../../hooks/useCode';
import { parseResourceFeedbackOptions } from '../../helpers/parseResourceFeedbackOptions';
import { SecureStore } from '../../helpers/SecureStore';
import { Preloader } from '../Preloader';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { FeedbackIcon } from '../FeedbackIcon';
import { Spinner } from '../Spinner';

export const FeedbackForm = ({ resourceId, className }) => {
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

    // Success
    const [submitted, setSubmitted] = useState(false);

    // Submit method
    const { code } = useCode();
    const { loading, error, request } = useRequest();
    const sendRepsonse = async (id) => {
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
                SecureStore.set(
                    getFeedbackKey(resourceId, code),
                    true,
                    7
                ); // 7 days expiration
                setSubmitted(true);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(options?.all || []).map(
                            ({ type, description, id }) => (
                                <Button
                                    variant="outline"
                                    className="p-3 md:p-4 whitespace-normal flex flex-row md:flex-col items-center justify-center"
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

export {getFeedbackKey} from './getFeedbackKey';
