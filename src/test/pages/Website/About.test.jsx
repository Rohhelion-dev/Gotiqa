import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../../../Pages/Website/About';

describe('About', () => {
  it('renders the vision heading', () => {
    render(<About />);
    expect(screen.getByText('Our Sustainable Vision')).toBeInTheDocument();
  });

  it('renders content blocks', () => {
    render(<About />);
    expect(screen.getByText(/ecological stewardship/i)).toBeInTheDocument();
    expect(screen.getByText(/tech-agritech intersection/i)).toBeInTheDocument();
  });

  it('renders the summary banner quote', () => {
    render(<About />);
    expect(screen.getByText(/real-time insights/i)).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<About />);
    expect(screen.getByText(/environmentally adaptive agricultural model/i)).toBeInTheDocument();
  });
});
