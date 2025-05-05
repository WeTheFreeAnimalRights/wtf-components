import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../../hooks/useCode', () => ({
  useCode: () => ({
    code: { empty: true, code: 'ABC123' },
    selected: false,
    setCode: jest.fn(),
    defaultCode: { code: 'default' },
  }),
}));

jest.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../../helpers/validateCode', () => ({
  validateCode: () => true,
}));

jest.mock('../../helpers/getCDNUrl', () => ({
  getCDNUrl: (path) => `https://cdn.fake/${path}`,
}));

jest.mock('../../hooks/useRequest', () => ({
  useRequest: () => ({
    request: jest.fn().mockResolvedValue(null),
    loading: false,
    error: 'Something went wrong!',
    setError: jest.fn(),
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
