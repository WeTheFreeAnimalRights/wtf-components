import { useSetRecoilState, useRecoilValue } from 'recoil';
import { SecureStore } from '../helpers/SecureStore';
import { getDefaultCode } from '../helpers/getDefaultCode';
import { currentCodeState } from '../recoilState';
import { useUrl } from './useUrl';

export const useCode = () => {
    // Get the code from the url
    const { url, setUrl } = useUrl();

    // Recoil states for the code
    const currentCode = useRecoilValue(currentCodeState);
    const setCurrentCode = useSetRecoilState(currentCodeState);

    // Default code
    const defaultCode = getDefaultCode();

    // If a code exists in the url
    if (url.code) {
        SecureStore.set('userSelectedCode', true);
    }

    // Set the code
    const setCode = (newCode, setLocalStorage = true, ...params) => {
        const _newCode = newCode || defaultCode;

        // Store in recoil
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
