import React from 'react';
import { render, screen } from '@testing-library/react';
import { BigTab } from './BigTab';

describe('BigTab', () => {
    it('renders children when visible is true', () => {
        render(<BigTab visible={true}>Visible Tab Content</BigTab>);
        expect(screen.getByText('Visible Tab Content')).toBeInTheDocument();

        const tab = screen.getByText('Visible Tab Content').closest('div');
        expect(tab).not.toHaveClass('hidden');
    });

    it('hides content when visible is false (via class)', () => {
        render(<BigTab visible={false}>Hidden Tab Content</BigTab>);
        const tab = screen.getByText('Hidden Tab Content').closest('div');
        expect(tab).toHaveClass('hidden');
    });

    it('includes default styling', () => {
        render(<BigTab visible={true}>Styled Content</BigTab>);
        const tab = screen.getByText('Styled Content').closest('div');

        expect(tab).toHaveClass('rounded-lg');
    });
});
