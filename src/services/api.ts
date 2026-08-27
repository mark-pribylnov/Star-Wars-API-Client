import {
  CATEGORIES,
  type DataShell,
  type DataWithDescription,
  type LoadErrorReason,
  type ToastType,
} from '../types/base';
import { getNotOkResponseMessage } from '../utils/responseMessage';
import {
  addDescriptionToData,
  changeTitleToNameProperty,
} from '../utils/utils';
import ValidationService from './validation';
import type { ReactNode } from 'react';

type Notify = (message: ReactNode, type: ToastType) => void;

export type GetAllDataResult =
  | { ok: true; data: DataWithDescription[] }
  | { ok: false; reason: LoadErrorReason };

export default class ApiService {
  private BASE_URL = 'https://swapi.info/api/';

  private validator = ValidationService.instance;
  private notify: Notify;

  constructor(notify: Notify) {
    this.notify = notify;
  }

  async getAllData(): Promise<GetAllDataResult> {
    let errorShown = false;

    const urls = Object.values(CATEGORIES).map((category) => {
      return {
        category,
        url: this.BASE_URL + category,
      };
    });

    const promises = urls.map(
      async ({ category, url }): Promise<DataShell | null> => {
        try {
          const response = await fetch(url);

          if (!response.ok && !errorShown) {
            this.notify(getNotOkResponseMessage(response), 'error');
            errorShown = true;
          }

          return { category, entries: await response.json() };
        } catch {
          return null;
        }
      }
    );

    const data = await Promise.all(promises);

    function dataDoesntHaveNull(
      data: (DataShell | null)[]
    ): data is DataShell[] {
      return data.filter(Boolean).length === Object.keys(CATEGORIES).length;
    }

    if (!dataDoesntHaveNull(data)) return { ok: false, reason: 'fetch' };

    if (!this.validator.validateAllCategories(data)) {
      return { ok: false, reason: 'schema' };
    }

    const dataRefined = changeTitleToNameProperty(data);
    const withDescription = addDescriptionToData(dataRefined);

    return { ok: true, data: withDescription };
  }
}
