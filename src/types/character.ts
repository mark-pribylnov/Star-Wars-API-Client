export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld?: string | null;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export const CharacterSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
    'films',
    'species',
    'vehicles',
    'starships',
    'created',
    'edited',
    'url',
  ],
  properties: {
    name: { type: 'string', minLength: 1 },
    height: { type: 'string' },
    mass: { type: 'string' },
    hair_color: { type: 'string' },
    skin_color: { type: 'string' },
    eye_color: { type: 'string' },
    birth_year: { type: 'string' },
    gender: { type: 'string' },
    homeworld: { type: 'string', nullable: true },
    films: { type: 'array', items: { type: 'string' } },
    species: { type: 'array', items: { type: 'string' } },
    vehicles: { type: 'array', items: { type: 'string' } },
    starships: { type: 'array', items: { type: 'string' } },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' },
  },
};
