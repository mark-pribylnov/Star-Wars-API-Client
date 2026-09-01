import type { JSONSchemaType } from 'ajv';

export type Vehicle = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export const VehicleSchema: JSONSchemaType<Vehicle> = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'model',
    'manufacturer',
    'cost_in_credits',
    'length',
    'max_atmosphering_speed',
    'crew',
    'passengers',
    'cargo_capacity',
    'consumables',
    'vehicle_class',
    'pilots',
    'films',
    'created',
    'edited',
    'url',
  ],
  properties: {
    name: { type: 'string', minLength: 1 },
    model: { type: 'string' },
    manufacturer: { type: 'string' },
    cost_in_credits: { type: 'string' },
    length: { type: 'string' },
    max_atmosphering_speed: { type: 'string' },
    crew: { type: 'string' },
    passengers: { type: 'string' },
    cargo_capacity: { type: 'string' },
    consumables: { type: 'string' },
    vehicle_class: { type: 'string' },
    pilots: { type: 'array', items: { type: 'string' } },
    films: { type: 'array', items: { type: 'string' } },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' },
  },
};
