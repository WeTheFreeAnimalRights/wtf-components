import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateProvider, useGlobalValue } from '../../store';
import { confirmState } from '../../appState';
import { useConfirm } from './useConfirm';

// A test component that uses the hook
const ConfirmTestComponent = () => {
  const { confirm } = useConfirm();
  const state = useGlobalValue(confirmState);

  return (
    <div data-test>
      <button onClick={() => confirm({
        title: 'Test Title',
        message: 'Test Message',
        callback: () => 'confirmed!',
        hideCancel: true,
      })}>
        Trigger Confirm
      </button>

      <div data-testid="title">{state.title}</div>
      <div data-testid="message">{state.message}</div>
      <div data-testid="hideCancel">{state.hideCancel ? 'true' : 'false'}</div>
      <div data-testid="hasCallback">{typeof state.callback}</div>
    </div>
  );
};

describe('useConfirm', () => {
  it('sets confirmState with correct values', () => {
    render(
      <AppStateProvider>
        <ConfirmTestComponent />
      </AppStateProvider>
    );

    fireEvent.click(screen.getByText('Trigger Confirm'));

expect(screen.getByTestId('title')).toHaveTextContent('Test Title');
expect(screen.getByTestId('message')).toHaveTextContent('Test Message');
expect(screen.getByTestId('hideCancel')).toHaveTextContent('true');
expect(screen.getByTestId('hasCallback')).toHaveTextContent('function');
  });
});
