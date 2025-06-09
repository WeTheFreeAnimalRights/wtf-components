import { range } from 'lodash-es';
import { getCDNUrl } from '../../helpers/getCDNUrl';

export const getIcons = () => {
    const items = range(24);
    return {
        light: items.map((index) =>
            getCDNUrl(`_static/animal-icons/light/empty-icon-${index}.svg`)
        ),
        dark: items.map((index) =>
            getCDNUrl(`_static/animal-icons/dark/empty-icon-${index}.svg`)
        ),
    };
};
