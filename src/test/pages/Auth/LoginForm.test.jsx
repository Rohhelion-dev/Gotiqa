import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginForm from '../../../Pages/Auth/LoginForm';

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('farmer@gotiqa.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders form labels', () => {
    render(<LoginForm />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
