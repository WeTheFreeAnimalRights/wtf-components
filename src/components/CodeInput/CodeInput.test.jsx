import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeInput } from './index';

vi.mock('_/components/input-otp', () => {
    const React = require('react');
    return {
        InputOTP: React.forwardRef(
            (
                { children, onComplete, pushPasswordManagerStrategy, ...props },
                ref
            ) => (
                <div data-testid="input-otp" ref={ref} {...props}>
                    {children}
                </div>
            )
        ),
        InputOTPGroup: ({ children }) => (
            <div data-testid="otp-group">{children}</div>
        ),
        InputOTPSlot: ({ index, className }) => (
            <div data-testid={`otp-slot-${index}`} className={className}>
                Slot {index}
            </div>
        ),
    };
});

describe('CodeInput', () => {
    it('renders 5 OTP slots by default', () => {
        render(<CodeInput />);
        const slots = screen.getAllByText(/Slot \d/);
        expect(slots).toHaveLength(5);
        expect(screen.getByTestId('input-otp')).toBeInTheDocument();
        expect(screen.getByTestId('otp-group')).toBeInTheDocument();
    });

    it('renders custom number of slots when codeLength is set', () => {
        render(<CodeInput codeLength={3} />);
        const slots = screen.getAllByText(/Slot \d/);
        expect(slots).toHaveLength(3);
    });

    it('applies error classes to all slots when errored is true', () => {
        render(<CodeInput errored />);
        const slots = screen.getAllByText(/Slot \d/);
        slots.forEach((slot) => {
            expect(slot).toHaveClass('border-red-500');
            expect(slot).toHaveClass('text-red-500');
        });
    });

    it('applies className to outer wrapper', () => {
        const { container } = render(<CodeInput className="my-wrapper" />);
        expect(container.firstChild).toHaveClass('my-wrapper');
    });
});
