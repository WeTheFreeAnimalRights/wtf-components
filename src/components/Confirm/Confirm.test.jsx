import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Confirm } from './index';
import { AppStateProvider } from '../../store';
import { useConfirm } from './useConfirm';

// Mock translations
vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key,
  }),
}));

// Component that triggers the confirm dialog
const ConfirmTestComponent = ({
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  callback = vi.fn(),
  hideCancel = false,
}) => {
  const { confirm } = useConfirm();

  return (
    <>
      <button
        onClick={() =>
          confirm({
            title,
            message,
            callback,
            hideCancel,
          })
        }
      >
        Trigger Confirm
      </button>
      <Confirm />
    </>
  );
};

describe('Confirm', () => {
  it('does not render modal until triggered', () => {
    render(
      <AppStateProvider>
        <ConfirmTestComponent />
      </AppStateProvider>
    );

    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('renders modal with confirm and cancel buttons when visible', () => {
    render(
      <AppStateProvider>
        <ConfirmTestComponent />
      </AppStateProvider>
    );

    fireEvent.click(screen.getByText('Trigger Confirm'));

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
    expect(screen.getByText('confirm-ok')).toBeInTheDocument();
    expect(screen.getByText('confirm-cancel')).toBeInTheDocument();
  });

  it('calls callback and hides modal on OK click', () => {
    const callback = vi.fn();

    render(
      <AppStateProvider>
        <ConfirmTestComponent callback={callback} />
      </AppStateProvider>
    );

    fireEvent.click(screen.getByText('Trigger Confirm'));
    fireEvent.click(screen.getByText('confirm-ok'));

    expect(callback).toHaveBeenCalled();
  });

  it('closes modal when cancel is clicked', () => {
    render(
      <AppStateProvider>
        <ConfirmTestComponent />
      </AppStateProvider>
    );

    fireEvent.click(screen.getByText('Trigger Confirm'));
    fireEvent.click(screen.getByText('confirm-cancel'));

    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('hides cancel button if hideCancel is true', () => {
    render(
      <AppStateProvider>
        <ConfirmTestComponent hideCancel />
      </AppStateProvider>
    );

    fireEvent.click(screen.getByText('Trigger Confirm'));

    expect(screen.queryByText('confirm-cancel')).not.toBeInTheDocument();
  });
});
