import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ProductionRecordsForm from '../../../Pages/Dashboard/ProductionRecordsForm';

describe('ProductionRecordsForm', () => {
const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

it('renders all fields', () => {
render(<ProductionRecordsForm />);

```
expect(getFieldByName('animal')).toBeInTheDocument();
expect(getFieldByName('productionType')).toBeInTheDocument();
expect(getFieldByName('quantity')).toBeInTheDocument();
expect(getFieldByName('unit')).toBeInTheDocument();
expect(getFieldByName('qualityGrade')).toBeInTheDocument();
expect(getFieldByName('notes')).toBeInTheDocument();
```

});

it('renders heading', () => {
render(<ProductionRecordsForm />);
expect(screen.getByText('Production Records')).toBeInTheDocument();
});

it('updates form values', async () => {
render(<ProductionRecordsForm />);
const user = userEvent.setup();

```
const quantity = getFieldByName('quantity');

await user.type(quantity, '25');

expect(quantity).toHaveValue(25);
```

});

it('logs submitted data', async () => {
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

```
render(<ProductionRecordsForm />);
const user = userEvent.setup();

await user.type(getFieldByName('animal'), 'GOAT001');
await user.selectOptions(
  getFieldByName('productionType'),
  'milk'
);

await user.click(
  screen.getByRole('button', {
    name: /add production record/i,
  })
);

expect(consoleSpy).toHaveBeenCalled();

consoleSpy.mockRestore();
```

});
});
