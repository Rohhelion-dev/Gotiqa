import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeatureGrid from '../../components/FeatureGrid';

describe('FeatureGrid', () => {
  it('renders all three feature cards', () => {
    render(<FeatureGrid />);
    expect(screen.getByText('Herd Management')).toBeInTheDocument();
    expect(screen.getByText('Veterinary Logging')).toBeInTheDocument();
    expect(screen.getByText('Atmospheric Tracking')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeatureGrid />);
    expect(screen.getByText(/track structural metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/clinical record paths/i)).toBeInTheDocument();
    expect(screen.getByText(/sync with direct field weather/i)).toBeInTheDocument();
  });

  it('renders feature icons', () => {
    render(<FeatureGrid />);
    expect(screen.getByText('🐐')).toBeInTheDocument();
    expect(screen.getByText('🩺')).toBeInTheDocument();
    expect(screen.getByText('🌤️')).toBeInTheDocument();
  });
});
