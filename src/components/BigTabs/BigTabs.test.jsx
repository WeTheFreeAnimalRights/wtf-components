import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BigTabs } from './index';

// Mocks
jest.mock('./TabButton', () => ({
    TabButton: ({ children, onClick, selected }) => (
        <button
            data-testid="tab-button"
            data-selected={selected}
            onClick={onClick}
        >
            {children}
        </button>
    ),
}));

jest.mock('./BigTab', () => ({
    BigTab: ({ children, visible }) =>
        visible ? <div data-testid="tab-content">{children}</div> : null,
}));

jest.mock('_/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('BigTabs', () => {
    const TabContent = ({ name, children }) => (
        <div name={name}>{children}</div>
    );

    it('renders all tab buttons', () => {
        render(
            <BigTabs>
                <TabContent name="Tab One">Content One</TabContent>
                <TabContent name="Tab Two">Content Two</TabContent>
                <TabContent name="Tab Three">Content Three</TabContent>
            </BigTabs>
        );

        const buttons = screen.getAllByTestId('tab-button');
        expect(buttons).toHaveLength(3);
        expect(buttons[0]).toHaveTextContent('Tab One');
        expect(buttons[1]).toHaveTextContent('Tab Two');
        expect(buttons[2]).toHaveTextContent('Tab Three');
    });

    it('shows the first tab’s content by default', () => {
        render(
            <BigTabs>
                <TabContent name="Tab One">Content One</TabContent>
                <TabContent name="Tab Two">Content Two</TabContent>
            </BigTabs>
        );

        const content = screen.getByTestId('tab-content');
        expect(content).toHaveTextContent('Content One');
    });

    it('shows the correct content when a tab is clicked', () => {
        render(
            <BigTabs>
                <TabContent name="Tab One">First</TabContent>
                <TabContent name="Tab Two">Second</TabContent>
            </BigTabs>
        );

        // Click second tab
        const buttons = screen.getAllByTestId('tab-button');
        fireEvent.click(buttons[1]);

        const content = screen.getByTestId('tab-content');
        expect(content).toHaveTextContent('Second');
    });

    it('adds custom className to outer wrapper', () => {
        const { container } = render(
            <BigTabs className="custom-wrapper">
                <TabContent name="Tab One">One</TabContent>
            </BigTabs>
        );

        const outerDiv = container.querySelector('div.custom-wrapper');
        expect(outerDiv).toBeInTheDocument();
    });
});
