// TODO: migrate CSS to Tailwind
// TODO: handle errors in ApiService from the API
// TODO: in types 'additional property: false' is duplicated in each file
// TODO: show HTTP error to the user, not console

import { Component } from 'react';
import styles from './App.module.scss';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { Header } from './components/Header/Header';
import type {
  CategoryUnitWithDescription,
  DataWithDescription,
} from './types/base';
import ApiService from './services/api';

type AppState = {
  data: DataWithDescription[];
  searchResults: CategoryUnitWithDescription[];
};
export default class App extends Component<Record<string, never>, AppState> {
  private readonly api: ApiService;

  constructor(props: Record<string, never>) {
    super(props);
    this.api = new ApiService();
    this.state = {
      data: [],
      searchResults: [],
    };
  }

  async componentDidMount() {
    const data = await this.api.getAllData();
    this.setState({ data });
  }

  search = async (searchTerm: string): Promise<void> => {
    if (!searchTerm) return;

    const data = this.state.data;
    const searchResults: CategoryUnitWithDescription[] = [];

    data.forEach((group) => {
      group.entries.forEach((entry) => {
        if (entry.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          searchResults.push(entry);
      });
    });

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
