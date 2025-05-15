import { confirmState } from '../../appState';
import { useSetGlobalState } from '../../store/AppState';

export const useConfirm = () => {
    const setConfirmObj = useSetGlobalState(confirmState);

    return {
        confirm: ({ title, message, callback, hideCancel }) => {
            setConfirmObj({
                visible: true,
                title,
                message,
                callback,
                hideCancel,
            });
        },
    };
};
