import { range } from 'lodash';

export const getIcons = () => {
    const items = range(24);
    const url = 'https://mystats.b-cdn.net';
    return {
        light: items.map(
            (index) => `${url}/animal-icons/light/empty-icon-${index}.svg`
        ),
        dark: items.map(
            (index) => `${url}/animal-icons/dark/empty-icon-${index}.svg`
        ),
    };
};
