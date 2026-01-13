import { notificationsState } from '../appState';
import { useGlobalState } from '../store/AppState';

export const useNotifications = () => {
    const [notifications, setNotifications] =
        useGlobalState(notificationsState);

    const removeNotification = (id) => {
        setNotifications(notifications.filter((item) => item.id !== id));
    };

    return {
        notifications,
        setNotifications,
        removeNotification,
    };
};
