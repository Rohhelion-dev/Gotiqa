import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FarmStats from '../../../Pages/Website/FarmStats';

describe('FarmStats', () => {
  it('renders the heading', () => {
    render(<FarmStats />);
    expect(screen.getByText('Our Farm at a Glance')).toBeInTheDocument();
  });

  it('renders all stat values', () => {
    render(<FarmStats />);
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    render(<FarmStats />);
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('Healthy Herd')).toBeInTheDocument();
    expect(screen.getByText('Vet Visits/Year')).toBeInTheDocument();
    expect(screen.getByText('Breeds Available')).toBeInTheDocument();
  });

  it('renders the feed management section', () => {
    render(<FarmStats />);
    expect(screen.getByText('Sustainable Feed Management')).toBeInTheDocument();
    expect(screen.getByText(/quality nutrition/i)).toBeInTheDocument();
  });
});
