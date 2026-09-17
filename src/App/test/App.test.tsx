import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { cacheAllData, expectHeading, setupAppTest } from './appTestUtils';

describe('App', () => {
  setupAppTest();

  test('All sections are rendered when healthy - Header, Search and Results', () => {
    cacheAllData();

    render(<App />);

    expectHeading(/star wars search/i, 1);
    expectHeading(/search the galaxy/i);
    expect(screen.getByRole('button', { name: /search/i })).toBeVisible();
    expectHeading(/^search results\s*\d+$/i);
  });
});
