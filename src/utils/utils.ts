import { CATEGORIES } from '../types';
import type {
  Category,
  CategoryUnitWithDescription,
  DataOriginal,
  DataRefined,
  DataWithDescription,
} from '../types/base';
import { itemDescriptions } from '../data/itemDescriptions';

export function addCategoryToData(category: Category, data: unknown) {
  return { category, entries: data };
}

function changeTitleToNameProperty(arr: DataOriginal[]): DataRefined[] {
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

function addDescriptionToData(data: DataRefined[]): DataWithDescription[] {
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

export function makeDataUsable(data: DataOriginal[]): DataWithDescription[] {
  const withUpdatedPropertyName = changeTitleToNameProperty(data);
  return addDescriptionToData(withUpdatedPropertyName);
}

export function unpackData(
  data: DataWithDescription[]
): CategoryUnitWithDescription[] {
  return data.map((group) => group.entries).flat();
}

export function pause(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
