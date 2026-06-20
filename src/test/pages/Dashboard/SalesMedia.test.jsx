import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SalesMedia from '../../../Pages/Dashboard/SalesMedia';

describe('SalesMedia', () => {
  it('renders sales heading', () => {
    render(<SalesMedia />);
    expect(screen.getByText(/live sales/i)).toBeInTheDocument();
  });

  it('renders all stock items', () => {
    render(<SalesMedia />);
    expect(screen.getByText('Breeding Goats')).toBeInTheDocument();
    expect(screen.getByText('Goat Kids')).toBeInTheDocument();
    expect(screen.getByText('Goat Meat')).toBeInTheDocument();
  });

  it('renders stock quantities', () => {
    render(<SalesMedia />);
    expect(screen.getByText(/stock\/volume: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/stock\/volume: 12/i)).toBeInTheDocument();
    expect(screen.getByText(/stock\/volume: bulk orders/i)).toBeInTheDocument();
  });

  it('renders request quote button', () => {
    render(<SalesMedia />);
    expect(screen.getByRole('button', { name: /request commercial quote/i })).toBeInTheDocument();
  });

  it('renders social media section', () => {
    render(<SalesMedia />);
    expect(screen.getByText(/media & social/i)).toBeInTheDocument();
    expect(screen.getByText('@gotiqafarm')).toBeInTheDocument();
  });

  it('renders content planning queue', () => {
    render(<SalesMedia />);
    expect(screen.getByText(/content planning queue/i)).toBeInTheDocument();
    expect(screen.getByText(/goat feeding schedule/i)).toBeInTheDocument();
  });

  it('has correct TikTok link', () => {
    render(<SalesMedia />);
    const link = screen.getByText('@gotiqafarm');
    expect(link).toHaveAttribute('href', 'https://tiktok.com/@gotiqafarm');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
