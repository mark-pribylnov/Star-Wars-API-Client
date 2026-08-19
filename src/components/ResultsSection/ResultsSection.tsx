import { Component, type ReactNode } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';
import { getItemImageURL } from '../../utils/imageURL';
import NoResultsVisual from '../NoResultsVisual/NoResultsVisual';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
  isLoading: boolean;
};

type Data = { data: CategoryUnitWithDescription[] };
type Rows = { rows: number };

const skeletonProps = {
  baseColor: '#1f2937',
  highlightColor: '#2a3c51',
  enableAnimation: true,
} as const;

export default class ResultsSection extends Component<ResultsSectionProps> {
  private renderRow(
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

  private createTableRows(params: Data | Rows) {
    if ('data' in params) {
      return params.data.map((item) =>
        this.renderRow(
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
      this.renderRow(
        index,
        <>
          <Skeleton width={35} height={35} {...skeletonProps} />
          <Skeleton width={140} {...skeletonProps} />
        </>,
        <Skeleton width="90%" {...skeletonProps} />
      )
    );
  }

  private createHeading(
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

  render() {
    const { searchResults, searchTerm, isLoading } = this.props;
    const resultsNumber = searchResults.length;
    const hasResults = resultsNumber > 0;

    return (
      <div className={styles.root}>
        {this.createHeading(isLoading, hasResults, resultsNumber)}

        {hasResults || isLoading ? (
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.createTableRows(
                isLoading ? { rows: 10 } : { data: searchResults }
              )}
            </tbody>
          </table>
        ) : (
          <>
            <p className={styles['no-results-description']}>
              We couldn&apos;t find any matches for&nbsp;
              <span className={styles['no-results-description__search-term']}>
                {searchTerm}
              </span>
            </p>
            <NoResultsVisual searchTerm={searchTerm} />
          </>
        )}
      </div>
    );
  }
}
