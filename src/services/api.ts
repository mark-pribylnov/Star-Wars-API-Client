import {
  CATEGORIES,
  type DataShellNullable,
  type DataWithDescription,
  type LoadErrorReason,
  type ToastType,
} from '../types/base';
import { getNotOkResponseMessage } from '../utils/responseMessage';
import { addCategoryToData } from '../utils/utils';
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
    localStorage.clear();
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
      async ({ category, url }): Promise<DataShellNullable> => {
        try {
          const response = await fetch(url);

          if (!response.ok && !errorShown) {
            this.notify(getNotOkResponseMessage(response), 'error');
            errorShown = true;
          }

          return addCategoryToData(category, await response.json());
        } catch {
          return null;
        }
      }
    );

    const data = await Promise.all(promises);

    return this.validator.isDataShellValid(data);
  }
}
