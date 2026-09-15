import { expect, test, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsSection from './ResultsSection';
import { mockApiData } from '../../test/fixtures/mockApiData';
import { unpackData } from '../../utils/utils';

describe('Results section without submitting a search', () => {
  const data = unpackData(mockApiData);

  beforeEach(() => {
    render(
      <ResultsSection
        searchResults={data}
        searchTerm={null}
        isLoading={false}
        loadError={null}
        onRetryLoadData={() => undefined}
      />
    );
  });

  test('Heading with the number is visible', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: /^search results\s*\d+$/i })
    ).toBeVisible();
  });

  test('Item image, name and description are visible', () => {
    const firstItemData = data[0];
    expect(screen.getByRole('img', { name: firstItemData.name })).toBeVisible();
    expect(screen.getByText(firstItemData.name)).toBeVisible();
    expect(screen.getByText(firstItemData.description)).toBeVisible();
  });

  test('Column headers name and description are visible', () => {
    expect(
      screen.getByRole('columnheader', {
        name: /name/i,
      })
    ).toBeVisible();

    expect(
      screen.getByRole('columnheader', {
        name: /description/i,
      })
    ).toBeVisible();
  });
});
