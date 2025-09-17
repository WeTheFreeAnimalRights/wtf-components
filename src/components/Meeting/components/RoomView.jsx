import { ParticipantView } from './ParticipantView';
import { useTranslations } from '../../../hooks/useTranslations';
import { Spinner } from '../../Spinner';
import { cn } from '_/lib/utils';

export const RoomView = ({ users, currentUser, className }) => {
    const { t } = useTranslations();

    return (
        <div
            className={cn(
                'relative flex flex-col w-full h-full items-stretch justify-center px-4',
                className
            )}
        >
            {users?.length > 0 && (
                <div
                    className={cn(
                        'grid gap-4 justify-center content-center auto-rows-min',
                        users.length === 1 && 'grid-cols-1',
                        users.length > 1 && 'grid-cols-1 sm:grid-cols-2'
                    )}
                >
                    {users.map((user) => (
                        <div
                            key={`participant-${user.userId}`}
                            className="bg-gray-900 rounded-lg aspect-video relative overflow-hidden flex justify-center items-center"
                        >
                            <ParticipantView id={user.userId} />
                        </div>
                    ))}
                </div>
            )}

            {users?.length === 0 && (
                <div className="p-4 w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Spinner />
                        <div className="text-gray-500 mt-2">
                            {t('user-joining-call')}
                        </div>
                    </div>
                </div>
            )}

            {currentUser && (
                <div className="absolute right-4 top-4 w-64 sm:w-72 aspect-video z-50">
                    <div className="relative w-full h-full">
                        <ParticipantView
                            id={currentUser.userId}
                            className="absolute inset-0 shadow-md ring-2 ring-gray-700 rounded-md"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

RoomView.displayName = 'RoomView';
