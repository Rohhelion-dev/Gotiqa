import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import HealthRecordsForm from '../../../Pages/Dashboard/HealthRecordsForm';

describe('HealthRecordsForm', () => {
const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

it('renders all fields', () => {
render(<HealthRecordsForm />);

```
expect(getFieldByName('animal')).toBeInTheDocument();
expect(getFieldByName('healthStatus')).toBeInTheDocument();
expect(getFieldByName('temperature')).toBeInTheDocument();
expect(getFieldByName('weight')).toBeInTheDocument();
expect(getFieldByName('diagnosis')).toBeInTheDocument();
expect(getFieldByName('treatment')).toBeInTheDocument();
expect(getFieldByName('vetNotes')).toBeInTheDocument();
```

});

it('renders submit button', () => {
render(<HealthRecordsForm />);
expect(
screen.getByRole('button', { name: /add health record/i })
).toBeInTheDocument();
});

it('renders heading', () => {
render(<HealthRecordsForm />);
expect(screen.getByText('Health Records')).toBeInTheDocument();
});

it('updates input fields', async () => {
render(<HealthRecordsForm />);
const user = userEvent.setup();

```
const diagnosis = getFieldByName('diagnosis');
await user.type(diagnosis, 'Fever');

expect(diagnosis).toHaveValue('Fever');
```

});

it('logs submitted data', async () => {
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

```
render(<HealthRecordsForm />);
const user = userEvent.setup();

await user.type(getFieldByName('animal'), 'GOAT001');
await user.selectOptions(
  getFieldByName('healthStatus'),
  'healthy'
);

await user.click(
  screen.getByRole('button', {
    name: /add health record/i,
  })
);

expect(consoleSpy).toHaveBeenCalled();

consoleSpy.mockRestore();
```

});
});
