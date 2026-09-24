// TODO at the end of the project:
// - migrate CSS to Tailwind
// - check whether <RebelAllianceIcon/> is used. if not - delete
// - use https://github.com/bvaughn/react-error-boundary instead of your own ErrorBoundary (link from the docs)
// TODO in the near future:
// - nothing

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './App.module.scss';
import SearchSection from '../components/SearchSection/SearchSection';
import ResultsSection from '../components/ResultsSection/ResultsSection';
import Header from '../components/Header/Header';
import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  type CategoryUnitWithDescription,
  type LoadErrorReason,
} from '../types/base';
import ApiService from '../services/api';
import { ToastContainer } from 'react-toastify';
import {
  getCachedData,
  loadInitialData,
  retryLoadData,
  search,
} from './helpers';
import { notify, getLoadError, notifyRetryFailed } from './helpers/ui';

export type SetStateWhenFetchFailedParams = {
  reason: LoadErrorReason;
};

export default function App() {
  const { allDataCached, resultsCached } = getCachedData();
  const initialAllDataRef = useRef(allDataCached);

  const apiRef = useRef<ApiService | null>(null);
  if (apiRef.current === null) apiRef.current = new ApiService(notify);
  const api = apiRef.current;

  const [data, setData] = useState<CategoryUnitWithDescription[] | null>(
    allDataCached
  );

  const [searchResults, setSearchResults] = useState<
    CategoryUnitWithDescription[] | null
  >(resultsCached ?? allDataCached);

  const [searchTerm, setSearchTerm] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.searchTerm)
  );

  const [, setHasCachedData] = useState<boolean>(Boolean(allDataCached));
  const [loadError, setLoadError] = useState<LoadErrorReason | null>(
    allDataCached ? null : getLoadError()
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !allDataCached && !loadError
  );
  const [errorSimulated, setErrorSimulated] = useState<boolean>(false);

  const setStateWhenFetchFailed = useCallback(
    (params: SetStateWhenFetchFailedParams): void => {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.loadError, params.reason);
      setData(null);
      setSearchResults(null);
      setIsLoading(false);
      setHasCachedData(false);
      setLoadError(params.reason);
    },
    []
  );

  const setStateWhenFetchSucceeded = useCallback(
    (fetchedData: CategoryUnitWithDescription[]): void => {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.allDataCached,
        JSON.stringify(fetchedData)
      );
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.loadError);
      setData(fetchedData);
      setSearchResults(fetchedData);
      setIsLoading(false);
      setHasCachedData(true);
      setLoadError(null);
    },
    []
  );

  useEffect(() => {
    void loadInitialData({
      hasCachedData: Boolean(initialAllDataRef.current),
      api: apiRef.current,
      setIsLoading,
      setLoadError,
      setStateWhenFetchFailed,
      setStateWhenFetchSucceeded,
    });
  }, [setStateWhenFetchFailed, setStateWhenFetchSucceeded]);

  if (errorSimulated)
    throw new Error('Artificial crash. Testing Error Boundary.');

  const isLoadFailed = loadError !== null;

  return (
    <div className={styles['app-wrapper']}>
      <Header />
      <SearchSection
        search={(newSearchTerm) =>
          search({
            newSearchTerm,
            currentSearchTerm: searchTerm,
            data,
            setSearchResults,
            setSearchTerm,
          })
        }
        isLoading={isLoading}
        isFailedToLoadData={isLoadFailed || (!data && !isLoading)}
      />
      <ResultsSection
        searchResults={searchResults}
        searchTerm={searchTerm}
        isLoading={isLoading}
        loadError={loadError}
        onRetryLoadData={() =>
          void retryLoadData({
            api,
            notifyRetryFailed,
            setIsLoading,
            setStateWhenFetchFailed,
            setStateWhenFetchSucceeded,
          })
        }
      />
      <ToastContainer position="bottom-right" />
      <button
        type="button"
        className={styles['simulate-error-button']}
        onClick={() => setErrorSimulated(true)}
      >
        Simulate error
      </button>
    </div>
  );
}
