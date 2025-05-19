import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeSelector } from './index';

// ✅ Mock helpers/hooks
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
    t: (key, args) => {
      if (args) return key.replace('{0}', args[0]);
      return key;
    },
  }),
}));

vi.mock('../../hooks/useRequest', () => ({
  useRequest: () => ({
    request: vi.fn().mockResolvedValue({
      data: [{ code: 'VALID123', team: {}, organization: {} }],
    }),
    loading: false,
    error: null,
    setError: vi.fn(),
  }),
}));

vi.mock('../../helpers/validateCode', () => ({
  validateCode: vi.fn(() => true),
}));

vi.mock('../../helpers/getCDNUrl', () => ({
  getCDNUrl: (path) => `https://cdn.fake/${path}`,
}));

describe('CodeSelector', () => {
  it('renders modal with code input and submit button', () => {
    render(<CodeSelector />);
    expect(screen.getByText('entercode-text')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'entercode-submit' })).toBeInTheDocument();
  });

  it('updates typed code and submits form', async () => {
    const { getByRole } = render(<CodeSelector />);
    const input = getByRole('textbox');
    const submit = getByRole('button', { name: 'entercode-submit' });

    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(input.value).toBe('12345'); // if bound correctly
    });
  });

  it('renders fallback image URL', () => {
    render(<CodeSelector />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('https://cdn.fake/3movies/bg-code.jpg'));
  });
});
