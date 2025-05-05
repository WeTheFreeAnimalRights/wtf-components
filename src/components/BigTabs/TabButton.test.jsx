import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabButton } from './TabButton';

describe('TabButton', () => {
    it('renders children inside button', () => {
        render(<TabButton>My Tab</TabButton>);
        expect(screen.getByRole('button')).toHaveTextContent('My Tab');
    });

    it('renders icon when provided', () => {
        render(
            <TabButton icon={<span data-testid="icon">⭐</span>}>Tab</TabButton>
        );
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('applies selected styles when selected is true', () => {
        render(<TabButton selected>Selected Tab</TabButton>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/bg-gray-700/); // or use `.toHaveClass(...)` for exact matches
    });

    it('applies unselected styles when selected is false', () => {
        render(<TabButton selected={false}>Unselected</TabButton>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/bg-white/);
    });

    it('applies "rounded-s-lg" when first is true', () => {
        render(<TabButton first>First</TabButton>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/rounded-s-lg/);
    });

    it('applies "rounded-e-lg" when last is true', () => {
        render(<TabButton last>Last</TabButton>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/rounded-e-lg/);
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<TabButton onClick={handleClick}>Click Me</TabButton>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });
});
