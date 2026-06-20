import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the copyright text with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
    expect(screen.getByText(/gotiqa smart farm/i)).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });

  it('renders links as anchor elements', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
