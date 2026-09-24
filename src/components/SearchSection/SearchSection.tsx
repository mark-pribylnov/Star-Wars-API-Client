import { type SubmitEvent } from 'react';
import styles from './SearchSection.module.scss';
import SearchIcon from '../../assets/icons/search/SearchIcon';
import type { CategoryUnit } from '../../types/base';

type SearchSectionProps = {
  search: (searchTerm: string) => Promise<void | CategoryUnit[]>;
  isLoading: boolean;
  isFailedToLoadData: boolean;
};

export default function SearchSection(props: SearchSectionProps) {
  const inputName = 'searchTerm';
  const initialSearchTerm = localStorage.getItem(inputName);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (props.isLoading) return;

    if (!(e.currentTarget instanceof HTMLFormElement))
      throw new Error('e.currentTarget is not HTMLFormElement');

    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get(inputName);
    if (typeof searchTerm !== 'string')
      throw new Error('Search term is not a string');

    props.search(searchTerm);
  }

  return (
    <div className={styles.root}>
      <h2 className={styles['search-heading']}>
        <SearchIcon size={20} />
        Search the galaxy
      </h2>

      <form
        action="#"
        className={styles['search-form']}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name={inputName}
          className={styles['search-input']}
          placeholder="Type to search..."
          defaultValue={initialSearchTerm ?? ''}
          disabled={props.isLoading || props.isFailedToLoadData}
        />
        <button
          type="submit"
          className={styles['search-button']}
          disabled={props.isLoading || props.isFailedToLoadData}
        >
          Search
        </button>
      </form>
    </div>
  );
}
