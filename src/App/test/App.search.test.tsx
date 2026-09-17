import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { LOAD_ERROR_REASON, LOCAL_STORAGE_KEYS } from '../../types/base';
import {
  cacheAllData,
  cacheLastSearch,
  data,
  expectHeading,
  expectResultItem,
  mockApiFailure,
  setupAppTest,
  submitSearch,
} from './appTestUtils';

describe('App', () => {
  setupAppTest();

  describe('Search', () => {
    test('Search with matches - filtered results; term and results saved in localStorage', async () => {
      cacheAllData();

      render(<App />);

      const resultItem = data[0];
      const noMatchItem = data[1];
      const searchTerm = resultItem.name;

      const input = await submitSearch(searchTerm);

      expectResultItem(resultItem);
      expect(screen.queryByText(noMatchItem.name)).not.toBeInTheDocument();
      expect(input).toHaveValue(searchTerm);
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm)).toBe(
        resultItem.name
      );
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.lastResultsCached)).toBe(
        JSON.stringify([resultItem])
      );
    });

    test('Search with no matches - "no results found"', async () => {
      cacheAllData();

      render(<App />);

      await submitSearch('Fake Name');

      expectHeading(/no results found/i);
    });

    test('Empty submit - reset to full catalog + clear search term in localStorage', async () => {
      cacheAllData();
      cacheLastSearch(data[0].name, [data[0]]);

      render(<App />);

      const input = screen.getByRole('textbox');
      await userEvent.clear(input);
      await userEvent.click(screen.getByRole('button', { name: /search/i }));

      expectHeading(new RegExp(`^search results\\s*${data.length}$`, 'i'));
      expect(screen.getByText(data[1].name)).toBeVisible();
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm)).toBeNull();
      expect(
        localStorage.getItem(LOCAL_STORAGE_KEYS.lastResultsCached)
      ).toBeNull();
    });

    test(`Same term again - don't update results and cache`, async () => {
      const searchTerm = data[0].name;
      const results = [data[0]];

      cacheAllData();
      cacheLastSearch(searchTerm, results);

      render(<App />);
      await userEvent.click(screen.getByRole('button', { name: /search/i }));

      expect(screen.getByText(searchTerm)).toBeVisible();
      expect(screen.queryByText(data[1].name)).not.toBeInTheDocument();
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm)).toBe(
        searchTerm
      );
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.lastResultsCached)).toBe(
        JSON.stringify(results)
      );
    });

    test('Search is disabled after load failed', async () => {
      mockApiFailure(LOAD_ERROR_REASON.fetch);

      render(<App />);

      expect(
        await screen.findByRole('button', { name: /try again/i })
      ).toBeVisible();
      expectHeading(/failed to load data/i);
      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    });
  });
});
