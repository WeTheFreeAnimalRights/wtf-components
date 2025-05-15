import { useGlobalState } from '../store/AppState';
import { developmentModeState } from '../appState';

export const useDevelopmentMode = () => {
    const [developmentMode, setDevelopmentMode] = useGlobalState(developmentModeState);
    return {
        developmentMode,
        setDevelopmentMode,
    };
};
