import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('Header renders successfully', () => {
  render(<Header />);

  expect(
    screen.getByRole('heading', { level: 1, name: /star wars search/i })
  ).toBeVisible();
});
