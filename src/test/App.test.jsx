import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

describe('App', () => {
  it('renders the home page by default', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Gotiqa SmartFarm')).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getByText('GotiqaSmartFarm')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByText(/gotiqa smart farm/i)).toBeInTheDocument();
  });

  it('navigates to about page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('about'));
    expect(screen.getByText('Our Sustainable Vision')).toBeInTheDocument();
  });

  it('navigates to products page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('products'));
    expect(screen.getByText('Available Goats & Livestock')).toBeInTheDocument();
  });

  it('navigates to contact page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('contact'));
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('navigates to auth page via Secure Terminal Access', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /secure terminal access/i }));
    expect(screen.getByText('Welcome Back to Gotiqa')).toBeInTheDocument();
  });

  it('shows access restricted when navigating to dashboard without login', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /launch dashboard/i }));
    expect(screen.getByText('Access Restricted')).toBeInTheDocument();
    expect(screen.getByText('Please log in to continue.')).toBeInTheDocument();
  });

  it('navigates to login from access restricted page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /launch dashboard/i }));
    await user.click(screen.getByRole('button', { name: /go to login/i }));
    expect(screen.getByText('Welcome Back to Gotiqa')).toBeInTheDocument();
  });

  it('shows dashboard after successful login', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /secure terminal access/i }));
    await user.type(screen.getByPlaceholderText('farmer@gotiqa.com'), 'farmer@gotiqa.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Farm Operations Overview')).toBeInTheDocument();
    expect(screen.getByText('Admin Command Center')).toBeInTheDocument();
  });
});
