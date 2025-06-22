import moment from 'moment';
import { defineStore } from 'pinia';
import { httpService } from 'src/helpers/httpService';

export const useTripsStore = defineStore('trips', {
  state: () => ({
    currentPage: 1,
    trips: [],
    tripsLoader: false,
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

        const response = await httpService.post(
          `/trip-dispatcher/trip-instance/web-list?page=${params.page}&limit=${params.limit}`,
          this.tripsPayloadHttp
        );

        console.log({ response });
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        this.endLoader();
      }
    },
    async fetchTripStats(): Promise<void> {
      try {
        this.startTripStatsLoader();

        const response = await httpService.post(
          '/trip-dispatcher/trip-instance/web-stats',
          this.tripsPayloadHttp
        );

        console.log('stats', { response });
      } catch (error) {
        console.error('Error fetching trip status:', error);
      } finally {
        this.endTripStatsLoader();
      }
    },
  },
});
