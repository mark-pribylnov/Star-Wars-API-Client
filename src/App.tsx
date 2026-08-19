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
  type DataWithDescription,
} from './types/base';
import ApiService from './services/api';
import { pause, unpackData } from './utils/utils';

type AppState = {
  data: DataWithDescription[];
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
  isLoading: boolean;
};
export default class App extends Component<Record<string, never>, AppState> {
  private readonly api: ApiService;

  constructor(props: Record<string, never>) {
    super(props);

    const searchTerm = localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm);
    const cachedResults = this.getCachedResults();

    this.api = new ApiService();
    this.state = {
      data: [],
      searchResults: cachedResults ?? [],
      searchTerm,
      isLoading: !cachedResults,
    };
  }
  // TODO: REMOVE state.DATA AND REPLACE WITH DATA UNPACKED IN THE STATE
  // TODO: DISABLE SEARCH INPUT WHILE isLoading
  // TODO: make name and description table heads not jump when switching between loading state and with results

  async componentDidMount() {
    const data = await this.api.getAllData();
    const dataUnpacked = unpackData(data);
    const hasCachedResults = this.getCachedResults() !== null;

    const newState = { data, isLoading: false };

    await pause(1000);

    if (hasCachedResults) {
      this.setState(newState);
    } else {
      this.setState({ ...newState, searchResults: dataUnpacked });
    }
  }

  search = async (searchTerm: string | null): Promise<void> => {
    const trimmedTerm = searchTerm?.trim();

    if (!trimmedTerm) {
      this.handleEmptySubmit();
      return;
    }

    const searchResults: CategoryUnitWithDescription[] = [];

    this.state.data.forEach((group) => {
      group.entries.forEach((entry) => {
        if (entry.name.toLowerCase().includes(trimmedTerm.toLowerCase()))
          searchResults.push(entry);
      });
    });

    this.saveSearchResults(searchResults, trimmedTerm);
  };

  private saveSearchResults(
    results: CategoryUnitWithDescription[],
    searchTerm: string
  ) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.lastResults,
      JSON.stringify(results)
    );
    this.setState({ searchResults: results, searchTerm });
  }

  private handleEmptySubmit() {
    this.setState({
      searchTerm: null,
      searchResults: unpackData(this.state.data),
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.lastResults);
  }

  private getCachedResults(): CategoryUnitWithDescription[] | null {
    const json = localStorage.getItem(LOCAL_STORAGE_KEYS.lastResults);
    if (!json) return null;

    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error('Cached results is not array');

    return parsed;
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
