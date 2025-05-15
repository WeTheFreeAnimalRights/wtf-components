import { SecureStore } from '../store/SecureStore';
import { useGlobalState } from '../store/AppState';
import { getDefaultCode } from '../helpers/getDefaultCode';
import { currentCodeState } from '../appState';
import { useUrl } from './useUrl';

export const useCode = () => {
    // Get the code from the url
    const { url, setUrl } = useUrl();

    // Application states for the code
    const [currentCode, setCurrentCode] = useGlobalState(currentCodeState);

    // Default code
    const defaultCode = getDefaultCode();

    // If a code exists in the url
    if (url.code) {
        SecureStore.set('userSelectedCode', true);
    }

    // Set the code
    const setCode = (newCode, setLocalStorage = true, ...params) => {
        const _newCode = newCode || defaultCode;

        // Store in app store
        setCurrentCode(_newCode);

        // Save in localstorage
        if (setLocalStorage) {
            SecureStore.set('userSelectedCode', true);
        }

        // Navigate to new url (if needed)
        if (_newCode.code !== url.code) {
            setUrl(
                {
                    code: _newCode.code,
                },
                ...params
            );
        }
    };

    return {
        code: currentCode || defaultCode,
        setCode,
        selected: SecureStore.get('userSelectedCode') || false,
        defaultCode,
    };
};
