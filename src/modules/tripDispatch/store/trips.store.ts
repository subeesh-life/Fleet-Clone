import moment from 'moment';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { tripApi } from '../api';
import type { TripResponse, TripStatsResponse } from '../types/trips.api';

export const useTripsStore = defineStore('trips', () => {
  /*
   ** States - using refs for reactive state
   */
  const currentPage = ref(1);
  const trips = ref<TripResponse[]>([]);
  const tripsLoader = ref(false);
  const tripsTotal = ref(0);
  const tripStats = ref<TripStatsResponse>({});
  const tripStatsLoader = ref(false);

  /*
   ** Getters - using computed for derived state
   */
  const tripsPayloadHttp = computed(() => {
    const started_at = moment.utc().subtract(30, 'day');
    const ended_at = moment.utc().add(1, 'day');
    return {
      started_at,
      ended_at,
      page: currentPage.value,
      limit: import.meta.env.VITE_PAGINATION_LIMIT || 10,
    };
  });

  /*
   ** Actions - regular functions
   */
  const startLoader = () => {
    tripsLoader.value = true;
  };

  const endLoader = () => {
    tripsLoader.value = false;
  };

  const startTripStatsLoader = () => {
    tripStatsLoader.value = true;
  };

  const endTripStatsLoader = () => {
    tripStatsLoader.value = false;
  };

  const fetchTrips = async (): Promise<void> => {
    try {
      startLoader();
      const params = tripsPayloadHttp.value;
      const queryParams = {
        page: params.page,
        limit: params.limit,
      };
      const response = await tripApi.getTrips(params, queryParams);
      trips.value = response.list;
      tripsTotal.value = response.total;
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      endLoader();
    }
  };

  const fetchTripStats = async (): Promise<void> => {
    try {
      startTripStatsLoader();
      const response = await tripApi.getTripStats(tripsPayloadHttp.value);
      tripStats.value = response;
    } catch (error) {
      console.error('Error fetching trip status:', error);
    } finally {
      endTripStatsLoader();
    }
  };

  return {
    // States
    currentPage,
    trips,
    tripsLoader,
    tripsTotal,
    tripStats,
    tripStatsLoader,

    // Getters
    tripsPayloadHttp,

    // Actions
    startLoader,
    endLoader,
    startTripStatsLoader,
    endTripStatsLoader,
    fetchTrips,
    fetchTripStats,
  };
});
