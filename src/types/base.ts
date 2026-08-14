import type { Character } from './character';
import type { Film } from './film';
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
  | Film
  | Planet
  | Specie
  | Starship
  | Vehicle;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export type DataShell = {
  category: Category;
  entries: unknown;
};

export type Data = {
  category: Category;
  entries: CategoryUnit[];
};
