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
  
  // Date range state
  const dateRange = ref({
    from: new Date().toISOString().split('T')[0] || '',
    to: new Date().toISOString().split('T')[0] || '',
  });
  
  // Time range state (in decimal hours)
  const timeRange = ref({
    min: 0, // 12:00 AM
    max: 23.983, // 11:59 PM
  });

  /*
   ** Getters - using computed for derived state
   */
  
  // Helper function to convert decimal hours to hours and minutes
  const decimalToHoursMinutes = (decimal: number) => {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return { hours, minutes };
  };
  
  // Computed properties for start and end datetime in UTC
  const startAt = computed(() => {
    const { hours, minutes } = decimalToHoursMinutes(timeRange.value.min);
    return moment.utc(`${dateRange.value.from} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`);
  });
  
  const endAt = computed(() => {
    const { hours, minutes } = decimalToHoursMinutes(timeRange.value.max);
    return moment.utc(`${dateRange.value.to} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:59`);
  });
  
  const tripsPayloadHttp = computed(() => {
    return {
      started_at: startAt.value,
      ended_at: endAt.value,
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
      onSuccess: data => {
        console.log(`Fetched ${data.list.length} trips successfully`);
      },
      onError: error => {
        console.error('Error fetching trips:', error.message);
      },
    }
  );

  const {
    data: tripStats,
    loading: tripStatsLoader,
    error: tripStatsError,
    execute: fetchTripStats,
  } = useApi((params: Record<string, any>) => tripApi.getTripStats(params), {
    initialValue: {} as TripStatsResponse,
    onSuccess: data => {
      console.log('Trip stats fetched successfully:', data);
    },
    onError: error => {
      console.error('Error fetching trip stats:', error.message);
    },
  });

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
    dateRange,
    timeRange,

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

    // Computed getters
    startAt,
    endAt,
    tripsPayloadHttp,

    // Actions
    fetchTrips: loadTrips,
    fetchTripStats: loadTripStats,
  };
});
