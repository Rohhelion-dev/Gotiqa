import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../../../Pages/Website/Contact';

describe('Contact', () => {
  it('renders the contact form heading', () => {
    render(<Contact />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<Contact />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email or Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Your Message/Inquiry')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('submits form and logs data', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Contact />);
    const user = userEvent.setup();

    const inputs = screen.getAllByRole('textbox');
    // name, contactInfo, and message (textarea is also a textbox)
    await user.type(inputs[0], 'John Doe');
    await user.type(inputs[1], 'john@example.com');
    await user.type(inputs[2], 'I want to buy goats');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Form Submitted:',
      expect.objectContaining({
        name: 'John Doe',
        contactInfo: 'john@example.com',
        message: 'I want to buy goats',
      })
    );
    expect(alertSpy).toHaveBeenCalledWith('Thank you! Your inquiry has been received.');

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
