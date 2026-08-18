// TODO: migrate CSS to Tailwind
// TODO: handle errors in ApiService from the API
// TODO: in types 'additional property: false' is duplicated in each file
// TODO: show HTTP error to the user, not console
// TODO: in the end of the project check whether <RebelAllianceIcon/> is used. if not - delete

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

  private searchTerm = localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm);

  constructor(props: Record<string, never>) {
    super(props);
    this.api = new ApiService();
    this.state = {
      data: [],
      searchResults: [],
      searchTerm: this.searchTerm,
    };
  }

  private getInitialResults(data: DataWithDescription[]) {
    return data.map((group) => group.entries[0]);
  }

  async componentDidMount() {
    const data = await this.api.getAllData();
    const initialResults = this.getInitialResults(data);

    this.setState({ data, searchResults: initialResults });
    this.search(this.searchTerm);
  }

  search = async (searchTerm: string | null): Promise<void> => {
    const trimmedTerm = searchTerm?.trim();

    if (!trimmedTerm) {
      this.setState({
        searchTerm: null,
        searchResults: this.getInitialResults(this.state.data),
      });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);
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
    this.setState({ searchResults: results, searchTerm });
  }

  render() {
    return (
      <div className={styles['app-wrapper']}>
        <Header />
        <SearchSection search={this.search} />
        <ResultsSection
          searchResults={this.state.searchResults}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}
