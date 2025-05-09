import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect } from 'vitest';
import Login from '../Login';

//using createMockUser
vi.mock('../../auth/AuthService', () => ({
  createMockUser: vi.fn(() => Promise.resolve())
}));

//using mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('Login page', () => {
  test('submits form with username and password', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'admin' }
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    //assert that input values are there
    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('admin');
  });

  test('shows error if form is empty', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
  });
});
