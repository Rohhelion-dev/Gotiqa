import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AuthContainer from '../../../Pages/Auth/AuthContainer';

describe('AuthContainer', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      setUser: vi.fn(),
      onSuccess: vi.fn(),
      ...props,
    };
    const user = userEvent.setup();
    render(<AuthContainer {...defaultProps} />);
    return { user, ...defaultProps };
  };

  it('renders login form with email and password fields', () => {
    setup();
    expect(screen.getByPlaceholderText('farmer@gotiqa.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders welcome heading and description', () => {
    setup();
    expect(screen.getByText('Welcome Back to Gotiqa')).toBeInTheDocument();
    expect(screen.getByText('Enter your credentials to access the farm dashboard.')).toBeInTheDocument();
  });

  it('shows error on invalid credentials', async () => {
    const { user } = setup();

    await user.type(screen.getByPlaceholderText('farmer@gotiqa.com'), 'wrong@email.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
  });

  it('calls setUser and onSuccess with valid credentials', async () => {
    const { user, setUser, onSuccess } = setup();

    await user.type(screen.getByPlaceholderText('farmer@gotiqa.com'), 'farmer@gotiqa.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(setUser).toHaveBeenCalledWith({ email: 'farmer@gotiqa.com', role: 'admin' });
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('does not call onSuccess on failed login', async () => {
    const { user, onSuccess } = setup();

    await user.type(screen.getByPlaceholderText('farmer@gotiqa.com'), 'bad@email.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'bad');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('renders sign up prompt', () => {
    setup();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
