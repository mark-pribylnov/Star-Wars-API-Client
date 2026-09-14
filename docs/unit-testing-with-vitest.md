# How to Write Unit Tests in React (Vitest edition)

Adapted from [Kunal Nalawade’s freeCodeCamp article](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/) for **this** project: Vite + React 19 + TypeScript + **Vitest** + Testing Library (not Create React App + Jest).

---

## How is a test structured?

A test compares **expected** behaviour with **actual** behaviour.

### What to test

1. A component renders (with or without props)
2. How it looks/behaves after state changes
3. How it reacts to user interactions (click, type, …)

### What not to test

1. **Internal implementation details** — prefer behaviour. If a button sorts a list, assert the UI order (or that a callback ran), not every line of the sort algorithm (unless that algorithm is its own pure unit).
2. **Third-party libraries** — don’t re-test React, Testing Library, or Material UI; they already have their own tests.

### The usual three steps

1. **Render** the component
2. **Query** elements / **simulate** user events
3. **Assert** with `expect(...)`

---

## This project’s setup (already done)

| Tool | Role |
|------|------|
| **Vitest** | Test runner (Jest-like API, Vite-native) |
| **jsdom** | Fake browser (`document`, `window`) |
| **@testing-library/react** | `render`, `screen`, `waitFor` |
| **@testing-library/jest-dom** | Matchers like `toBeInTheDocument()` (name is historical — works with Vitest) |
| **@vitest/coverage-v8** | Coverage reports |

### Config highlights

`vite.config.ts` (import from `vitest/config` so the `test` block is typed):

```ts
import { defineConfig } from 'vitest/config';
// ...

export default defineConfig({
  // ...plugins
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
```

`src/setupTests.ts` — runs before every test file:

```ts
import '@testing-library/jest-dom/vitest';
```

### Scripts

| Command | What it does |
|---------|----------------|
| `npm test` | Vitest in **watch** mode (local) |
| `npm run test:run` | One run (CI) |
| `npm run test:coverage` | One run + coverage |

GitHub Actions should use `test:run`, not watch.

### Where to put tests

Prefer **colocated** files next to the unit under test:

```text
src/components/Header/
  Header.tsx
  Header.module.scss
  Header.test.tsx
```

Vitest picks up `*.test.ts(x)` / `*.spec.ts(x)` anywhere. A central `__tests__` folder works too; colocating is clearer for components.

---

## Your first test (Header)

`Header` renders the title “Star Wars Search”. A minimal test:

```tsx
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders the app title', () => {
  render(<Header />);

  const element = screen.getByText(/star wars search/i);

  expect(element).toBeInTheDocument();
});
```

What’s going on:

