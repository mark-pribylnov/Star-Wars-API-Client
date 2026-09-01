import type { JSONSchemaType } from 'ajv';

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export const PlanetSchema: JSONSchemaType<Planet> = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'residents',
    'films',
    'created',
    'edited',
    'url',
  ],
  properties: {
    name: { type: 'string', minLength: 1 },
    rotation_period: { type: 'string' },
    orbital_period: { type: 'string' },
    diameter: { type: 'string' },
    climate: { type: 'string' },
    gravity: { type: 'string' },
    terrain: { type: 'string' },
    surface_water: { type: 'string' },
    population: { type: 'string' },
    residents: { type: 'array', items: { type: 'string' } },
    films: { type: 'array', items: { type: 'string' } },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' },
  },
};
