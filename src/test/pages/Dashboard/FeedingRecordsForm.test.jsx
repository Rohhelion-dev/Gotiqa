import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FeedingRecordsForm from '../../../Pages/Dashboard/FeedingRecordsForm';

describe('FeedingRecordsForm', () => {
const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

it('renders all fields', () => {
render(<FeedingRecordsForm />);

```
expect(getFieldByName('animal')).toBeInTheDocument();
expect(getFieldByName('feedType')).toBeInTheDocument();
expect(getFieldByName('quantity')).toBeInTheDocument();
expect(getFieldByName('unit')).toBeInTheDocument();
expect(getFieldByName('cost')).toBeInTheDocument();
expect(getFieldByName('notes')).toBeInTheDocument();
```

});

it('renders heading', () => {
render(<FeedingRecordsForm />);
expect(screen.getByText('Feeding Records')).toBeInTheDocument();
});

it('updates feed type', async () => {
render(<FeedingRecordsForm />);
const user = userEvent.setup();

```
const feedType = getFieldByName('feedType');

await user.type(feedType, 'Hay');

expect(feedType).toHaveValue('Hay');
```

});

it('logs submitted data', async () => {
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

```
render(<FeedingRecordsForm />);
const user = userEvent.setup();

await user.type(getFieldByName('animal'), 'GOAT003');

await user.click(
  screen.getByRole('button', {
    name: /add feeding record/i,
  })
);

expect(consoleSpy).toHaveBeenCalled();

consoleSpy.mockRestore();
```

});
});
