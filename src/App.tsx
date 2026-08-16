// TODO: migrate CSS to Tailwind
// TODO: handle errors in ApiService from the API
// TODO: in types 'additional property: false' is duplicated in each file
// TODO: show HTTP error to the user, not console

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

type AppState = {
  data: DataWithDescription[];
  searchResults: CategoryUnitWithDescription[];
  searchTerm: string | null;
};
export default class App extends Component<Record<string, never>, AppState> {
  private readonly api: ApiService;

  constructor(props: Record<string, never>) {
    super(props);
    this.api = new ApiService();
    this.state = {
      data: [],
      searchResults: [],
      searchTerm: localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm),
    };
  }

  async componentDidMount() {
    const data = await this.api.getAllData();
    this.setState({ data });

    this.search(this.state.searchTerm ?? null);
  }

  search = async (searchTerm: string | null): Promise<void> => {
    if (!searchTerm) return;

    const data = this.state.data;
    const searchResults: CategoryUnitWithDescription[] = [];

    data.forEach((group) => {
      group.entries.forEach((entry) => {
        if (entry.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          searchResults.push(entry);
      });
    });

    localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
    this.setState({ searchResults });
  };

  render() {
    return (
      <div className={styles['app-wrapper']}>
        <Header />
        <SearchSection search={this.search} />
        <ResultsSection searchResults={this.state.searchResults} />
      </div>
    );
  }
}
