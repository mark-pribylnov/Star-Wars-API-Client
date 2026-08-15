import type { Character } from './character';
import type { FilmOriginal, FilmRefined } from './film';
import type { Planet } from './planet';
import type { Specie } from './specie';
import type { Starship } from './starship';
import type { Vehicle } from './vehicle';

export const CATEGORIES = {
  people: 'people',
  species: 'species',
  vehicles: 'vehicles',
  starships: 'starships',
  planets: 'planets',
  films: 'films',
} as const;

export type CategoryUnit =
  | Character
  | FilmRefined
  | Planet
  | Specie
  | Starship
  | Vehicle;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export type DataShell = {
  category: Category;
  entries: unknown;
};

type FilmEntriesOriginal = {
  category: typeof CATEGORIES.films;
  entries: FilmOriginal[];
};
type FilmEntriesRefined = {
  category: typeof CATEGORIES.films;
  entries: FilmRefined[];
};

export type DataOriginal =
  | { category: typeof CATEGORIES.people; entries: Character[] }
  | { category: typeof CATEGORIES.planets; entries: Planet[] }
  | { category: typeof CATEGORIES.species; entries: Specie[] }
  | { category: typeof CATEGORIES.starships; entries: Starship[] }
  | { category: typeof CATEGORIES.vehicles; entries: Vehicle[] }
  | FilmEntriesOriginal;

export type DataRefined =
  | Exclude<DataOriginal, FilmEntriesOriginal>
  | FilmEntriesRefined;
