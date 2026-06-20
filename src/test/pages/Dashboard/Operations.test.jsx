import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Operations from '../../../Pages/Dashboard/Operations';

describe('Operations', () => {
  it('renders the overview heading', () => {
    render(<Operations />);
    expect(screen.getByText('Farm Operations Overview')).toBeInTheDocument();
  });

  it('renders all three operational sections', () => {
    render(<Operations />);
    expect(screen.getByText('Personnel & Staff')).toBeInTheDocument();
    expect(screen.getByText('Investor Relations')).toBeInTheDocument();
    expect(screen.getByText('Goat Assets')).toBeInTheDocument();
  });

  it('renders employee count info', () => {
    render(<Operations />);
    expect(screen.getByText(/12 active farm employees/i)).toBeInTheDocument();
  });

  it('renders investor info', () => {
    render(<Operations />);
    expect(screen.getByText(/4 primary project investors/i)).toBeInTheDocument();
  });

  it('renders stock count info', () => {
    render(<Operations />);
    expect(screen.getByText(/350\+ heads of stock/i)).toBeInTheDocument();
  });
});
