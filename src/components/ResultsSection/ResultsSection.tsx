import { Component } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';
import { getItemImageURL } from '../../utils/imageURL';
import NoResultsVisual from '../NoResultsVisual/NoResultsVisual';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
};

export default class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { searchResults, searchTerm } = this.props;

    const resultsNumber = searchResults.length;

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
    // USE clsx
    // write a helper for checking for searchResults in JSX because it looks ugly writing the same condition many times
    // Make yoda select a random quote
    // edit class names in the visual because it looks sloppy
    // fix the situation when the searchTerm is null. now the app crashed with the Error I created

    return (
      <div className={styles.root}>
        <h2
          className={[
            styles['search-heading'],
            resultsNumber <= 0 && styles['search-heading--no-results'],
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {resultsNumber > 0 ? 'Search results' : 'No results found'}
          {resultsNumber > 0 && (
            <span className={styles['results-number']}>{resultsNumber}</span>
          )}
        </h2>
        {resultsNumber <= 0 && (
          <p className={styles['no-results-description']}>
            We couldn&apos;t find any matches for&nbsp;
            <span className={styles['no-results-description__search-term']}>
              {searchTerm}
            </span>
          </p>
        )}
        {resultsNumber <= 0 && <NoResultsVisual searchTerm={searchTerm} />}
        {resultsNumber > 0 && (
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        )}
      </div>
    );
  }
}
