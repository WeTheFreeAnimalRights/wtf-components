import { ParticipantView } from './ParticipantView';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '_/lib/utils';
import { Spinner } from '../../Spinner';
import { EndButton } from './EndButton';

export const RoomView = ({ users, currentUser, className }) => {
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
                        ],
                        className
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
                <div className="bg-black dark:bg-black p-4 w-full h-screen items-center justify-center flex dark">
                    <div className='flex flex-col items-center justify-center'><Spinner />
                    <div className='text-gray-500 mt-2'>{t('user-joining-call')}</div></div>
                </div>
            )}

            <div className="absolute end-2 top-2 w-1/2 sm:w-1/3 aspect-square">
                <ParticipantView
                    id={currentUser?.id}
                    className="shadow-md border-2 border-gray-700"
                />
            </div>
        </>
    );
};
