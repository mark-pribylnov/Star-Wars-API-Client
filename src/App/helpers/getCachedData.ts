import {
  LOCAL_STORAGE_KEYS,
  type CategoryUnitWithDescription,
} from '../../types/base';

type CachedData = {
  allDataCached: CategoryUnitWithDescription[] | null;
  resultsCached: CategoryUnitWithDescription[] | null;
};

export function getCachedData(): CachedData {
  const allDataCached = localStorage.getItem(LOCAL_STORAGE_KEYS.allDataCached);
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
