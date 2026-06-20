import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  const setup = (currentView = 'home') => {
    const setCurrentView = vi.fn();
    const user = userEvent.setup();
    render(<Navbar currentView={currentView} setCurrentView={setCurrentView} />);
    return { setCurrentView, user };
  };

  it('renders the brand name', () => {
    setup();
    expect(screen.getByText('GotiqaSmartFarm')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    setup();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('products')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
  });

  it('renders secure terminal access button', () => {
    setup();
    expect(screen.getByRole('button', { name: /secure terminal access/i })).toBeInTheDocument();
  });

  it('highlights the active navigation link', () => {
    setup('about');
    const aboutBtn = screen.getByText('about');
    expect(aboutBtn.className).toContain('font-bold');
    expect(aboutBtn.className).toContain('text-[#1b4332]');
  });

  it('calls setCurrentView when a nav link is clicked', async () => {
    const { setCurrentView, user } = setup();
    await user.click(screen.getByText('products'));
    expect(setCurrentView).toHaveBeenCalledWith('products');
  });

  it('calls setCurrentView with auth on terminal access click', async () => {
    const { setCurrentView, user } = setup();
    await user.click(screen.getByRole('button', { name: /secure terminal access/i }));
    expect(setCurrentView).toHaveBeenCalledWith('auth');
  });
});
