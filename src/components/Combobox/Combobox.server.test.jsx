import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ✅ Mocks
jest.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key, // passthrough mock
  }),
}));

jest.mock('../../hooks/useRequest', () => {
  const requestMock = jest.fn().mockResolvedValue({
    data: [{ id: 1, name: 'Result A' }],
  });

  return {
    useRequest: () => ({
      request: requestMock,
      loading: false,
      error: null,
    }),
    __esModule: true,
    requestMock,
  };
});

jest.mock('lodash-es', () => {
  const actual = jest.requireActual('lodash-es');
  return {
    ...actual,
    debounce: (fn) => fn, // disable delay for testing
  };
});

// ✅ Required for popover scroll behavior
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// ✅ Import after mocks
import { Combobox } from './index';

describe('Combobox (server search)', () => {
  it('calls server search when requestObject is passed', async () => {
    const { requestMock } = require('../../hooks/useRequest');

    render(<Combobox requestObject={{ url: '/search' }} />);
    fireEvent.click(screen.getByRole('combobox'));

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'A' } });

    await waitFor(() => {
      expect(requestMock).toHaveBeenCalled();
    });
  });
});
