import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Combobox } from './index';

jest.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../../hooks/useRequest', () => ({
  useRequest: () => ({
    request: jest.fn().mockResolvedValue({ data: [] }),
    loading: false,
    error: null,
  }),
}));

// 🧠 Make debounce call instantly
jest.mock('lodash-es', () => {
  const actual = jest.requireActual('lodash-es');
  return {
    ...actual,
    debounce: (fn) => fn,
  };
});

describe('Combobox', () => {
  const options = [
    { value: '1', label: 'First Option' },
    { value: '2', label: 'Second Option' },
  ];

  it('renders with placeholder', () => {
    render(<Combobox options={options} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('opens popover and shows options on click', async () => {
    render(<Combobox options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(await screen.findByText('First Option')).toBeInTheDocument();
    expect(screen.getByText('Second Option')).toBeInTheDocument();
  });

  it('calls onSelect when an option is clicked', async () => {
    const onSelect = jest.fn();
    render(<Combobox options={options} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(await screen.findByText('Second Option'));

    expect(onSelect).toHaveBeenCalledWith('2');
  });

  it('renders empty message when no results and input has value', async () => {
    render(<Combobox options={[]} />);
    fireEvent.click(screen.getByRole('combobox'));
fireEvent.change(screen.getByPlaceholderText('combo-search-placeholder'), {
  target: { value: 'Nope' },
});
    expect(await screen.findByText('combo-empty')).toBeInTheDocument();
  });

});
