// TODO: migrate CSS to Tailwind
// TODO: in the end of the project check whether <RebelAllianceIcon/> is used. if not - delete
// TODO: handle validation crash if API returns junk
// TODO: use https://github.com/bvaughn/react-error-boundary instead of your own ErrorBoundary (link from the docs)

import { Component, type ReactNode } from 'react';
import styles from './App.module.scss';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { Header } from './components/Header/Header';
import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
  type ToastType,
} from './types/base';
import ApiService from './services/api';
import { unpackData } from './utils/utils';
import { getRetryFailedMessage } from './utils/responseMessage';
import { ToastContainer, toast } from 'react-toastify';

type AppState = {
  data: CategoryUnitWithDescription[] | null;
  searchResults: CategoryUnitWithDescription[] | null;
  searchTerm: string | null;
  isLoading: boolean;
  hasCachedResults: boolean;
  hasCachedData: boolean;
  loadFailed: boolean;
  errorSimulated: boolean;
};

type CachedData = {
  allDataCached: CategoryUnitWithDescription[] | null;
  resultsCached: CategoryUnitWithDescription[] | null;
};

export default class App extends Component<Record<string, never>, AppState> {
  private readonly api: ApiService;
  private readonly retryFailedToastId = 'retry-failed';

  private notify = (message: ReactNode, type: ToastType) =>
    toast(message, { type });

  private notifyRetryFailed = () => {
    const message = getRetryFailedMessage();

    if (toast.isActive(this.retryFailedToastId)) {
      toast.update(this.retryFailedToastId, {
        render: message,
        type: 'error',
        autoClose: 5000,
      });
      return;
    }

    toast(message, {
      type: 'error',
      toastId: this.retryFailedToastId,
    });
  };

  constructor(props: Record<string, never>) {
    super(props);

    const searchTerm = localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm);
    const { allDataCached, resultsCached } = this.getCachedData();

    this.api = new ApiService(this.notify);
    this.state = {
      data: allDataCached,
      searchResults: resultsCached ?? allDataCached,
      searchTerm,
      isLoading: !allDataCached,
      hasCachedResults: Boolean(resultsCached),
      hasCachedData: Boolean(allDataCached),
      loadFailed: false,
      errorSimulated: false,
    };
  }

  async componentDidMount() {
    if (this.state.hasCachedData) {
      this.setState({ isLoading: false });
      return;
    }

    const packedData = await this.api.getAllData();
    const data = packedData ? unpackData(packedData) : null;

    if (data) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.allDataCached,
        JSON.stringify(data)
      );
    }

    this.setState({
      data,
      searchResults: data,
      isLoading: false,
      hasCachedData: Boolean(data),
      loadFailed: !data,
    });
  }

  search = async (searchTerm: string | null): Promise<void> => {
    const trimmedTerm = searchTerm?.trim() || null;

    if (trimmedTerm === this.state.searchTerm) return;

    if (!trimmedTerm) {
      this.handleEmptySubmit();
      return;
    }

    const searchResults: CategoryUnitWithDescription[] = [];

    if (this.state.data)
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

  private retryLoadData = async () => {
    this.setState({ isLoading: true });

    localStorage.removeItem(LOCAL_STORAGE_KEYS.allDataCached);

    const packedData = await this.api.getAllData();
    const data = packedData ? unpackData(packedData) : null;

    if (data) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.allDataCached,
        JSON.stringify(data)
      );
    } else {
      this.notifyRetryFailed();
    }

    this.setState({
      data,
      searchResults: data,
      isLoading: false,
      hasCachedData: Boolean(data),
      loadFailed: !data,
    });
  };

  private simulateError = () => {
    this.setState({ errorSimulated: true });
  };

  render() {
    if (this.state.errorSimulated)
      throw new Error('Artificial crash. Testing Error Boundary.');

    const { data, isLoading, loadFailed } = this.state;

    return (
      <div className={styles['app-wrapper']}>
        <Header />
        <SearchSection
          search={this.search}
          isLoading={isLoading}
          isFailedToLoadData={loadFailed || (!data && !isLoading)}
        />
        <ResultsSection
          searchResults={this.state.searchResults}
          searchTerm={this.state.searchTerm}
          isLoading={isLoading}
          loadFailed={loadFailed}
          onRetryLoadData={this.retryLoadData}
        />
        <ToastContainer position="bottom-right" />
        <button
          type="button"
          className={styles['simulate-error-button']}
          onClick={this.simulateError}
        >
          Simulate error
        </button>
      </div>
    );
  }
}
