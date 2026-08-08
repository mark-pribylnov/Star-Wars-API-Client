import { Component, type SubmitEvent } from 'react';
// import ApiService from '../../services/api';
import styles from './SearchSection.module.scss';
import SearchIcon from '../../assets/icons/search/SearchIcon';

export default class SearchSection extends Component {
  // private api = new ApiService();
  private inputName = 'searchTerm';
  private initialSearchTerm = localStorage.getItem(this.inputName);

  private handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.currentTarget instanceof HTMLFormElement))
      throw new Error('e.currentTarget is not HTMLFormElement');

    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get(this.inputName);
    if (typeof searchTerm !== 'string')
      throw new Error('Search term is not a string');

    localStorage.setItem(this.inputName, searchTerm);
  };

  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles['search-heading']}>
          <SearchIcon size={20} />
          Search the galaxy
        </h2>

        <form
          action="#"
          className={styles['search-form']}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name={this.inputName}
            className={styles['search-input']}
            placeholder="Type to search..."
            defaultValue={this.initialSearchTerm ?? ''}
          />
          <button type="submit" className={styles['search-button']}>
            Search
          </button>
        </form>
      </div>
    );
  }
}
