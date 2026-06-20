import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Products from '../../../Pages/Website/Products';

describe('Products', () => {
  it('renders the product catalog heading', () => {
    render(<Products />);
    expect(screen.getByText('Available Goats & Livestock')).toBeInTheDocument();
  });

  it('renders all three product cards', () => {
    render(<Products />);
    expect(screen.getByText('Breeding Goats')).toBeInTheDocument();
    expect(screen.getByText('Goat Kids')).toBeInTheDocument();
    expect(screen.getByText('Goat Meat')).toBeInTheDocument();
  });

  it('renders prices for each product', () => {
    render(<Products />);
    expect(screen.getByText('KSh 22,000 - 29,000')).toBeInTheDocument();
    expect(screen.getByText('KSh 11,000 - 17,000')).toBeInTheDocument();
    expect(screen.getByText('KSh 700')).toBeInTheDocument();
  });

  it('renders badges for each product', () => {
    render(<Products />);
    expect(screen.getByText('Premium Stock')).toBeInTheDocument();
    expect(screen.getByText('Young Livestock')).toBeInTheDocument();
    expect(screen.getByText('Organic Wholesale')).toBeInTheDocument();
  });

  it('shows all products as Available', () => {
    render(<Products />);
    const statuses = screen.getAllByText('Available');
    expect(statuses).toHaveLength(3);
  });

  it('renders request quote buttons for each product', () => {
    render(<Products />);
    const buttons = screen.getAllByRole('button', { name: /request quote/i });
    expect(buttons).toHaveLength(3);
  });

  it('triggers alert on quote request click', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Products />);
    const user = userEvent.setup();

    const buttons = screen.getAllByRole('button', { name: /request quote/i });
    await user.click(buttons[0]);

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining('Breeding Goats')
    );

    alertSpy.mockRestore();
  });
});