1. `test(name, fn)` — one case ([Vitest `test` API](https://vitest.dev/api/test); `options` is only for another overload)
2. `render(<Header />)` — mount into jsdom
3. `screen.getByText(/…/i)` — find by visible text (`i` = ignore case)
4. `toBeInTheDocument()` — from jest-dom via `setupTests.ts`

If you see `document is not defined`, jsdom isn’t configured.  
If TypeScript complains about `toBeInTheDocument`, setup/types for jest-dom are missing.

Run:

```bash
npm run test:run -- src/components/Header/Header.test.tsx
```

---

## Testing with mock data (props)

When a component receives data (e.g. search results), pass **small fake props** in the test — not the whole SWAPI dump.

Example pattern:

```tsx
type Item = { id: number; name: string };

type ListProps = {
  data: Item[];
};

function ResultList({ data }: ListProps) {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

const mockData: Item[] = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Leia Organa' },
];

test('list renders names from props', () => {
  render(<ResultList data={mockData} />);
  expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
});
```

Mock data only needs fields your UI actually uses.

### Covering branches

If props change the UI (e.g. empty list vs rows, ordered vs unordered), write **one test per branch**. A failing `getByText` often means you didn’t pass the prop that unlocks that branch.

```tsx
test('shows empty message when there are no results', () => {
  render(<ResultList data={[]} />);
  expect(screen.getByText(/no results/i)).toBeInTheDocument();
});
```

Use `npm run test:coverage` to see uncovered lines/branches — then add targeted tests, don’t chase 100% blindly.

---

## Testing user interactions

Install the user-event helper (if not already):

```bash
npm i -D @testing-library/user-event
```

Prefer **`userEvent`** over low-level `fireEvent` — it closer matches real clicks/typing.

### Mock a callback with Vitest (not `jest.fn`)

In the freeCodeCamp article you’ll see `jest.fn()`. Here use **`vi.fn()`**:

```tsx
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('calls onRetry when Try again is clicked', async () => {
  const onRetry = vi.fn();
  const user = userEvent.setup();

  render(<button type="button" onClick={onRetry}>Try again</button>);

  await user.click(screen.getByRole('button', { name: /try again/i }));
  expect(onRetry).toHaveBeenCalled();
});
```

### Querying inputs and buttons

| Goal | Query |
|------|--------|
| Text / email input | `screen.getByRole('textbox')` or `getByPlaceholderText` / `getByLabelText` |
| Button | `screen.getByRole('button', { name: /submit/i })` |
| By visible text | `screen.getByText(/…/i)` |
| Several same nodes | `screen.getAllByRole` / `getAllByTestId` |

Roles come from HTML semantics ([ARIA roles](https://www.w3.org/TR/html-aria/#docconformance)). Prefer role/label/text over `data-testid` unless there’s no accessible name.

When two buttons share a role, disambiguate with `{ name: /…/ }`.

---

## Testing state updates

You don’t assert `setState` directly. You assert **what the user sees after** the update.

### Toggle visibility

```tsx
test('shows text after toggle click', async () => {
  const user = userEvent.setup();
  render(<YourToggleComponent />);

  await user.click(screen.getByRole('button', { name: /toggle text/i }));
  expect(screen.getByText(/text visible/i)).toBeInTheDocument();
});
```

### Disabled button

```tsx
expect(screen.getByRole('button', { name: /toggle text/i })).toBeDisabled();
```

### List grow / shrink

```tsx
expect(screen.getAllByTestId('record')).toHaveLength(3);
await user.click(screen.getByRole('button', { name: /add to list/i }));
expect(screen.getAllByTestId('record')).toHaveLength(4);
```

(`data-testid` is fine as a last resort; prefer roles when possible.)

---

## Testing API / service calls

Don’t hit real SWAPI in unit tests (slow, flaky). **Mock the module** your component uses.

In this app, data loading goes through `ApiService` / `getAllData`. Pattern:

1. Put fetch logic in a module you can mock (already true for `src/services/api.ts`)
2. In the test, replace it with a fake that resolves/rejects on demand
3. Assert UI: loading → results, or failed-load screen, etc.

Vitest equivalents of the article’s Jest APIs:

| Jest (article) | Vitest |
|----------------|--------|
| `jest.fn()` | `vi.fn()` |
| `jest.spyOn(obj, 'method')` | `vi.spyOn(obj, 'method')` |
| `jest.mock('./path')` | `vi.mock('./path')` |

Example shape (spy + mock implementation):

```tsx
import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import * as apiModule from '../../services/api';

test('shows data after a successful load', async () => {
  vi.spyOn(apiModule.default.prototype, 'getAllData').mockResolvedValue({
    ok: true,
    data: /* small fake catalog */,
  });

  render(<App />); // or a thinner wrapper if App is heavy

  await waitFor(() => {
    expect(screen.getByText(/luke/i)).toBeInTheDocument();
  });
});
```

### Why `waitFor`?

Fetch + `setState` are **async**. Right after `render`, the DOM may still be empty. `waitFor` retries the assertion until it passes or times out.

```tsx
await waitFor(() => {
  expect(screen.getByText(/kunal/i)).toBeInTheDocument();
});
```

For elements that appear later, `findBy*` is often cleaner:

```tsx
expect(await screen.findByText(/luke/i)).toBeInTheDocument();
```

---

## Class components

This project uses **class** components (`Header`, `App`, …). Testing Library doesn’t care — `render(<Header />)` works the same. You still test behaviour, not `this.state` directly.

---

## Cheat sheet: article → this repo

| freeCodeCamp (CRA + Jest) | This repo (Vite + Vitest) |
|---------------------------|---------------------------|
| `create-react-app` | Vite (already) |
| Jest via `react-scripts test` | `vitest` / `vitest run` |
| `setupTests.js` + jest-dom | `src/setupTests.ts` + `@testing-library/jest-dom/vitest` |
| `import` matchers twice (`extend-expect`) | One import only |
| `__tests__/` folder | Optional; prefer `Component.test.tsx` beside the component |
| `jest.fn` / `jest.spyOn` | `vi.fn` / `vi.spyOn` |
| Watch + coverage in one CRA script | `npm test` / `npm run test:coverage` |
| No jsdom config | `test.environment: 'jsdom'` |

---

## Suggested practice order for Star Wars Search

1. `Header` — static text (done)
2. `SearchSection` — disabled while loading; submit calls `search`
3. `NoResultsVisual` / empty results copy
4. `FailedLoadVisual` — Try again calls `onRetryLoadData`
5. `ResultsSection` — view branches (`has-results`, `no-results`, `failed-load-data`, `outdated-app`) with props only (no real fetch)
6. `App` / `ApiService` — mock `getAllData` for success vs `fetch` vs `schema`

---

## Further reading

- Original article: [How to Write Unit Tests in React](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/)
- [Vitest `test` API](https://vitest.dev/api/test)
- [Vitest mocking](https://vitest.dev/guide/mocking)
- [Testing Library queries](https://testing-library.com/docs/queries/about)
- [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers)

---

*This guide rewrites the freeCodeCamp tutorial’s ideas for Vitest and this codebase. Prefer behaviour over implementation, mock the network, and keep tests next to the code they protect.*
