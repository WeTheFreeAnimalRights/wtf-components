import { useGlobalState } from '../store/AppState';
import { currentThemeState } from '../appState';

export const useTheme = () => {
    const [theme, setTheme] = useGlobalState(currentThemeState);
    return {
        theme,
        setTheme,
    };
};
