import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './index';

jest.mock('_/components/checkbox', () => {
    const React = require('react'); // ✅ in-scope
    return {
        Checkbox: React.forwardRef(({ className, ...props }, ref) => (
            <input
                ref={ref}
                type="checkbox"
                data-testid="shad-checkbox"
                className={className}
                {...props}
            />
        )),
    };
});

describe('Checkbox', () => {
    it('renders the checkbox', () => {
        render(<Checkbox />);
        expect(screen.getByTestId('shad-checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('shad-checkbox')).toHaveAttribute(
            'type',
            'checkbox'
        );
    });

    it('applies className', () => {
        render(<Checkbox className="my-class" />);
        expect(screen.getByTestId('shad-checkbox')).toHaveClass('my-class');
    });

    it('passes props like checked and onChange', () => {
        const handleChange = jest.fn();
        render(<Checkbox checked={true} onChange={handleChange} />);
        const checkbox = screen.getByTestId('shad-checkbox');

        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });

    it('forwards ref', () => {
        const ref = createRef();
        render(<Checkbox ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
