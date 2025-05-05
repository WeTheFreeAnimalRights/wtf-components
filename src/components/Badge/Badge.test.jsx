import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './index';

describe('Badge component', () => {
    it('renders with default props', () => {
        render(<Badge>Default Badge</Badge>);
        const badge = screen.getByText(/default badge/i);
        expect(badge).toBeInTheDocument();
    });

    it('applies custom class names', () => {
        render(<Badge className="my-custom-class">Styled</Badge>);
        const badge = screen.getByText(/styled/i);
        expect(badge).toHaveClass('my-custom-class');
    });

    it('forwards refs correctly', () => {
        const ref = React.createRef();
        render(<Badge ref={ref}>With Ref</Badge>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it.each([
        'default',
        'simple',
        'secondary',
        'destructive',
        'constructive',
        'outline',
        'green',
        'teal',
        'amber',
        'cyan',
        'pink',
        'gray',
    ])('renders with variant: %s', (variant) => {
        render(<Badge variant={variant}>Variant: {variant}</Badge>);
        const badge = screen.getByText(`Variant: ${variant}`);
        expect(badge).toBeInTheDocument();
    });
});
