import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CardActiveTitle } from './CardActiveTitle';

vi.mock('../ActiveBadge', () => ({
    ActiveBadge: ({ active, labels }) => (
        <div data-testid="active-badge" data-active={active ? 'yes' : 'no'}>
            {labels?.active || 'Active'}
        </div>
    ),
}));

vi.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('CardActiveTitle', () => {
    it('renders children in the left section', () => {
        render(<CardActiveTitle>My Title</CardActiveTitle>);
        expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('renders ActiveBadge on the right side', () => {
        render(<CardActiveTitle active={true} />);
        const badge = screen.getByTestId('active-badge');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute('data-active', 'yes');
    });

    it('passes labels prop to ActiveBadge', () => {
        render(
            <CardActiveTitle
                active={true}
                labels={{ active: 'On', inactive: 'Off' }}
            />
        );
        expect(screen.getByText('On')).toBeInTheDocument();
    });

    it('applies custom className to wrapper', () => {
        const { container } = render(
            <CardActiveTitle className="my-class">Title</CardActiveTitle>
        );
        expect(container.firstChild).toHaveClass(
            'flex flex-row items-top my-class'
        );
    });
});
