import { expect, test, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsSection from './ResultsSection';
import { mockApiData } from '../../test/fixtures/mockApiData';
import { unpackData } from '../../utils/utils';

describe('Results section', () => {
  describe('With results (submitted or empty search)', () => {
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
        screen.getByRole('heading', {
          level: 2,
          name: /^search results\s*\d+$/i,
        })
      ).toBeVisible();
    });

    test('Item image, name and description are visible', () => {
      const firstItemData = data[0];
      expect(
        screen.getByRole('img', { name: firstItemData.name })
      ).toBeVisible();
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

  describe('Without search results', () => {
    const searchTerm = 'Luke Groundwalker';

    beforeEach(() => {
      render(
        <ResultsSection
          searchResults={[]}
          searchTerm={searchTerm}
          isLoading={false}
          loadError={null}
          onRetryLoadData={() => undefined}
        />
      );
    });

    test('Heading says "No results found"', () => {
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /no results found/i,
        })
      ).toBeVisible();
    });

    test('Description includes the search term', () => {
      expect(screen.getByText(searchTerm)).toBeVisible();
    });

    test('The image is visible', () => {
      expect(
        screen.getByRole('img', { name: 'no results found' })
      ).toBeVisible();
    });

    test('The quote below image is visible', () => {
      expect(screen.getByText('— YODA')).toBeVisible();
    });
  });

  describe('Failed to load data due to an HTTP error', () => {
    beforeEach(() => {
      render(
        <ResultsSection
          searchResults={null}
          searchTerm={null}
          isLoading={false}
          loadError={'fetch'}
          onRetryLoadData={() => undefined}
        />
      );
    });

    test('Heading says "Failed to load data"', () => {
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /failed to load data/i,
        })
      ).toBeVisible();
    });

    test('Description is visible', () => {
      expect(screen.getByText(/the galaxy is vast/i)).toBeVisible();
    });

    test('The image is visible', () => {
      expect(
        screen.getByRole('img', { name: /failed to load data/i })
      ).toBeVisible();
    });

    test('Try again button is visible', () => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeVisible();
    });

    test('Tip is visible', () => {
      expect(
        screen.getByText('If the problem persists, please try again later.')
      ).toBeVisible();
    });
  });
});
