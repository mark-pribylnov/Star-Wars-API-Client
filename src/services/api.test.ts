import { expect, test, describe, afterEach, vi } from 'vitest';
import ApiService from './api';
import { CATEGORIES } from '../types/base';
import { getNotOkResponseMessage } from '../utils/responseMessage';

describe('ApiService', () => {
  afterEach(() => vi.restoreAllMocks());

  const okResponse = { ok: true, json: async () => [] } as Response;
  const notOkResponse = {
    ok: false,
    status: 404,
    json: async () => [],
  } as Response;

  async function setupApiForNotifications(
    howManyFails: 'one fetch failed' | 'many fetches failed'
  ) {
    const mockNotify = vi.fn();
    vi.spyOn(ApiService.prototype, 'requestOneCategory').mockImplementation(
      async (category) => {
        if (howManyFails === 'one fetch failed') {
          if (category === CATEGORIES.people) return notOkResponse;
          return okResponse;
        } else {
          if (category === CATEGORIES.people) return okResponse;
          return notOkResponse;
        }
      }
    );

    const api = new ApiService(mockNotify);
    await api.getAllData();

    return mockNotify;
  }

  test('Request the corresponding URL for each category', async () => {
    const categoryNames = Object.values(CATEGORIES);
    const numberOfCategories = categoryNames.length;
    const mockRequestOneCategory = vi
      .spyOn(ApiService.prototype, 'requestOneCategory')
      .mockResolvedValue({ ok: true, json: async () => [] } as Response);

    const api = new ApiService(vi.fn());
    await api.getAllData();

    expect(mockRequestOneCategory).toHaveBeenCalledTimes(numberOfCategories);
    for (const category of categoryNames) {
      expect(mockRequestOneCategory).toHaveBeenCalledWith(category);
    }
  });

  test("Response is not ok - notify once with arguments `(getNotOkResponseMessage(response), 'error')`", async () => {
    const mockNotify = await setupApiForNotifications('one fetch failed');

    expect(mockNotify).toHaveBeenCalledTimes(1);
    expect(mockNotify).toHaveBeenCalledWith(
      getNotOkResponseMessage(notOkResponse),
      'error'
    );
  });

  test('Multiple not ok responses - notify only once', async () => {
    const mockNotify = await setupApiForNotifications('many fetches failed');

    expect(mockNotify).toHaveBeenCalledTimes(1);
  });
});
