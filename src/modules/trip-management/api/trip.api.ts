import { HttpService } from 'src/helpers/httpService';
import type { TripResponse, TripStatsResponse } from '../types/trip-api.types';

class TripApi extends HttpService {
  constructor() {
    super('/trip-dispatcher');
  }

  async getTrips(params: Record<string, any> = {}, queryParams: Record<string, any> = {}) {
    return this.post<{ list: TripResponse[]; total: number }>(
      `/trip-instance/web-list?${new URLSearchParams(queryParams).toString()}`,
      params
    );
  }

  async getTripStats(params: Record<string, any> = {}) {
    return this.post<TripStatsResponse>('/trip-instance/web-stats', params);
  }
}

export const tripApi = new TripApi();
