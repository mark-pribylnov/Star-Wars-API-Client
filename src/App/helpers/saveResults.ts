import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
} from '../../types/base';
import type { SetData, SetSearchTerm } from './types';

export function saveSearchResults(
  results: CategoryUnitWithDescription[],
  searchTerm: string,
  setSearchResults: SetData,
  setSearchTerm: SetSearchTerm
) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.searchTerm, searchTerm);
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.lastResultsCached,
    JSON.stringify(results)
  );
  setSearchResults(results);
  setSearchTerm(searchTerm);
}
