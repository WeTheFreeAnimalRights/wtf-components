import { useRecoilState } from 'recoil';
import { developmentModeState } from '../recoilState';

export const useDevelopmentMode = () => {
    const [developmentMode, setDevelopmentMode] =
        useRecoilState(developmentModeState);
    return {
        developmentMode,
        setDevelopmentMode,
    };
};
