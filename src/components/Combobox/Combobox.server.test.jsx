import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const requestMock = vi.fn().mockResolvedValue({
    data: [{ id: 1, name: 'Result A' }],
  });

vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key, // passthrough mock
  }),
}));

vi.mock('../../hooks/useRequest', () => ({
    useRequest: () => ({
      request: requestMock,
      loading: false,
      error: null,
    }),
    __esModule: true,
  }));

vi.mock('lodash-es', async () => {
    const actual = await vi.importActual('lodash-es');
    return {
      ...actual,
      debounce: (fn) => fn,
    };
  });

// ✅ Required for popover scroll behavior
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// ✅ Import after mocks
import { Combobox } from './index';

describe('Combobox (server search)', () => {
  it('calls server search when requestObject is passed', async () => {
    render(<Combobox requestObject={{ url: '/search' }} />);
    fireEvent.click(screen.getByRole('combobox'));

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'A' } });

    await waitFor(() => {
      expect(requestMock).toHaveBeenCalled();
    });
  });
});
