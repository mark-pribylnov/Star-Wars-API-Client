import { Component } from 'react';
import styles from './ResultsSection.module.scss';
import type { CategoryUnitWithDescription } from '../../types/base';

type ResultsSectionProps = {
  searchResults: CategoryUnitWithDescription[];
};

export default class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { searchResults } = this.props;
    const resultsNumber = searchResults.length;

    const tableRows = searchResults.map((item) => {
      return (
        <tr key={item.name}>
          <th>
            <span className={styles['name-wrapper']}>
              <img
                className={styles['item-img']}
                src={`/images/searchItems/${encodeURIComponent(item.name)}.png`}
                alt={item.name}
              />
              {item.name}
            </span>
          </th>
          <td>{item.description}</td>
        </tr>
      );
    });

    return (
      <div className={styles.root}>
        <h2 className={styles['search-heading']}>
          Search results
          <span className={styles['results-number']}>{resultsNumber}</span>
        </h2>
        <table className={styles['table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}
