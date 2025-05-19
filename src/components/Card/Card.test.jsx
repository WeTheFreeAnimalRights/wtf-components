import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './index';

vi.mock('./CardActiveTitle', () => ({
    CardActiveTitle: ({ children }) => (
        <div data-testid="card-active-title">{children}</div>
    ),
}));

vi.mock('_/components/card', () => ({
    Card: ({ children, customizer, ...props }) => (
        <div data-testid="card" {...props}>
            {children}
        </div>
    ),
    CardHeader: ({ children, customizer, ...props }) => (
        <div data-testid="card-header" {...props}>
            {children}
        </div>
    ),
    CardTitle: ({ children, customizer }) => (
        <h2 data-testid="card-title">{children}</h2>
    ),
    CardDescription: ({ children, customizer }) => (
        <p data-testid="card-description">{children}</p>
    ),
    CardContent: ({ children, ...props }) => (
        <div data-testid="card-content" {...props}>
            {children}
        </div>
    ),
    CardImage: ({ src, alt, className, customizer }) => (
        <img
            data-testid="card-image"
            src={src}
            alt={alt}
            className={className}
        />
    ),
}));

vi.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('Card', () => {
    it('renders title and description', () => {
        render(<Card title="Card Title" description="Card Description" />);
        expect(screen.getByTestId('card-title')).toHaveTextContent(
            'Card Title'
        );
        expect(screen.getByTestId('card-description')).toHaveTextContent(
            'Card Description'
        );
    });

    it('renders children in content section', () => {
        render(<Card>Inner Content</Card>);
        expect(screen.getByTestId('card-content')).toHaveTextContent(
            'Inner Content'
        );
    });

    it('renders CardActiveTitle when active and pretitle are defined', () => {
        render(<Card active pretitle="Pretitle" />);
        expect(screen.getByTestId('card-active-title')).toHaveTextContent(
            'Pretitle'
        );
    });

    it('renders CardActiveTitle around title when active is defined and pretitle is undefined', () => {
        render(<Card active title="Wrapped Title" />);
        expect(screen.getByTestId('card-active-title')).toHaveTextContent(
            'Wrapped Title'
        );
    });

    it('renders image element directly if passed', () => {
        const customImage = <img data-testid="custom-image" alt="custom" />;
        render(<Card image={customImage} />);
        expect(screen.getByTestId('custom-image')).toBeInTheDocument();
    });

    it('renders image string as CardImage', () => {
        render(<Card image="/image.jpg" title="Image Card" />);
        const img = screen.getByTestId('card-image');
        expect(img).toHaveAttribute('src', '/image.jpg');
        expect(img).toHaveAttribute('alt', 'Image Card');
    });

    it('applies onClick and className', () => {
        const handleClick = vi.fn();
        const { getByTestId } = render(
            <Card onClick={handleClick} className="custom-class">
                Click Test
            </Card>
        );
        fireEvent.click(getByTestId('card'));
        expect(handleClick).toHaveBeenCalled();
        expect(getByTestId('card')).toHaveClass('custom-class');
    });

    it('applies horizontal layout classes for sm size', () => {
        const { getByTestId } = render(
            <Card layout="horizontal" size="sm">
                Layout Test
            </Card>
        );
        expect(getByTestId('card')).toHaveClass('flex flex-row items-stretch');
    });

    it('applies horizontal layout classes for md size', () => {
        const { getByTestId } = render(
            <Card layout="horizontal" size="md">
                Layout Test
            </Card>
        );
        expect(getByTestId('card')).toHaveClass(
            'sm:flex sm:flex-row sm:items-stretch'
        );
    });
});
