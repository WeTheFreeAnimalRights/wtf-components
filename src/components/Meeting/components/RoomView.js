import { ParticipantView } from './ParticipantView';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '_/lib/utils';
import { Empty } from '../../Empty';

export const RoomView = ({ users, currentUser, emptyMessage }) => {
    const { t } = useTranslations();

    return (
        <>
            {users?.length > 0 && (
                <div
                    className={cn(
                        'grid gap-4 h-full place-items-center bg-gray-100 dark:bg-black p-4',
                        [
                            users.length === 1 && 'grid-cols-1',
                            users.length === 2 && 'grid-cols-2',
                            users.length === 3 && 'grid-cols-3',
                            users.length === 4 && 'grid-cols-2',
                            users.length > 4 && 'grid-cols-3',
                        ]
                    )}
                >
                    {users.map((user) => (
                        <ParticipantView
                            key={`participant-${user.id}`}
                            id={user.id}
                        />
                    ))}
                </div>
            )}
            {(users?.length === 0 || !users?.length) && (
                <div className="bg-gray-100 dark:bg-black p-4 w-full h-full items-center justify-center flex">
                    <Empty>
                        {emptyMessage || t('someone-will-join-soon')}{' '}
                    </Empty>
                </div>
            )}

            <div className="absolute end-2 top-2 w-1/2 sm:w-1/3 aspect-square">
                <ParticipantView
                    id={currentUser?.id}
                    className="shadow-md border-2"
                />
            </div>
        </>
    );
};
