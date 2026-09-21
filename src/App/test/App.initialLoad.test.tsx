import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { LOAD_ERROR_REASON, SESSION_STORAGE_KEYS } from '../../types/base';
import ApiService from '../../services/api';
import {
  cacheAllData,
  cacheLastSearch,
  data,
  expectHeading,
  expectResultItem,
  mockApiFailure,
  setupAppTest,
} from './appTestUtils';

describe('App', () => {
  setupAppTest();

  describe('Initial load', () => {
    test('Cached data. Show results without calling the API', () => {
      cacheAllData();

      const getAllData = vi.spyOn(ApiService.prototype, 'getAllData');

      render(<App />);

      expect(getAllData).not.toHaveBeenCalled();
      expectHeading(/^search results\s*\d+$/i);
    });

    test('Use cached search term + last results', () => {
      const results = [data[0]];
      const resultItem = results[0];
      const searchTerm = resultItem.name;

      cacheAllData();
      cacheLastSearch(searchTerm, results);

      render(<App />);

      expectResultItem(resultItem);
      expect(screen.getByRole('textbox')).toHaveValue(searchTerm);
    });

    test('No cache + API success = load data, show results', async () => {
      render(<App />);

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expectHeading(/^search results\s*\d+$/i);
    });

    test('No cache + fetch error = failed-load UI', async () => {
      mockApiFailure(LOAD_ERROR_REASON.fetch);

      render(<App />);

      expect(
        await screen.findByRole('button', { name: /try again/i })
      ).toBeVisible();
      expectHeading(/failed to load data/i);
    });

    test('No cache + schema error = outdated-app UI', async () => {
      mockApiFailure(LOAD_ERROR_REASON.schema);

      render(<App />);

      expect(
        await screen.findByRole('img', { name: /app needs an update/i })
      ).toBeVisible();
      expectHeading(/app needs an update/i);
    });

    test('If previous load failed - show error UI from sessionStorage', () => {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.loadError,
        LOAD_ERROR_REASON.fetch
      );

      mockApiFailure(LOAD_ERROR_REASON.fetch);

      render(<App />);

      expectHeading(/failed to load data/i);
    });
  });
});
