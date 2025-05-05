import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActiveBadge } from './index';

// Mock Tooltip
jest.mock('../Tooltip', () => ({
    Tooltip: ({ message, children }) => (
        <div data-testid="tooltip" data-message={message}>
            {children}
        </div>
    ),
}));

// Mock Badge
jest.mock('../Badge', () => ({
    Badge: ({ children, className, variant }) => (
        <div data-testid="badge" className={className} data-variant={variant}>
            {children}
        </div>
    ),
}));

// Mock useTranslations
jest.mock('../../hooks/useTranslations', () => ({
    useTranslations: () => ({
        t: (key) =>
            ({
                'card-active': 'Active (translated)',
                'card-inactive': 'Inactive (translated)',
            })[key],
    }),
}));

describe('ActiveBadge', () => {
    it('renders active badge with default translated label', () => {
        render(<ActiveBadge active />);
        const badge = screen.getByTestId('badge');
        const tooltip = screen.getByTestId('tooltip');

        expect(badge).toHaveTextContent('Active (translated)');
        expect(badge).toHaveAttribute('data-variant', 'constructive');
        expect(tooltip).toHaveAttribute('data-message', 'Active (translated)');
    });

    it('renders inactive badge with default translated label', () => {
        render(<ActiveBadge active={false} />);
        const badge = screen.getByTestId('badge');
        const tooltip = screen.getByTestId('tooltip');

        expect(badge).toHaveTextContent('Inactive (translated)');
        expect(badge).toHaveAttribute('data-variant', 'gray');
        expect(tooltip).toHaveAttribute(
            'data-message',
            'Inactive (translated)'
        );
    });

    it('uses custom labels when provided', () => {
        render(
            <ActiveBadge
                active
                labels={{ active: 'Yes!', inactive: 'Nope.' }}
            />
        );
        const badge = screen.getByTestId('badge');
        const tooltip = screen.getByTestId('tooltip');

        expect(badge).toHaveTextContent('Yes!');
        expect(tooltip).toHaveAttribute('data-message', 'Yes!');
    });

    it('uses className when provided', () => {
        render(<ActiveBadge active className="my-badge" />);
        const badge = screen.getByTestId('badge');
        expect(badge).toHaveClass('my-badge');
    });
});
