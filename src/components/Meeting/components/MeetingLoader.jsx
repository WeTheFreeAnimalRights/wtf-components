import { Preloader } from '../../Preloader';
import { useTranslations } from '../../../hooks/useTranslations';

export const MeetingLoader = ({ id, children, className, cancelUrl }) => {
    const { t } = useTranslations();

    const requests = [
        {
            url: 'chats',
            api: 'public',
            method: 'get',
            segments: [id],
            callback: ({ data }) => {
                return data.data;
            },
        },
    ];

    const repeatUntil = (data) => {
        return Boolean(data[0].activist);
    };

    return (
        <Preloader
            requests={requests}
            loadingMessage={t('waiting-for-activist')}
            repeatUntil={repeatUntil}
            cancelUrl={cancelUrl}
        >
            {children}
        </Preloader>
    );
};

MeetingLoader.displayName = 'MeetingLoader';
