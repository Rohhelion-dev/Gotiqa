import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ActivityLogsForm from '../../../Pages/Dashboard/ActivityLogsForm';

describe('ActivityLogsForm', () => {
const getFieldByName = (name) => document.querySelector(`[name="${name}"]`);

it('renders all fields', () => {
render(<ActivityLogsForm />);

```
expect(getFieldByName('action')).toBeInTheDocument();
expect(getFieldByName('type')).toBeInTheDocument();
expect(getFieldByName('entity')).toBeInTheDocument();
expect(getFieldByName('details')).toBeInTheDocument();
```

});

it('renders heading', () => {
render(<ActivityLogsForm />);
expect(screen.getByText('Activity Logs')).toBeInTheDocument();
});

it('updates action field', async () => {
render(<ActivityLogsForm />);
const user = userEvent.setup();

```
const action = getFieldByName('action');

await user.type(action, 'Fed goats');

expect(action).toHaveValue('Fed goats');
```

});

it('logs submitted data', async () => {
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

```
render(<ActivityLogsForm />);
const user = userEvent.setup();

await user.type(
  getFieldByName('action'),
  'Checked herd'
);

await user.click(
  screen.getByRole('button', {
    name: /add log/i,
  })
);

expect(consoleSpy).toHaveBeenCalled();

consoleSpy.mockRestore();
```

});
});
