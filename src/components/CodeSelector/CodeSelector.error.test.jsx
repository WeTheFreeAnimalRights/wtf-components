import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../hooks/useCode', () => ({
  useCode: () => ({
    code: { empty: true, code: 'ABC123' },
    selected: false,
    setCode: vi.fn(),
    defaultCode: { code: 'default' },
  }),
}));

vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key,
  }),
}));

vi.mock('../../helpers/validateCode', () => ({
  validateCode: () => true,
}));

vi.mock('../../helpers/getCDNUrl', () => ({
  getCDNUrl: (path) => `https://cdn.fake/${path}`,
}));

vi.mock('../../hooks/useRequest', () => ({
  useRequest: () => ({
    request: vi.fn().mockResolvedValue(null),
    loading: false,
    error: 'Something went wrong!',
    setError: vi.fn(),
  }),
}));

// ✅ Import after all mocks
import { CodeSelector } from './index';

describe('CodeSelector (error state)', () => {
  it('shows error message', async () => {
    render(<CodeSelector />);

    expect(
      await screen.findByText((text) =>
        text.includes('Something went wrong!')
      )
    ).toBeInTheDocument();
  });
});
