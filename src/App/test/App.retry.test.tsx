import { expect, test, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { mockApiData } from '../../test/fixtures/mockApiData';
import { LOAD_ERROR_REASON, SESSION_STORAGE_KEYS } from '../../types/base';
import {
  data,
  expectHeading,
  mockApiCall,
  mockApiFailure,
  setupAppTest,
} from './appTestUtils';

describe('App', () => {
  setupAppTest();

  describe('Retry', () => {
    test('Retry after fetch fail - success. Results appear and error cleared', async () => {
      mockApiFailure(LOAD_ERROR_REASON.fetch);

      render(<App />);

      expect(
        await screen.findByRole('button', { name: /try again/i })
      ).toBeVisible();
      expectHeading(/failed to load data/i);

      mockApiCall.mockResolvedValue({ ok: true, data: mockApiData });
      await userEvent.click(screen.getByRole('button', { name: /try again/i }));

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expectHeading(/^search results\s*\d+$/i);
      expect(sessionStorage.getItem(SESSION_STORAGE_KEYS.loadError)).toBeNull();
    });

    test('Retry after fetch fail - fail again. Failed UI stays and toast shown', async () => {
      mockApiFailure(LOAD_ERROR_REASON.fetch);

      render(<App />);

      expect(
        await screen.findByRole('button', { name: /try again/i })
      ).toBeVisible();
      expectHeading(/failed to load data/i);

      await userEvent.click(screen.getByRole('button', { name: /try again/i }));

      expect(
        await screen.findByText(/still couldn't load data/i)
      ).toBeVisible();
      expectHeading(/failed to load data/i);
      expect(sessionStorage.getItem(SESSION_STORAGE_KEYS.loadError)).toBe(
        LOAD_ERROR_REASON.fetch
      );
    });
  });
});
