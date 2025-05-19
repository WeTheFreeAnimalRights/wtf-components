import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Alert } from './index';

// Mock ShadCN alert components
vi.mock('_/components/alert', () => ({
    Alert: ({ children, className, variant }) => (
        <div data-testid="alert" data-variant={variant} className={className}>
            {children}
        </div>
    ),
    AlertTitle: ({ children }) => <h2 data-testid="alert-title">{children}</h2>,
    AlertDescription: ({ children }) => (
        <p data-testid="alert-description">{children}</p>
    ),
}));

// Mock utils
vi.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '), // simple join for classnames
}));

// Mock icons
vi.mock('lucide-react', () => ({
    Info: () => <svg data-testid="icon-info" />,
    TriangleAlert: () => <svg data-testid="icon-warning" />,
}));

describe('Alert', () => {
    it('renders with default variant and info icon', () => {
        render(<Alert title="Hello" children="This is a test alert." />);
        expect(screen.getByTestId('alert')).toHaveAttribute(
            'data-variant',
            'default'
        );
        expect(screen.getByTestId('icon-info')).toBeInTheDocument();
        expect(screen.getByTestId('alert-title')).toHaveTextContent('Hello');
        expect(screen.getByTestId('alert-description')).toHaveTextContent(
            'This is a test alert.'
        );
    });

    it('renders with destructive variant and warning icon', () => {
        render(
            <Alert
                variant="destructive"
                title="Danger"
                children="Something went wrong!"
            />
        );
        expect(screen.getByTestId('alert')).toHaveAttribute(
            'data-variant',
            'destructive'
        );
        expect(screen.getByTestId('icon-warning')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-info')).not.toBeInTheDocument();
        expect(screen.getByTestId('alert-title')).toHaveTextContent('Danger');
    });

    it('does not render icon if variant is "none"', () => {
        render(
            <Alert variant="none" title="No Icon" children="Silent alert" />
        );
        expect(screen.queryByTestId('icon-info')).not.toBeInTheDocument();
        expect(screen.queryByTestId('icon-warning')).not.toBeInTheDocument();
    });

    it('renders with additional className', () => {
        render(<Alert className="extra-class" children="Class test" />);
        expect(screen.getByTestId('alert')).toHaveClass(
            'flex flex-col sm:flex-row items-top extra-class'
        );
    });

    it('renders children inside AlertDescription', () => {
        render(<Alert>Check your inbox</Alert>);
        expect(screen.getByTestId('alert-description')).toHaveTextContent(
            'Check your inbox'
        );
    });

    it('renders cta when provided', () => {
        render(<Alert cta={<button data-testid="cta-button">Retry</button>} />);
        expect(screen.getByTestId('cta-button')).toBeInTheDocument();
    });

    it('does not render title element when title is not provided', () => {
        render(<Alert children="No title alert" />);
        expect(screen.queryByTestId('alert-title')).not.toBeInTheDocument();
        expect(screen.getByTestId('alert-description')).toHaveTextContent(
            'No title alert'
        );
    });
});
