import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SignUpForm from '../../../Pages/Auth/SignUpForm';

describe('SignUpForm', () => {
  it('renders all input fields', () => {
    render(<SignUpForm />);
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('farmer@gotiqa.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders sign up button', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders form labels', () => {
    render(<SignUpForm />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
