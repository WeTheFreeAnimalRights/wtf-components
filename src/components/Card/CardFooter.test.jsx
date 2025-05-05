import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardFooter } from './CardFooter';

jest.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('CardFooter', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;

    it('renders object items with icon and label', () => {
        render(
            <CardFooter
                items={[
                    { icon: MockIcon, label: 'Label 1' },
                    { icon: MockIcon, label: 'Label 2' },
                ]}
            />
        );

        const icons = screen.getAllByTestId('mock-icon');
        expect(icons).toHaveLength(2);
        expect(screen.getByText('Label 1')).toBeInTheDocument();
        expect(screen.getByText('Label 2')).toBeInTheDocument();
    });

    it('renders valid React elements as items', () => {
        render(
            <CardFooter
                items={[
                    <span key="a">Custom A</span>,
                    <button key="b">Custom B</button>,
                ]}
            />
        );

        expect(screen.getByText('Custom A')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Custom B' })
        ).toBeInTheDocument();
    });

    it('skips null or undefined items', () => {
        render(
            <CardFooter
                items={[null, undefined, { icon: MockIcon, label: 'Visible' }]}
            />
        );

        expect(screen.getByText('Visible')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-icon')).toBeInTheDocument();
    });

    it('applies className to the wrapper', () => {
        const { container } = render(
            <CardFooter className="extra-class" items={[]} />
        );
        expect(container.firstChild).toHaveClass(
            'flex flex-row flex-wrap items-center text-muted-foreground gap-x-6 gap-y-2 extra-class'
        );
    });

    it('applies "w-5 h-5" class to icons', () => {
        render(
            <CardFooter
                items={[
                    {
                        icon: (props) => (
                            <svg data-testid="sized-icon" {...props} />
                        ),
                        label: 'IconLabel',
                    },
                ]}
            />
        );

        const icon = screen.getByTestId('sized-icon');
        expect(icon).toHaveClass('w-5 h-5');
        expect(screen.getByText('IconLabel')).toBeInTheDocument();
    });
});
