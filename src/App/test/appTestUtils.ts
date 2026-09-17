import { expect, afterEach, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { unpackData } from '../../utils/utils';
import { mockApiData } from '../../test/fixtures/mockApiData';
import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
  type LoadErrorReason,
} from '../../types/base';
import ApiService from '../../services/api';

export const data = unpackData(mockApiData);
export let mockApiCall: ReturnType<typeof vi.spyOn>;

export function setupAppTest() {
  beforeEach(() => {
    // Block real API call on mount to prevent overwriting UI for the tests.
    // run mockApiCall.mockResolvedValue(...) with other parameters if you need to rewrite the return value in a test
    mockApiCall = vi
      .spyOn(ApiService.prototype, 'getAllData')
      .mockResolvedValue({ ok: true, data: mockApiData });
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });
}

export function cacheAllData() {
  // Put catalog in localStorage so App starts already loaded (skips the fetch and has data for search).
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.allDataCached,
    JSON.stringify(data)
  );
}

export function cacheLastSearch(
  searchTerm: string,
  results: CategoryUnitWithDescription[]
) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.lastResultsCached,
    JSON.stringify(results)
  );
}

export function mockApiFailure(reason: LoadErrorReason) {
  mockApiCall.mockResolvedValue({ ok: false, reason });
}

export function expectHeading(name: RegExp, level = 2) {
  expect(screen.getByRole('heading', { level, name })).toBeVisible();
}

export function expectResultItem(item: CategoryUnitWithDescription) {
  expect(screen.getByRole('img', { name: item.name })).toBeVisible();
  expect(screen.getByText(item.name)).toBeVisible();
  expect(screen.getByText(item.description)).toBeVisible();
}

export async function submitSearch(term?: string) {
  const input = screen.getByRole('textbox');
  if (term !== undefined) await userEvent.type(input, term);
  await userEvent.click(screen.getByRole('button', { name: /search/i }));
  return input;
}
