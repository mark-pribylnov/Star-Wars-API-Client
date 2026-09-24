import type ApiService from '../../services/api';
import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  type CategoryUnitWithDescription,
} from '../../types/base';
import { unpackData } from '../../utils/utils';
import type { SetStateWhenFetchFailedParams } from '../App';
import type { SetBoolean, SetLoadError } from './types';

type LoadInitialDataParams = {
  hasCachedData: boolean;
  api: ApiService | null;
  setLoadError: SetLoadError;
  setIsLoading: SetBoolean;
  setStateWhenFetchFailed: (params: SetStateWhenFetchFailedParams) => void;
  setStateWhenFetchSucceeded: (
    fetchedData: CategoryUnitWithDescription[]
  ) => void;
};

type RetryLoadDataParams = {
  api: ApiService;
  setIsLoading: SetBoolean;
  notifyRetryFailed: () => void;
  setStateWhenFetchFailed: (params: SetStateWhenFetchFailedParams) => void;
  setStateWhenFetchSucceeded: (
    fetchedData: CategoryUnitWithDescription[]
  ) => void;
};

export async function loadInitialData({
  hasCachedData,
  api,
  setIsLoading,
  setLoadError,
  setStateWhenFetchFailed,
  setStateWhenFetchSucceeded,
}: LoadInitialDataParams): Promise<void> {
  if (hasCachedData) {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.loadError);
    setIsLoading(false);
    setLoadError(null);
    return;
  }

  const result = await api?.getAllData();
  if (!result) throw new Error('The result of api.getAllData() is falsy');

  if (result.ok) {
    setStateWhenFetchSucceeded(unpackData(result.data));
    return;
  }
  setStateWhenFetchFailed({ reason: result.reason });
}

export async function retryLoadData({
  api,
  notifyRetryFailed,
  setStateWhenFetchFailed,
  setStateWhenFetchSucceeded,
  setIsLoading,
}: RetryLoadDataParams): Promise<void> {
  setIsLoading(true);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.allDataCached);

  const result = await api.getAllData();

  if (result.ok) {
    setStateWhenFetchSucceeded(unpackData(result.data));
    return;
  }

  if (result.reason === 'fetch') notifyRetryFailed();
  setStateWhenFetchFailed({ reason: result.reason });
}
