import { CATEGORIES, type DataShell, type DataRefined } from '../types/base';
import { changeTitleToNameProperty } from '../utils/utils';
import ValidationService from './validation';

export default class ApiService {
  private BASE_URL = 'https://swapi.info/api/';

  private validator = new ValidationService();

  private async getAllData(): Promise<DataRefined[]> {
    const urls = Object.values(CATEGORIES).map((category) => {
      return { category, url: this.BASE_URL + category };
    });

    const promises = urls.map(async ({ category, url }): Promise<DataShell> => {
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(
          `STATUS NOT OK: ${response.status}\nSTATUS TEXT: ${response.statusText}`
        );
      }

      return { category, entries: await response.json() };
    });

    const data = await Promise.all(promises);

    if (!this.validator.validateAllCategories(data))
      throw new Error('Received data failed schema validation');

    return changeTitleToNameProperty(data);
  }

  async search(searchTerm: string): Promise<void> {
    const data = await this.getAllData();
    const match = [];

    data.forEach((entries) => {
      entries.entries.forEach((entry) => {
        if (entry.name.includes(searchTerm)) match.push(entry);
      });
    });
  }
}
