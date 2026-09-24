// TODO at the end of the project:
// - migrate CSS to Tailwind
// - check whether <RebelAllianceIcon/> is used. if not - delete
// - use https://github.com/bvaughn/react-error-boundary instead of your own ErrorBoundary (link from the docs)
// TODO in the near future:
// - nothing

import { useState, useEffect, useRef, type ReactNode } from 'react';
import styles from './App.module.scss';
import SearchSection from '../components/SearchSection/SearchSection';
import ResultsSection from '../components/ResultsSection/ResultsSection';
import Header from '../components/Header/Header';
import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  type CategoryUnitWithDescription,
  type LoadErrorReason,
  type ToastType,
} from '../types/base';
import ApiService from '../services/api';
import { unpackData } from '../utils/utils';
import { getRetryFailedMessage } from '../utils/responseMessage';
import { ToastContainer, toast } from 'react-toastify';

type CachedData = {
  allDataCached: CategoryUnitWithDescription[] | null;
  resultsCached: CategoryUnitWithDescription[] | null;
};

export default function App() {
  const retryFailedToastId = 'retry-failed';

  function notify(message: ReactNode, type: ToastType) {
    toast(message, { type });
  }

  function notifyRetryFailed() {
    const message = getRetryFailedMessage();

    if (toast.isActive(retryFailedToastId)) {
      toast.update(retryFailedToastId, {
        render: message,
        type: 'error',
        autoClose: 5000,
      });
      return;
    }

    toast(message, {
      type: 'error',
      toastId: retryFailedToastId,
    });
  }
  function getCachedData(): CachedData {
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

  useEffect(() => {
    (async function load() {
      const hasCachedData = Boolean(initialAllDataRef.current);
      if (hasCachedData) {
        sessionStorage.removeItem(SESSION_STORAGE_KEYS.loadError);
        setIsLoading(false);
        setLoadError(null);
        return;
      }

      const result = await apiRef.current?.getAllData();
      if (!result) throw new Error('The result of api.getAllData() is falsy');

      if (result.ok) {
        const data = unpackData(result.data);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.allDataCached,
          JSON.stringify(data)
        );

        sessionStorage.removeItem(SESSION_STORAGE_KEYS.loadError);

        setData(data);
        setSearchResults(data);
        setIsLoading(false);
        setHasCachedData(true);
        setLoadError(null);

        return;
      }

      sessionStorage.setItem(SESSION_STORAGE_KEYS.loadError, result.reason);

      setData(null);
      setSearchResults(null);
      setIsLoading(false);
      setHasCachedData(false);
      setLoadError(result.reason);
    })();
  }, []);

  async function search(newSearchTerm: string | null): Promise<void> {
    const trimmedTerm = newSearchTerm?.trim() || null;

    if (trimmedTerm === searchTerm) return;

    if (!trimmedTerm) {
      handleEmptySubmit();
      return;
    }

    const searchResults: CategoryUnitWithDescription[] = [];

    if (data)
      data.forEach((item) => {
        if (item.name.toLowerCase().includes(trimmedTerm.toLowerCase()))
          searchResults.push(item);
      });

    saveSearchResults(searchResults, trimmedTerm);
  }

  function saveSearchResults(
    results: CategoryUnitWithDescription[],
    searchTerm: string
  ) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.lastResultsCached,
      JSON.stringify(results)
    );
    setSearchResults(results);
    setSearchTerm(searchTerm);
  }

  function handleEmptySubmit() {
    setSearchTerm(null);
    setSearchResults(data);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.lastResultsCached);
  }

  function getLoadError(): LoadErrorReason | null {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEYS.loadError);
    if (stored === 'fetch' || stored === 'schema') return stored;
    return null;
  }

  async function retryLoadData() {
    setIsLoading(true);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.allDataCached);

    const result = await api.getAllData();

    if (result.ok) {
      const data = unpackData(result.data);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.allDataCached,
        JSON.stringify(data)
      );
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.loadError);

      setData(data);
      setSearchResults(data);
      setIsLoading(false);
      setHasCachedData(true);
      setLoadError(null);
      return;
    }

    if (result.reason === 'fetch') notifyRetryFailed();

    sessionStorage.setItem(SESSION_STORAGE_KEYS.loadError, result.reason);

    setData(null);
    setSearchResults(null);
    setIsLoading(false);
    setHasCachedData(false);
    setLoadError(result.reason);
  }

  function simulateError() {
    setErrorSimulated(true);
  }

  if (errorSimulated)
    throw new Error('Artificial crash. Testing Error Boundary.');

  const isLoadFailed = loadError !== null;

  return (
    <div className={styles['app-wrapper']}>
      <Header />
      <SearchSection
        search={search}
        isLoading={isLoading}
        isFailedToLoadData={isLoadFailed || (!data && !isLoading)}
      />
      <ResultsSection
        searchResults={searchResults}
        searchTerm={searchTerm}
        isLoading={isLoading}
        loadError={loadError}
        onRetryLoadData={retryLoadData}
      />
      <ToastContainer position="bottom-right" />
      <button
        type="button"
        className={styles['simulate-error-button']}
        onClick={simulateError}
      >
        Simulate error
      </button>
    </div>
  );
}
