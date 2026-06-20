import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HerdRecords from '../../../Pages/Dashboard/HerdRecords';

describe('HerdRecords', () => {
  it('renders herd directory heading', () => {
    render(<HerdRecords />);
    expect(screen.getByText(/herd directory/i)).toBeInTheDocument();
  });

  it('renders veterinary history heading', () => {
    render(<HerdRecords />);
    expect(screen.getByText(/veterinary history/i)).toBeInTheDocument();
  });

  it('renders farm activity log heading', () => {
    render(<HerdRecords />);
    expect(screen.getByText(/farm activity log/i)).toBeInTheDocument();
  });

  it('renders all herd data rows', () => {
    render(<HerdRecords />);
    // G0001 and G0002 appear in both herd and vet tables
    const g0001 = screen.getAllByText('G0001');
    expect(g0001.length).toBeGreaterThanOrEqual(1);
    const g0002 = screen.getAllByText('G0002');
    expect(g0002.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('G0003')).toBeInTheDocument();
  });

  it('renders breed information', () => {
    render(<HerdRecords />);
    expect(screen.getByText('Galla')).toBeInTheDocument();
    expect(screen.getByText('Local')).toBeInTheDocument();
    expect(screen.getByText('Alpine')).toBeInTheDocument();
  });

  it('renders vet records', () => {
    render(<HerdRecords />);
    expect(screen.getByText('FMD Vaccine')).toBeInTheDocument();
    expect(screen.getByText('Deworming')).toBeInTheDocument();
  });

  it('renders clinical notes with conditional styling', () => {
    render(<HerdRecords />);
    const followUp = screen.getByText('Follow-up needed');
    expect(followUp.className).toContain('bg-amber-100');
  });

  it('renders activity log entries', () => {
    render(<HerdRecords />);
    expect(screen.getByText('Feeding')).toBeInTheDocument();
    expect(screen.getByText('Visitor')).toBeInTheDocument();
    expect(screen.getByText('Normal routine')).toBeInTheDocument();
    expect(screen.getByText('Attachment student')).toBeInTheDocument();
  });

  it('applies healthy status styling', () => {
    render(<HerdRecords />);
    const healthyBadges = screen.getAllByText('Healthy');
    const herdHealthy = healthyBadges.find(el => el.className.includes('bg-emerald-100'));
    expect(herdHealthy).toBeDefined();
  });
});
