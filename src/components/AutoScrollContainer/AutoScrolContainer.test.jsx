import React from 'react';
import { render, screen } from '@testing-library/react';
import { AutoScrollContainer } from './index';

jest.mock('_/lib/utils', () => ({
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
        jest.spyOn(React, 'useRef').mockReturnValueOnce({
            current: containerMock,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
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
        const { container } = render(
            <AutoScrollContainer className="custom-style">
                Styled
            </AutoScrollContainer>
        );
        const div = screen.getByTestId('container');
        expect(div).toHaveClass('overflow-auto custom-style');
    });

    it('scrolls to bottom on mount', () => {
        const { container } = render(
            <AutoScrollContainer>Mount scroll</AutoScrollContainer>
        );
        const div = screen.getByTestId('container');
        expect(div.scrollTop).toBe(div.scrollHeight);
    });

    it('scrolls to bottom on children update', () => {
        const { rerender, container } = render(
            <AutoScrollContainer>Initial</AutoScrollContainer>
        );
        const div = screen.getByTestId('container');
        expect(div.scrollTop).toBe(div.scrollHeight); // mount scroll

        // Reset scrollTop before re-render
        containerMock.scrollTop = 0;

        rerender(<AutoScrollContainer>Updated content</AutoScrollContainer>);
        expect(div.scrollTop).toBe(div.scrollHeight); // update scroll
    });
});
