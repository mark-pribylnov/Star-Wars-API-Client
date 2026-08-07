import { Component } from 'react';
import styles from './SearchSection.module.scss';
import SearchIcon from '../../assets/icons/search/SearchIcon';

export default class SearchSection extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles['search-heading']}>
          <SearchIcon size={20} />
          Search the galaxy
        </h2>

        <form action="#" className={styles['search-form']}>
          <input
            type="text"
            className={styles['search-input']}
            placeholder="Type to search..."
          />
          <button type="submit" className={styles['search-button']}>
            Search
          </button>
        </form>

        <p className={styles['search-description']}>
          Search for characters, planets, starships, species and films...
        </p>
      </div>
    );
  }
}
