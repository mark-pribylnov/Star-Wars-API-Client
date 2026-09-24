import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
} from '../../types/base';
import { saveSearchResults } from './saveResults';
import type { SetData, SetSearchTerm } from './types';

type SearchParams = {
  newSearchTerm: string | null;
  currentSearchTerm: string | null;
  data: CategoryUnitWithDescription[] | null;
  setSearchResults: SetData;
  setSearchTerm: SetSearchTerm;
};

export async function search({
  newSearchTerm,
  currentSearchTerm,
  data,
  setSearchResults,
  setSearchTerm,
}: SearchParams): Promise<void> {
  const trimmedTerm = newSearchTerm?.trim() || null;

  if (trimmedTerm === currentSearchTerm) return;

  if (!trimmedTerm) {
    handleEmptySubmit(data, setSearchResults, setSearchTerm);
    return;
  }

  const results: CategoryUnitWithDescription[] = [];

  if (data)
    data.forEach((item) => {
      if (item.name.toLowerCase().includes(trimmedTerm.toLowerCase()))
        results.push(item);
    });

  saveSearchResults(results, trimmedTerm, setSearchResults, setSearchTerm);
}

export function handleEmptySubmit(
  data: CategoryUnitWithDescription[] | null,
  setSearchResults: SetData,
  setSearchTerm: SetSearchTerm
) {
  setSearchTerm(null);
  setSearchResults(data);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.searchTerm);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.lastResultsCached);
}
