import moment from 'moment';
import { defineStore } from 'pinia';
import { tripApi } from '../api';
import type { TripResponse, TripStatsResponse } from '../types/trips.api';

export const useTripsStore = defineStore('trips', {
  state: () => ({
    currentPage: 1,
    trips: [] as TripResponse[],
    tripsLoader: false,
    tripsTotal: 0,
    tripStats: {} as TripStatsResponse,
    tripStatsLoader: false,
  }),

  getters: {
    tripsPayloadHttp: state => {
      const started_at = moment.utc().subtract(1, 'day');
      const ended_at = moment.utc().add(1, 'day');

      return {
        started_at,
        ended_at,
        page: state.currentPage,
        limit: import.meta.env.VITE_PAGINATION_LIMIT || 10,
      };
    },
  },

  actions: {
    startLoader() {
      this.tripsLoader = true;
    },
    endLoader() {
      this.tripsLoader = false;
    },
    startTripStatsLoader() {
      this.tripStatsLoader = true;
    },
    endTripStatsLoader() {
      this.tripStatsLoader = false;
    },
    async fetchTrips(): Promise<void> {
      try {
        this.startLoader();

        const params = this.tripsPayloadHttp;
        const queryParams = {
          page: params.page,
          limit: params.limit,
        };

        const response = await tripApi.getTrips(params, queryParams);

        this.trips = response.list;
        this.tripsTotal = response.total;
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        this.endLoader();
      }
    },
    async fetchTripStats(): Promise<void> {
      try {
        this.startTripStatsLoader();

        const response = await tripApi.getTripStats(this.tripsPayloadHttp);

        this.tripStats = response;
      } catch (error) {
        console.error('Error fetching trip status:', error);
      } finally {
        this.endTripStatsLoader();
      }
    },
  },
});
