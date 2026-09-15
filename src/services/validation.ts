import Ajv from 'ajv';

import {
  type Character,
  type FilmOriginal,
  type Planet,
  type Specie,
  type Starship,
  type Vehicle,
  CharacterSchema,
  FilmSchema,
  PlanetSchema,
  SpecieSchema,
  StarshipSchema,
  VehicleSchema,
} from '../types';
import { CATEGORIES } from '../types';
import type {
  DataOriginal,
  DataShell,
  DataShellNullable,
  DataWithDescription,
  LoadErrorReason,
} from '../types/base';
import { makeDataUsable } from '../utils/utils';

type isDataShellValidResult =
  | {
      ok: false;
      reason: LoadErrorReason;
    }
  | { ok: true; data: DataWithDescription[] };

export default class ValidationService {
  static #instance: ValidationService;

  private ajv = new Ajv();

  private constructor() {}

  public static get instance(): ValidationService {
    if (!ValidationService.#instance) {
      ValidationService.#instance = new ValidationService();
    }

    return ValidationService.#instance;
  }

  private validateCharacter = this.ajv.compile<Character>(CharacterSchema);
  private validateFilm = this.ajv.compile<FilmOriginal>(FilmSchema);
  private validatePlanet = this.ajv.compile<Planet>(PlanetSchema);
  private validateSpecie = this.ajv.compile<Specie>(SpecieSchema);
  private validateStarship = this.ajv.compile<Starship>(StarshipSchema);
  private validateVehicle = this.ajv.compile<Vehicle>(VehicleSchema);

  private categoryValidators = {
    [CATEGORIES.people]: this.validateCharacter,
    [CATEGORIES.films]: this.validateFilm,
    [CATEGORIES.planets]: this.validatePlanet,
    [CATEGORIES.species]: this.validateSpecie,
    [CATEGORIES.starships]: this.validateStarship,
    [CATEGORIES.vehicles]: this.validateVehicle,
  };

  private validateAllCategories(data: DataShell[]): data is DataOriginal[] {
    const isValid = data.every(({ category, entries }) => {
      if (!Array.isArray(entries)) throw new Error('Array expected');

      return entries.every((item) => this.categoryValidators[category](item));
    });
    return isValid;
  }

  private dataDoesntHaveNull(data: DataShellNullable[]): data is DataShell[] {
    return data.filter(Boolean).length === Object.keys(CATEGORIES).length;
  }

  isDataShellValid(data: DataShellNullable[]): isDataShellValidResult {
    if (!this.dataDoesntHaveNull(data)) return { ok: false, reason: 'fetch' };
    if (!this.validateAllCategories(data))
      return { ok: false, reason: 'schema' };

    return { ok: true, data: makeDataUsable(data) };
  }
}
