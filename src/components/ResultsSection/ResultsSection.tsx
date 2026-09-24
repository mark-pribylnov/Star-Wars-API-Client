import { type ReactNode } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';
import { getItemImageURL } from '../../utils/imageURL';
import NoResultsVisual from '../NoResultsVisual/NoResultsVisual';
import FailedLoadVisual from '../FailedLoadVisual/FailedLoadVisual';
import OutdatedAppVisual from '../OutdatedAppVisual/OutdatedAppVisual';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { LoadErrorReason } from '../../types/base';
import { TEST_IDs } from '../../test/IDs';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[] | null;
  searchTerm: string | null;
  isLoading: boolean;
  loadError: LoadErrorReason | null;
  onRetryLoadData: () => void;
};

type ViewData =
  | { view: 'initial-loading' }
  | { view: 'loading'; searchResults: CategoryUnitWithDescription[] }
  | { view: 'has-results'; searchResults: CategoryUnitWithDescription[] }
  | { view: 'no-results' }
  | { view: 'failed-load-data' }
  | { view: 'outdated-app' };

const skeletonProps = {
  baseColor: '#1f2937',
  highlightColor: '#2a3c51',
  enableAnimation: true,
} as const;

export default function ResultsSection(props: ResultsSectionProps) {
  function createTable(params: {
    isLoading: boolean;
    searchResults: CategoryUnitWithDescription[];
  }) {
    const { isLoading, searchResults } = params;

    return (
      <table className={styles['table']}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? createSkeletonRows(10) : createDataRows(searchResults)}
        </tbody>
      </table>
    );
  }

  function createDataRows(data: CategoryUnitWithDescription[]) {
    return data.map((item) =>
      createSingleRow(
        item.name,
        <>
          <img
            className={styles['item-img']}
            src={getItemImageURL(item.name)}
            alt={item.name}
          />
          {item.name}
        </>,
        item.description
      )
    );
  }

  function createSingleRow(
    key: string | number,
    name: ReactNode,
    description: ReactNode,
    addTestId?: 'add-test-id'
  ) {
    return (
      <tr
        key={key}
        data-testid={addTestId ? TEST_IDs.loadingSkeletonRow : undefined}
      >
        <th>
          <span className={styles['name-wrapper']}>{name}</span>
        </th>
        <td>{description}</td>
      </tr>
    );
  }

  function createSkeletonRows(rows: number) {
    return Array.from({ length: rows }, (_, index) =>
      createSingleRow(
        index,
        <>
          <Skeleton width={35} height={35} {...skeletonProps} />
          <Skeleton width={140} {...skeletonProps} />
        </>,
        <Skeleton width="90%" {...skeletonProps} />,
        'add-test-id'
      )
    );
  }

  function createHeading(
    isLoading: boolean,
    hasResults: boolean,
    resultsNumber: number
  ) {
    let text = null;

    if (isLoading) {
      text = 'Loading results...';
    } else if (hasResults) {
      text = 'Search results';
    } else {
      text = 'No results found';
    }

    return (
      <h2
        className={clsx(
          styles['search-heading'],
          !hasResults && !isLoading && styles['search-heading--no-results']
        )}
      >
        {text}
        {hasResults && (
          <span className={styles['results-number']}>{resultsNumber}</span>
        )}
      </h2>
    );
  }

  function createViewContent(viewData: ViewData) {
    const { searchTerm, isLoading } = props;

    switch (viewData.view) {
      case 'initial-loading':
        return null;
      case 'loading':
      case 'has-results':
        return createTable({
          isLoading,
          searchResults: viewData.searchResults,
        });
      case 'failed-load-data':
        return (
          <FailedLoadVisual
            onRetryLoadData={props.onRetryLoadData}
            isLoading={isLoading}
          />
        );
      case 'outdated-app':
        return <OutdatedAppVisual />;
      case 'no-results':
        return (
          <>
            <p className={styles['no-results-description']}>
              We couldn&apos;t find any matches for&nbsp;
              <span className={styles['no-results-description__search-term']}>
                {searchTerm}
              </span>
            </p>
            <NoResultsVisual />
          </>
        );
      default: {
        // Exhaustive checking with 'never' - https://www.youtube.com/watch?v=d2sANVj4f2Y
        const neverHappens: never = viewData;
        return neverHappens;
      }
    }
  }

  function pickView(): ViewData {
    const { searchResults, isLoading, loadError } = props;

    if (loadError === 'schema') return { view: 'outdated-app' };
    if (loadError === 'fetch') return { view: 'failed-load-data' };

    if (isLoading && !searchResults) return { view: 'initial-loading' };

    if (!searchResults) return { view: 'failed-load-data' };
    if (isLoading) return { view: 'loading', searchResults };
    if (searchResults.length > 0) return { view: 'has-results', searchResults };
    return { view: 'no-results' };
  }

  const viewData = pickView();

  const { searchResults, isLoading } = props;
  const resultsNumber = searchResults ? searchResults.length : null;
  const hasResults = resultsNumber ? resultsNumber > 0 : false;
  const hideHeading =
    viewData.view === 'failed-load-data' ||
    viewData.view === 'outdated-app' ||
    viewData.view === 'initial-loading';

  return (
    <div className={styles.root}>
      {!hideHeading && createHeading(isLoading, hasResults, resultsNumber ?? 0)}
      {createViewContent(viewData)}
    </div>
  );
}
