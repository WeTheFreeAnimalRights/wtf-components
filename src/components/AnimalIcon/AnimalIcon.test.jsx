import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { AnimalIcon } from './index';

vi.mock('./getIcons', () => ({
    getIcons: () => ({
        light: ['light-icon-0', 'light-icon-1'],
        dark: ['dark-icon-0', 'dark-icon-1'],
    }),
}));

vi.mock('../../hooks/useTheme', () => ({
    useTheme: () => ({ theme: 'light' }),
}));

vi.mock('lodash-es', async (importOriginal) => {
    const actual = await importOriginal();

    return {
        ...actual,
        sample: () => 'light-icon-1', // ✅ override
        // isUndefined is untouched and forwarded from actual
    };
});

describe('AnimalIcon', () => {
    it('renders image with icon from theme if no variant is provided', () => {
        render(<AnimalIcon />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'light-icon-1');
    });

    it('uses the correct icon by index when provided', () => {
        render(<AnimalIcon index={0} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'light-icon-0');
    });

    it('uses variant over theme when provided', () => {
        render(<AnimalIcon variant="dark" index={1} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'dark-icon-1');
    });

    it('passes className to img', () => {
        render(<AnimalIcon className="icon-class" />);
        const img = screen.getByRole('img');
        expect(img).toHaveClass('icon-class');
    });
});
