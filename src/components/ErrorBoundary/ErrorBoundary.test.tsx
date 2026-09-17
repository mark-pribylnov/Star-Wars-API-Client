import { useState } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './ErrorBoundary';

function SimulateError(): never {
  throw new Error('test error');
}

function SimulateErrorOnClick() {
  const [shouldSimulateError, setShouldSimulateError] = useState(false);

  if (shouldSimulateError) throw new Error('test crash');

  return (
    <>
      <h1>Content</h1>
      <button type="button" onClick={() => setShouldSimulateError(true)}>
        Simulate error
      </button>
    </>
  );
}

describe('Error boundary', () => {
  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <h1>Mock children</h1>
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Mock children/i })
    ).toBeVisible();
  });

  test('shows fallback UI when a child throws an error', () => {
    render(
      <ErrorBoundary>
        <SimulateError />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeVisible();

    expect(screen.getByRole('button', { name: /restore app/i })).toBeVisible();
  });

  test('Restore app button recovers children after an error', async () => {
    render(
      <ErrorBoundary>
        <SimulateErrorOnClick />
      </ErrorBoundary>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /simulate error/i })
    );

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: /restore app/i }));

    expect(
      screen.getByRole('heading', { level: 1, name: /content/i })
    ).toBeVisible();
  });
});
