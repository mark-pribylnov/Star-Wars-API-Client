import { Component, type SubmitEvent } from 'react';
import styles from './SearchSection.module.scss';
import SearchIcon from '../../assets/icons/search/SearchIcon';
import type { CategoryUnit } from '../../types/base';

type SearchSectionProps = {
  search: (searchTerm: string) => Promise<void | CategoryUnit[]>;
  isLoading: boolean;
  isFailedToLoadData: boolean;
};

export default class SearchSection extends Component<SearchSectionProps> {
  private inputName = 'searchTerm';
  private initialSearchTerm = localStorage.getItem(this.inputName);

  constructor(props: SearchSectionProps) {
    super(props);
  }

  private handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (this.props.isLoading) return;

    if (!(e.currentTarget instanceof HTMLFormElement))
      throw new Error('e.currentTarget is not HTMLFormElement');

    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get(this.inputName);
    if (typeof searchTerm !== 'string')
      throw new Error('Search term is not a string');

    this.props.search(searchTerm);
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
            disabled={this.props.isLoading || this.props.isFailedToLoadData}
          />
          <button
            type="submit"
            className={styles['search-button']}
            disabled={this.props.isLoading || this.props.isFailedToLoadData}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
