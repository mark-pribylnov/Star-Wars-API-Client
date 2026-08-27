import { Component, type ReactNode } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';
import { getItemImageURL } from '../../utils/imageURL';
import NoResultsVisual from '../NoResultsVisual/NoResultsVisual';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[] | null;
  searchTerm: string | null;
  isLoading: boolean;
};

type Data = { data: CategoryUnitWithDescription[] };
type Rows = { rows: number };

type View =
  | 'loading'
  | 'has-results'
  | 'no-results'
  | 'failed-load-data'
  | null;

const skeletonProps = {
  baseColor: '#1f2937',
  highlightColor: '#2a3c51',
  enableAnimation: true,
} as const;

export default class ResultsSection extends Component<ResultsSectionProps> {
  private createTable(params: {
    isLoading: boolean;
    searchResults: CategoryUnitWithDescription[];
  }) {
    const { isLoading, searchResults } = params;

    function createTableRows(params: Data | Rows) {
      function createSingleRow(
        key: string | number,
        name: ReactNode,
        description: ReactNode
      ) {
        return (
          <tr key={key}>
            <th>
              <span className={styles['name-wrapper']}>{name}</span>
            </th>
            <td>{description}</td>
          </tr>
        );
      }

      if ('data' in params) {
        return params.data.map((item) =>
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

      return Array.from({ length: params.rows }, (_, index) =>
        createSingleRow(
          index,
          <>
            <Skeleton width={35} height={35} {...skeletonProps} />
            <Skeleton width={140} {...skeletonProps} />
          </>,
          <Skeleton width="90%" {...skeletonProps} />
        )
      );
    }

    return (
      <table className={styles['table']}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {createTableRows(isLoading ? { rows: 10 } : { data: searchResults })}
        </tbody>
      </table>
    );
  }

  private createHeading(
    isLoading: boolean,
    hasResults: boolean,
    resultsNumber: number | null
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

  private pickView(view: View) {
    const { searchResults, searchTerm, isLoading } = this.props;

    if (view === 'loading' && searchResults) {
      // TODO: refactor and remove checking searchResults only for TS. '&& searchResults' exists only to satisfy TS
      return this.createTable({ isLoading, searchResults });
    } else if (view === 'failed-load-data') {
      return <h2>Failed to load data</h2>;
    } else if (view === 'has-results' && searchResults) {
      // TODO: refactor and remove checking searchResults only for TS. '&& searchResults' exists only to satisfy TS
      return this.createTable({ isLoading, searchResults });
    } else if (view === 'no-results') {
      return (
        <>
          <p className={styles['no-results-description']}>
            We couldn&apos;t find any matches for&nbsp;
            <span className={styles['no-results-description__search-term']}>
              {searchTerm}
            </span>
          </p>
          <NoResultsVisual searchTerm={searchTerm} />
        </>
      );
    } else {
      throw new Error('Case not handled');
    }
  }

  render() {
    let view: View = null;

    const { searchResults, isLoading } = this.props;
    const resultsNumber = searchResults ? searchResults.length : null;
    const hasResults = resultsNumber ? resultsNumber > 0 : false;
    // TODO: refactor: you might not need 'hasResults'

    if (isLoading && searchResults) {
      view = 'loading';
    } else if (!searchResults) {
      view = 'failed-load-data';
    } else if (searchResults.length > 0) {
      view = 'has-results';
    } else {
      view = 'no-results';
    }

    return (
      <div className={styles.root}>
        {view !== 'failed-load-data' &&
          this.createHeading(isLoading, hasResults, resultsNumber)}
        {this.pickView(view)}
      </div>
    );
  }
}
