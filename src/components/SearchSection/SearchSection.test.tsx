import { expect, test, describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import SearchSection from './SearchSection';
import { mockApiData } from '../../test/fixtures/mockApiData';
import { LOCAL_STORAGE_KEYS } from '../../types/base';

type RenderAndClickSearchParams = {
  isLoading: boolean;
  isFailedToLoadData: boolean;
  clickSubmit: boolean;
};

describe('Search section', () => {
  async function renderAndClickSearch({
    isLoading,
    isFailedToLoadData,
    clickSubmit,
  }: RenderAndClickSearchParams) {
    const mockSubmitSearch = vi.fn();

    render(
      <SearchSection
        search={mockSubmitSearch}
        isLoading={isLoading}
        isFailedToLoadData={isFailedToLoadData}
      />
    );

    if (clickSubmit)
      await userEvent.click(screen.getByRole('button', { name: /search/i }));

    return mockSubmitSearch;
  }

  test('Submit search hanlder called', async () => {
    const mockFn = await renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: false,
      clickSubmit: true,
    });
    expect(mockFn).toHaveBeenCalled();
  });

  test('Search submit is disabled during loading', async () => {
    const mockFn = await renderAndClickSearch({
      isLoading: true,
      isFailedToLoadData: false,
      clickSubmit: true,
    });
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('Submit is disabled when fetching data failed', async () => {
    const mockFn = await renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: true,
      clickSubmit: true,
    });

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('Header renders successfully', async () => {
    await renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: false,
      clickSubmit: false,
    });

    expect(
      screen.getByRole('heading', { level: 2, name: /search the galaxy/i })
    ).toBeVisible();
  });

  test('Input prefills from localStorage', async () => {
    const searchTerm = 'luke';
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);

    renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: false,
      clickSubmit: false,
    });

    localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);

    expect(screen.getByRole('textbox')).toHaveValue(searchTerm);
  });

  test('Submit via Enter', async () => {
    const mockFn = await renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: false,
      clickSubmit: false,
    });

    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.keyboard('{Enter}');

    expect(mockFn).toHaveBeenCalled();
  });

  test('Passes the term typed by the user', async () => {
    const term = mockApiData[0].entries[0].name;

    const mockFn = await renderAndClickSearch({
      isLoading: false,
      isFailedToLoadData: false,
      clickSubmit: false,
    });

    const input = screen.getByRole('textbox');
    await userEvent.type(input, term);
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockFn).toHaveBeenCalledWith(term);
  });
});
