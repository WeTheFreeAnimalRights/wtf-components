import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({ t: (key) => key }),
}));

jest.mock('../../hooks/useRequest', () => ({
  useRequest: () => ({
    request: jest.fn(),
    loading: true, // ✅ NOW IT WORKS
    error: null,
  }),
}));

jest.mock('lodash-es', () => {
  const actual = jest.requireActual('lodash-es');
  return {
    ...actual,
    debounce: (fn) => fn,
  };
});

import { Combobox } from './index';

describe('Combobox (loading state)', () => {
  it('displays loading spinner when loading is true', async () => {
    render(<Combobox options={[]} />);
  fireEvent.click(screen.getByRole('combobox'));
    expect(await screen.findByTestId('spinner')).toBeInTheDocument();
  });
});
