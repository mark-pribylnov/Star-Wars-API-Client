import { Component } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';
import { getItemImageURL } from '../../utils/imageURL';
import NoResultsVisual from '../NoResultsVisual/NoResultsVisual';
import clsx from 'clsx';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
};

export default class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { searchResults, searchTerm } = this.props;

    const resultsNumber = searchResults.length;
    const hasResults = resultsNumber > 0;

    const tableRows = searchResults.map((item) => {
      return (
        <tr key={item.name}>
          <th>
            <span className={styles['name-wrapper']}>
              <img
                className={styles['item-img']}
                src={getItemImageURL(item.name)}
                alt={item.name}
              />
              {item.name}
            </span>
          </th>
          <td>{item.description}</td>
        </tr>
      );
    });
    // fix the situation when the searchTerm is null. now the app crashed with the Error I created

    return (
      <div className={styles.root}>
        <h2
          className={clsx(
            styles['search-heading'],
            !hasResults && styles['search-heading--no-results']
          )}
        >
          {hasResults ? 'Search results' : 'No results found'}
          {hasResults && (
            <span className={styles['results-number']}>{resultsNumber}</span>
          )}
        </h2>
        {hasResults ? (
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
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
