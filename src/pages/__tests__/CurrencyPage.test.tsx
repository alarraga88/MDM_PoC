// src/pages/__tests__/CurrencyPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, vi, test, expect, beforeEach } from 'vitest';
import CurrencyPage from '../CurrencyPage';

// Mock API methods
vi.mock('../../mock/API/currencyApi', () => ({
  getCurrencies: vi.fn(() => Promise.resolve([
    { id: '1', code: 'USD', name: 'US Dollar' },
    { id: '2', code: 'EUR', name: 'Euro' },
  ])),
  createCurrency: vi.fn(() => Promise.resolve()),
  updateCurrency: vi.fn(() => Promise.resolve()),
  deleteCurrency: vi.fn(() => Promise.resolve()),
}));

describe('CurrencyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders currency list and opens form on "Create Currency"', async () => {
    render(<CurrencyPage />);

    // Wait for currency list to load
    await waitFor(() => {
      expect(screen.getByText(/Currencies/i)).toBeInTheDocument();
      expect(screen.getByText(/US Dollar/i)).toBeInTheDocument();
      expect(screen.getByText(/Euro/i)).toBeInTheDocument();
    });

    // Click "Create Currency"
    fireEvent.click(screen.getByRole('button', { name: /Create Currency/i }));

    // Form and title should show up
    expect(await screen.findByText(/Currency Management/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });
});
