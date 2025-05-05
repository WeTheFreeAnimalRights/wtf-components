import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button component', () => {
    it('renders with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        const button = screen.getByRole('button', { name: /click/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('forwards refs correctly', () => {
        const ref = React.createRef();
        render(<Button ref={ref}>Ref Button</Button>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('adds custom class names', () => {
        render(<Button className="custom-class">Styled</Button>);
        const button = screen.getByRole('button', { name: /styled/i });
        expect(button.className).toMatch(/custom-class/);
    });

    it('renders correctly with asChild', () => {
        render(
            <Button asChild>
                <span>Child Span</span>
            </Button>
        );
        expect(screen.getByText('Child Span')).toBeInTheDocument();
    });

    it.each([
        'default',
        'simple',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'wtf-pink',
        'simple-link',
        'gray',
    ])('renders with variant: %s', (variant) => {
        render(<Button variant={variant}>Variant: {variant}</Button>);
        const button = screen.getByRole('button', {
            name: `Variant: ${variant}`,
        });
        expect(button).toBeInTheDocument();
    });

    it.each(['default', 'sm', 'lg', 'icon', 'auto', 'wide', 'small-icon'])(
        'renders with size: %s',
        (size) => {
            render(<Button size={size}>Size: {size}</Button>);
            const button = screen.getByRole('button', {
                name: `Size: ${size}`,
            });
            expect(button).toBeInTheDocument();
        }
    );
});
