import { CATEGORIES } from '../types';
import type { DataOriginal, DataRefined } from '../types/base';

export function changeTitleToNameProperty(arr: DataOriginal[]): DataRefined[] {
  return arr.map((entry) => {
    if (entry.category === CATEGORIES.films) {
      const updatedEntries = entry.entries.map((item) => {
        const { title, ...rest } = item;
        return { ...rest, name: title };
      });

      return { ...entry, entries: updatedEntries };
    }
    return entry;
  });
}
