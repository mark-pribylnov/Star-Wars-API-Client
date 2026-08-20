// TODO: migrate CSS to Tailwind
// TODO: handle errors in ApiService from the API
// TODO: in types 'additional property: false' is duplicated in each file
// TODO: show HTTP error to the user, not console (find toaster library)
// TODO: in the end of the project check whether <RebelAllianceIcon/> is used. if not - delete
// TODO: APPLY SINGLETON FOR validator because it's possible to create its instance twice

import { Component } from 'react';
import styles from './App.module.scss';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { Header } from './components/Header/Header';
import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
} from './types/base';
import ApiService from './services/api';
import { unpackData } from './utils/utils';

type AppState = {
  data: CategoryUnitWithDescription[];
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
  isLoading: boolean;
  hasCachedResults: boolean;
  hasCachedData: boolean;
};

type CachedData = {
  allDataCached: CategoryUnitWithDescription[] | null;
  resultsCached: CategoryUnitWithDescription[] | null;
};

export default class App extends Component<Record<string, never>, AppState> {
  private readonly api: ApiService;

  constructor(props: Record<string, never>) {
    super(props);

    const searchTerm = localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm);
    const { allDataCached, resultsCached } = this.getCachedData();

    this.api = new ApiService();
    this.state = {
      data: allDataCached ?? [],
      searchResults: resultsCached ?? allDataCached ?? [],
      searchTerm,
      isLoading: !allDataCached,
      hasCachedResults: Boolean(resultsCached),
      hasCachedData: Boolean(allDataCached),
    };
  }
  // TODO: DISABLE SEARCH INPUT WHILE isLoading

  async componentDidMount() {
    let data = null;

    if (this.state.hasCachedData) {
      data = this.state.data;
    } else {
      data = unpackData(await this.api.getAllData());

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.allDataCached,
        JSON.stringify(data)
      );
    }

    const newState = { data, isLoading: false, hasCachedData: true };

    if (this.state.hasCachedResults) {
      this.setState(newState);
    } else {
      this.setState({ ...newState, searchResults: data });
    }
  }

  search = async (searchTerm: string | null): Promise<void> => {
    const trimmedTerm = searchTerm?.trim();

    if (!trimmedTerm) {
      this.handleEmptySubmit();
      return;
    }

    const searchResults: CategoryUnitWithDescription[] = [];

    this.state.data.forEach((item) => {
      if (item.name.toLowerCase().includes(trimmedTerm.toLowerCase()))
        searchResults.push(item);
    });

    this.saveSearchResults(searchResults, trimmedTerm);
  };

  private saveSearchResults(
    results: CategoryUnitWithDescription[],
    searchTerm: string
  ) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.lastResultsCached,
      JSON.stringify(results)
    );
    this.setState({ searchResults: results, searchTerm });
  }

  private handleEmptySubmit() {
    this.setState({
      searchTerm: null,
      searchResults: this.state.data,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.lastResultsCached);
  }

  private getCachedData(): CachedData {
    const allDataCached = localStorage.getItem(
      LOCAL_STORAGE_KEYS.allDataCached
    );
    const resultsCached = localStorage.getItem(
      LOCAL_STORAGE_KEYS.lastResultsCached
    );

    const raw = {
      allDataCached,
      resultsCached,
    };

    const parsed = Object.entries(raw).map(([propertyName, arrayOfItems]) => {
      const objectEntries = [propertyName];
      const parsedArrayOfItems = arrayOfItems ? JSON.parse(arrayOfItems) : null;

      if (parsedArrayOfItems && !Array.isArray(parsedArrayOfItems))
        throw new Error(`Array is expected.`);

      objectEntries.push(parsedArrayOfItems);
      return objectEntries;
    });

    return Object.fromEntries(parsed);
  }

  render() {
    return (
      <div className={styles['app-wrapper']}>
        <Header />
        <SearchSection search={this.search} />
        <ResultsSection
          searchResults={this.state.searchResults}
          searchTerm={this.state.searchTerm}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}
