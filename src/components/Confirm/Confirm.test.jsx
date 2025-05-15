import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Confirm } from './index';
import { confirmState } from '../../appState';
import { AppStateProvider, createGlobalState } from '../../store';

jest.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key,
  }),
}));

const mockConfirmState = createGlobalState({
  key: 'confirmStateTest',
  default: {
    visible: false,
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
    callback: jest.fn(),
    hideCancel: false,
  },
});

const renderWithConfirmState = (initialState) => {
  return render(
    <AppStateProvider
      initializeState={({ set }) => set(confirmState, initialState)}
    >
      <Confirm />
    </AppStateProvider>
  );
};

describe('Confirm', () => {
  it('does not render modal when not visible', () => {
    renderWithConfirmState({ visible: false });
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('renders modal with confirm and cancel buttons when visible', () => {
    renderWithConfirmState({
      visible: true,
      title: 'Are you sure?',
      message: 'This action cannot be undone.',
    });

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('confirm-ok')).toBeInTheDocument();
    expect(screen.getByText('confirm-cancel')).toBeInTheDocument();
  });

  it('calls callback and hides modal on OK click', () => {
    const callback = jest.fn();
    renderWithConfirmState({
      visible: true,
      title: 'Confirm',
      message: 'Go?',
      callback,
    });

    fireEvent.click(screen.getByText('confirm-ok'));
    expect(callback).toHaveBeenCalled();
  });

  it('closes modal when cancel is clicked', () => {
    renderWithConfirmState({
      visible: true,
      title: 'Confirm',
      message: 'Go?',
    });

    fireEvent.click(screen.getByText('confirm-cancel'));
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });

  it('hides cancel button if hideCancel is true', () => {
    renderWithConfirmState({
      visible: true,
      title: 'Confirm',
      message: 'Go?',
      hideCancel: true,
    });

    expect(screen.queryByText('confirm-cancel')).not.toBeInTheDocument();
  });
});
