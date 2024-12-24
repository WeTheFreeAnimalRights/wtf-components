import { sample } from 'lodash';
import { icons } from '../../resources/animalIcons';
import { useTheme } from '../../hooks/useTheme';

export const AnimalIcon = ({ className, variant }) => {
    const { theme } = useTheme();
    const icon = sample(icons[variant || theme]);
    return <img src={icon} alt="" className={className} />;
};
