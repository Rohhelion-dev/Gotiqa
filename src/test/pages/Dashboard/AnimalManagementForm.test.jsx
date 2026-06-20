import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AnimalManagementForm from '../../../Pages/Dashboard/AnimalManagementForm';

describe('AnimalManagementForm', () => {
  const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

  it('renders all form fields', () => {
    render(<AnimalManagementForm />);

    expect(getFieldByName('tagNumber')).toBeInTheDocument();
    expect(getFieldByName('name')).toBeInTheDocument();
    expect(getFieldByName('species')).toBeInTheDocument();
    expect(getFieldByName('breed')).toBeInTheDocument();
    expect(getFieldByName('age')).toBeInTheDocument();
    expect(getFieldByName('gender')).toBeInTheDocument();
    expect(getFieldByName('weight')).toBeInTheDocument();
    expect(getFieldByName('notes')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<AnimalManagementForm />);
    expect(screen.getByRole('button', { name: /add animal/i })).toBeInTheDocument();
  });

  it('renders the heading', () => {
    render(<AnimalManagementForm />);
    expect(screen.getByText('Animal Management')).toBeInTheDocument();
  });

  it('updates form values on user input', async () => {
    render(<AnimalManagementForm />);
    const user = userEvent.setup();

    const tagInput = getFieldByName('tagNumber');
    await user.type(tagInput, 'TAG-001');
    expect(tagInput).toHaveValue('TAG-001');

    const nameInput = getFieldByName('name');
    await user.type(nameInput, 'Bella');
    expect(nameInput).toHaveValue('Bella');
  });

  it('allows selecting species and gender from dropdowns', async () => {
    render(<AnimalManagementForm />);
    const user = userEvent.setup();

    const speciesSelect = getFieldByName('species');
    await user.selectOptions(speciesSelect, 'goat');
    expect(speciesSelect).toHaveValue('goat');

    const genderSelect = getFieldByName('gender');
    await user.selectOptions(genderSelect, 'female');
    expect(genderSelect).toHaveValue('female');
  });

  it('logs form data on submit', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<AnimalManagementForm />);
    const user = userEvent.setup();

    await user.type(getFieldByName('tagNumber'), 'TAG-002');
    await user.selectOptions(getFieldByName('species'), 'goat');
    await user.selectOptions(getFieldByName('gender'), 'male');
    await user.click(screen.getByRole('button', { name: /add animal/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Admin submitted animal data:',
      expect.objectContaining({
        tagNumber: 'TAG-002',
        species: 'goat',
        gender: 'male',
      })
    );

    consoleSpy.mockRestore();
  });
});
