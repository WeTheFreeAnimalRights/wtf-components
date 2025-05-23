import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { AutoScrollContainer } from './index';

// Mock `cn` utility function
vi.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('AutoScrollContainer', () => {
    let containerMock;

    beforeEach(() => {
        containerMock = {
            scrollTop: 0,
            scrollHeight: 1000,
        };

        // Spy on React's useRef to return our mock container
        vi.spyOn(React, 'useRef').mockReturnValueOnce({
            current: containerMock,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            <AutoScrollContainer>
                <div>Test content</div>
            </AutoScrollContainer>
        );
        expect(getByText('Test content')).toBeInTheDocument();
    });

    it('applies className correctly', () => {
        render(
            <AutoScrollContainer className="custom-style">
                Styled
            </AutoScrollContainer>
        );
        const div = screen.getByTestId('container');
        expect(div).toHaveClass('overflow-auto custom-style');
    });

    it('scrolls to bottom on mount', () => {
        render(<AutoScrollContainer>Mount scroll</AutoScrollContainer>);
        const div = screen.getByTestId('container');
        expect(div.scrollTop).toBe(div.scrollHeight);
    });

    it('scrolls to bottom on children update', () => {
        const { rerender } = render(
            <AutoScrollContainer>Initial</AutoScrollContainer>
        );
        const div = screen.getByTestId('container');
        expect(div.scrollTop).toBe(div.scrollHeight); // on mount

        // Reset scrollTop before re-render
        containerMock.scrollTop = 0;

        rerender(<AutoScrollContainer>Updated content</AutoScrollContainer>);
        expect(div.scrollTop).toBe(div.scrollHeight); // after update
    });
});
