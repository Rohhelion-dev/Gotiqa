import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Overview from '../../../Pages/Dashboard/Overview';

describe('Overview', () => {
  it('renders the dashboard heading', () => {
    render(<Overview />);
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });

  it('renders metric cards', () => {
    render(<Overview />);
    expect(screen.getByText('Total Herd')).toBeInTheDocument();
    expect(screen.getByText('127')).toBeInTheDocument();
    expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
    expect(screen.getByText('KSh 540,000')).toBeInTheDocument();
    expect(screen.getByText('Vaccinated')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Farm Staff')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders weather section', () => {
    render(<Overview />);
    expect(screen.getByText('Farm Weather & Conditions')).toBeInTheDocument();
    expect(screen.getByText('24°C')).toBeInTheDocument();
  });

  it('renders weather details', () => {
    render(<Overview />);
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('12 km/h')).toBeInTheDocument();
    expect(screen.getByText('Barometric Pressure')).toBeInTheDocument();
    expect(screen.getByText('1013 mb')).toBeInTheDocument();
  });

  it('renders refresh button', () => {
    render(<Overview />);
    expect(screen.getByRole('button', { name: /refresh data/i })).toBeInTheDocument();
  });
});
