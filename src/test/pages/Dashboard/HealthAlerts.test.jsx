import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HealthAlerts from '../../../Pages/Dashboard/HealthAlerts';

describe('HealthAlerts', () => {
  it('renders the heading', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('Herd Health Alerts')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByText('Task')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders all alert rows', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('Goat #402')).toBeInTheDocument();
    expect(screen.getByText('Goat #115')).toBeInTheDocument();
    expect(screen.getByText('Goat #209')).toBeInTheDocument();
  });

  it('renders task types', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('Vaccination')).toBeInTheDocument();
    expect(screen.getByText('Vet Checkup')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Review')).toBeInTheDocument();
  });

  it('renders status badges with correct text', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('OVERDUE')).toBeInTheDocument();
    expect(screen.getByText('DUE')).toBeInTheDocument();
    expect(screen.getByText('HEALTHY')).toBeInTheDocument();
  });

  it('applies correct status styling classes', () => {
    render(<HealthAlerts />);
    const overdue = screen.getByText('OVERDUE');
    expect(overdue.className).toContain('bg-red-100');
    expect(overdue.className).toContain('text-red-700');

    const due = screen.getByText('DUE');
    expect(due.className).toContain('bg-orange-100');

    const healthy = screen.getByText('HEALTHY');
    expect(healthy.className).toContain('bg-green-100');
  });

  it('renders dates for all alerts', () => {
    render(<HealthAlerts />);
    expect(screen.getByText('2026-06-15')).toBeInTheDocument();
    expect(screen.getByText('2026-06-20')).toBeInTheDocument();
    expect(screen.getByText('2026-06-25')).toBeInTheDocument();
  });
});
