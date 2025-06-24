import moment from 'moment';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { tripApi } from '../api/trip.api';
import { useApi, useApiList } from 'src/composables/useApi';
import type { TripStatsResponse } from '../types/trip-api.types';
import { TripStatus } from '../types/trip-config.types';

export const useTripsStore = defineStore('trips', () => {
  /*
   ** States - using refs for reactive state
   */
  const currentPage = ref(1);
  
  // Combined date and time range state
  const dateTimeRange = ref({
    dateRange: {
      from: new Date().toISOString().split('T')[0] || '',
      to: new Date().toISOString().split('T')[0] || '',
    },
    timeRange: {
      min: 0, // 12:00 AM
      max: 23.983, // 11:59 PM
    },
  });

  // Trip status selection state
  const selectedTripStatuses = ref<TripStatus[]>([]);

  // Current active status filter (for tab selection)
  const activeStatusFilter = ref<TripStatus>(TripStatus.ALL);

  // Search state
  const searchAttribute = ref<string>('');
  const searchTerms = ref<string[]>([]);

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
    const { hours, minutes } = decimalToHoursMinutes(dateTimeRange.value.timeRange.min);
    return moment.utc(`${dateTimeRange.value.dateRange.from} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`);
  });
  
  const endAt = computed(() => {
    const { hours, minutes } = decimalToHoursMinutes(dateTimeRange.value.timeRange.max);
    return moment.utc(`${dateTimeRange.value.dateRange.to} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:59`);
  });
  
  const tripsPayloadHttp = computed(() => {
    const payload: Record<string, any> = {
      started_at: startAt.value,
      ended_at: endAt.value,
      page: currentPage.value,
      limit: import.meta.env.VITE_PAGINATION_LIMIT || 10,
    };

    // Add trip_statuses if any are selected
    if (selectedTripStatuses.value.length > 0) {
      payload.trip_statuses = selectedTripStatuses.value;
    }

    // Add search parameters if search is active
    if (searchAttribute.value && searchTerms.value.length > 0) {
      payload.search_attribute = searchAttribute.value;
      payload.search_terms = searchTerms.value;
    }

    return payload;
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

  /*
   ** Trip status management methods
   */
  const setActiveStatusFilter = (status: TripStatus): void => {
    activeStatusFilter.value = status;
    
    // Update selected trip statuses based on active filter
    if (status === TripStatus.ALL) {
      selectedTripStatuses.value = [];
    } else {
      selectedTripStatuses.value = [status];
    }
  };

  const addTripStatus = (status: TripStatus): void => {
    if (!selectedTripStatuses.value.includes(status)) {
      selectedTripStatuses.value.push(status);
    }
  };

  const removeTripStatus = (status: TripStatus): void => {
    const index = selectedTripStatuses.value.indexOf(status);
    if (index > -1) {
      selectedTripStatuses.value.splice(index, 1);
    }
  };

  const clearTripStatuses = (): void => {
    selectedTripStatuses.value = [];
    activeStatusFilter.value = TripStatus.ALL;
  };

  /*
   ** Search management methods
   */
  const setSearchParams = (attribute: string, terms: string[]): void => {
    searchAttribute.value = attribute;
    searchTerms.value = terms;
  };

  const clearSearch = (): void => {
    searchAttribute.value = '';
    searchTerms.value = [];
  };

  return {
    // States
    currentPage,
    dateTimeRange,
    selectedTripStatuses,
    activeStatusFilter,
    searchAttribute,
    searchTerms,

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
    setActiveStatusFilter,
    addTripStatus,
    removeTripStatus,
    clearTripStatuses,
    setSearchParams,
    clearSearch,
  };
});
