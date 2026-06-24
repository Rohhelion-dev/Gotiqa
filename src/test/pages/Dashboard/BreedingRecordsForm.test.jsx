import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BreedingRecordsForm from '../../../Pages/Dashboard/BreedingRecordsForm';

describe('BreedingRecordsForm', () => {
const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

it('renders all fields', () => {
render(<BreedingRecordsForm />);

```
expect(getFieldByName('animal')).toBeInTheDocument();
expect(getFieldByName('dateOfBreeding')).toBeInTheDocument();
expect(getFieldByName('partnerTag')).toBeInTheDocument();
expect(getFieldByName('expectedDelivery')).toBeInTheDocument();
expect(getFieldByName('offspringCount')).toBeInTheDocument();
expect(getFieldByName('offspringHealth')).toBeInTheDocument();
expect(getFieldByName('notes')).toBeInTheDocument();
```

});

it('renders heading', () => {
render(<BreedingRecordsForm />);
expect(screen.getByText('Breeding Records')).toBeInTheDocument();
});

it('updates offspring count', async () => {
render(<BreedingRecordsForm />);
const user = userEvent.setup();

```
const count = getFieldByName('offspringCount');

await user.type(count, '3');

expect(count).toHaveValue(3);
```

});

it('logs submitted data', async () => {
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

```
render(<BreedingRecordsForm />);
const user = userEvent.setup();

await user.type(getFieldByName('animal'), 'GOAT002');

await user.click(
  screen.getByRole('button', {
    name: /add breeding record/i,
  })
);

expect(consoleSpy).toHaveBeenCalled();

consoleSpy.mockRestore();
```

});
});
