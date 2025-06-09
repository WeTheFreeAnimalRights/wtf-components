import { notificationsState } from '../appState';
import { useGlobalState } from '../store/AppState';

export const useNotifications = () => {
    const [notifications, setNotifications] =
        useGlobalState(notificationsState);

    return {
        notifications,
        setNotifications,
    };
};
