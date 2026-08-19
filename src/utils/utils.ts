import { CATEGORIES } from '../types';
import type {
  DataOriginal,
  DataRefined,
  DataWithDescription,
} from '../types/base';
import { itemDescriptions } from '../data/itemDescriptions';

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

export function addDescriptionToData(
  data: DataRefined[]
): DataWithDescription[] {
  const withDescription = data.map((group) => {
    const entriesWithDescription = group.entries.map((entry) => {
      const description = itemDescriptions.find(
        (item) => item.name === entry.name
      )?.description;

      if (!description) throw new Error('Description not found');

      const entryWithDescription = { ...entry, description };
      return entryWithDescription;
    });

    const groupWithDescription = {
      category: group.category,
      entries: entriesWithDescription,
    } as DataWithDescription;

    return groupWithDescription;
  });
  return withDescription;
}

export function unpackData(data: DataWithDescription[]) {
  return data.map((group) => group.entries).flat();
}
