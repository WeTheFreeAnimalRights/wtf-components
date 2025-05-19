import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../hooks/useTranslations', () => ({
    useTranslations: () => ({ t: (key) => key }),
  }));

  vi.mock('../../hooks/useRequest', () => ({
    useRequest: () => ({
      request: vi.fn(),
      loading: true,
      error: null,
    }),
  }));

  vi.mock('lodash-es', async () => {
    const actual = await vi.importActual('lodash-es');
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
