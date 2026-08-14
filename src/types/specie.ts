import type { JSONSchemaType } from 'ajv';

export type Specie = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld?: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export const SpecieSchema: JSONSchemaType<Specie> = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'classification',
    'designation',
    'average_height',
    'skin_colors',
    'hair_colors',
    'eye_colors',
    'average_lifespan',
    'language',
    'people',
    'films',
    'created',
    'edited',
    'url',
  ],
  properties: {
    name: { type: 'string', minLength: 1 },
    classification: { type: 'string' },
    designation: { type: 'string' },
    average_height: { type: 'string' },
    skin_colors: { type: 'string' },
    hair_colors: { type: 'string' },
    eye_colors: { type: 'string' },
    average_lifespan: { type: 'string' },
    homeworld: { type: 'string', nullable: true },
    language: { type: 'string' },
    people: { type: 'array', items: { type: 'string' } },
    films: { type: 'array', items: { type: 'string' } },
    created: { type: 'string' },
    edited: { type: 'string' },
    url: { type: 'string' },
  },
};

/**
 * Unlike other type files, this schema is inline (no `*SchemaContent` + spread)
 * because `nullable: true` breaks with `as const`.
 *
 * SWAPI can return `"homeworld": null`. Ajv `JSONSchemaType` only accepts
 * `nullable: true` when the TS field is optional (`homeworld?: string | null`),
 * so `homeworld` is also omitted from `required`. Same pattern in character.ts.
 *
 * - Ajv TypeScript / JSONSchemaType: https://ajv.js.org/guide/typescript.html
 * - Ajv `nullable` keyword: https://ajv.js.org/json-schema.html#nullable
 * - JSON Schema `required`: https://json-schema.org/understanding-json-schema/reference/object#required-properties
 */
