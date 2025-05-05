import { isUndefined, sample } from 'lodash-es';
import { useTheme } from '../../hooks/useTheme';
import { getIcons } from './getIcons';

export const AnimalIcon = ({ className, variant, index }) => {
    const { theme } = useTheme();
    const icons = getIcons()[variant || theme];
    const icon = isUndefined(index) ? sample(icons) : icons[index];
    return <img src={icon} alt="animal" className={className} />;
};
