import moment from 'moment';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { tripApi } from '../api/trip.api';
import { useApi, useApiList } from 'src/composables/useApi';
import type { TripStatsResponse } from '../types/trip-api.types';

export const useTripsStore = defineStore('trips', () => {
  /*
   ** States - using refs for reactive state
   */
  const currentPage = ref(1);

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
   ** API Composables
   */
  const {
    data: tripsData,
    loading: tripsLoader,
    error: tripsError,
    execute: fetchTrips,
  } = useApiList(
    (params: Record<string, any>, queryParams: Record<string, any>) =>
      tripApi.getTrips(params, queryParams),
    {
      initialValue: { list: [], total: 0 },
      onSuccess: (data) => {
        console.log(`Fetched ${data.list.length} trips successfully`);
      },
      onError: (error) => {
        console.error('Error fetching trips:', error.message);
      },
    }
  );

  const {
    data: tripStats,
    loading: tripStatsLoader,
    error: tripStatsError,
    execute: fetchTripStats,
  } = useApi(
    (params: Record<string, any>) => tripApi.getTripStats(params),
    {
      initialValue: {} as TripStatsResponse,
      onSuccess: (data) => {
        console.log('Trip stats fetched successfully:', data);
      },
      onError: (error) => {
        console.error('Error fetching trip stats:', error.message);
      },
    }
  );

  /*
   ** Computed getters for easier access
   */
  const trips = computed(() => tripsData.value?.list || []);
  const tripsTotal = computed(() => tripsData.value?.total || 0);

  /*
   ** Helper methods for API calls with current payload
   */
  const loadTrips = async (): Promise<void> => {
    const params = tripsPayloadHttp.value;
    const queryParams = {
      page: params.page,
      limit: params.limit,
    };
    await fetchTrips(params, queryParams);
  };

  const loadTripStats = async (): Promise<void> => {
    const params = tripsPayloadHttp.value;
    await fetchTripStats(params);
  };

  return {
    // States
    currentPage,

    // Data from API
    trips,
    tripsTotal,
    tripStats,

    // Loading states
    tripsLoader,
    tripStatsLoader,

    // Error states
    tripsError,
    tripStatsError,

    // Getters
    tripsPayloadHttp,

    // Actions
    fetchTrips: loadTrips,
    fetchTripStats: loadTripStats,
  };
});
