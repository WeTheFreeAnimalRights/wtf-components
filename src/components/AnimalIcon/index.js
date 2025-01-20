import { sample } from 'lodash-es';
import { useTheme } from '../../hooks/useTheme';
import { getIcons } from './getIcons';

export const AnimalIcon = ({ className, variant }) => {
    const { theme } = useTheme();
    const icons = getIcons();
    const icon = sample(icons[variant || theme]);
    return <img src={icon} alt="" className={className} />;
};
