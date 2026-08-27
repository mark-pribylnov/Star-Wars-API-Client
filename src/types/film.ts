import type { JSONSchemaType } from 'ajv';

export type FilmOriginal = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type FilmRefined = Omit<FilmOriginal, 'title'> & { name: string };

export const FilmSchema: JSONSchemaType<FilmOriginal> = {
  type: 'object',
  additionalProperties: false,
  required: [
    'title',
    'episode_id',
    'opening_crawl',
    'director',
    'producer',
    'release_date',
    'characters',
    'planets',
    'starships',
    'vehicles',
    'species',
    'created',
    'edited',
    'url',
  ],
  properties: {
    title: { type: 'string', minLength: 1 },
    episode_id: { type: 'number' },
    opening_crawl: { type: 'string' },
    director: { type: 'string' },
    producer: { type: 'string' },
    release_date: { type: 'string' },
    characters: { type: 'array', items: { type: 'string' } },
    planets: { type: 'array', items: { type: 'string' } },
    starships: { type: 'array', items: { type: 'string' } },
    vehicles: { type: 'array', items: { type: 'string' } },
    species: { type: 'array', items: { type: 'string' } },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' },
  },
};
