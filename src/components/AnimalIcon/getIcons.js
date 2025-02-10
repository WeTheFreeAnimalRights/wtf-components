import { range } from 'lodash';
import { getCDNUrl } from '../../helpers/getCDNUrl';

export const getIcons = () => {
    const items = range(24);
    return {
        light: items.map(
            (index) => getCDNUrl(`animal-icons/light/empty-icon-${index}.svg`)
        ),
        dark: items.map(
            (index) => getCDNUrl(`animal-icons/dark/empty-icon-${index}.svg`)
        ),
    };
};
