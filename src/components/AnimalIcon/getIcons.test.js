import { vi, describe, it, expect } from 'vitest';
import { getIcons } from './getIcons';

vi.mock('../../helpers/getCDNUrl', () => ({
    getCDNUrl: (path) => `CDN/${path}`,
}));

describe('getIcons', () => {
    it('returns 24 light and 24 dark icons with correct paths', () => {
        const icons = getIcons();

        expect(icons.light).toHaveLength(24);
        expect(icons.dark).toHaveLength(24);

        expect(icons.light[0]).toBe(
            'CDN/_static/animal-icons/light/empty-icon-0.svg'
        );
        expect(icons.dark[23]).toBe(
            'CDN/_static/animal-icons/dark/empty-icon-23.svg'
        );
    });
});
