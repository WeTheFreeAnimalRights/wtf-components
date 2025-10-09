import { Preloader } from '../../Preloader';
import { RoomView } from './RoomView';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '_/lib/utils';

export const MeetingLoader = ({ id, children, className }) => {
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
        // TODO: Change this
        return Boolean(data[0].activist) || true;
    };

    return (
        <Preloader
            requests={requests}
            customPreloader={() => <RoomView className={cn('h-dvh', className)} users={[]} loadingMessage={t('waiting-for-activist')} />}
            repeatUntil={repeatUntil}
        >
            {children}
        </Preloader>
    );
};

MeetingLoader.displayName = 'MeetingLoader';
