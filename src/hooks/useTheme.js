import { useRecoilState } from 'recoil';
import { currentThemeState } from '../recoilState';

export const useTheme = () => {
    const [theme, setTheme] = useRecoilState(currentThemeState);
    return {
        theme,
        setTheme,
    };
};
