import { ref, computed } from 'vue';
import type { FilterGroup, FilterConfig } from 'src/components/shared/types/filter.types';

export interface UseConfigurableFiltersOptions {
  filterGroups: FilterGroup[];
  initialFilters?: Record<string, any>;
  autoApply?: boolean;
  debounceMs?: number;
}

export function useConfigurableFilters(options: UseConfigurableFiltersOptions) {
  const { filterGroups, initialFilters = {}, autoApply = false } = options;

  // State
  const filters = ref<Record<string, any>>({});
  const appliedFilters = ref<Record<string, any>>({});
  const isFilterDrawerOpen = ref(false);

  // Initialize filters with default values
  const initializeFilters = () => {
    const defaultFilters: Record<string, any> = {};

    for (const group of filterGroups) {
      for (const filter of group.filters) {
        if (filter.type === 'date-range' || filter.type === 'datetime-range') {
          defaultFilters[filter.key] = { from: null, to: null };
        } else if (filter.multiple) {
          defaultFilters[filter.key] = [];
        } else {
          defaultFilters[filter.key] = null;
        }
      }
    }

    // Override with initial filters
    Object.assign(defaultFilters, initialFilters);

    filters.value = defaultFilters;
    appliedFilters.value = { ...defaultFilters };
  };

  // Computed
  const hasActiveFilters = computed(() => {
    return Object.values(appliedFilters.value).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      }
      return value !== null && value !== undefined && value !== '';
    });
  });

  const activeFilterCount = computed(() => {
    let count = 0;
    Object.values(appliedFilters.value).forEach(value => {
      if (Array.isArray(value)) {
        if (value.length > 0) count++;
      } else if (typeof value === 'object' && value !== null) {
        if (Object.values(value).some(v => v !== null && v !== undefined && v !== '')) count++;
      } else if (value !== null && value !== undefined && value !== '') {
        count++;
      }
    });
    return count;
  });

  // Methods
  const openFilterDrawer = () => {
    isFilterDrawerOpen.value = true;
  };

  const closeFilterDrawer = () => {
    isFilterDrawerOpen.value = false;
  };

  const applyFilters = (newFilters?: Record<string, any>) => {
    if (newFilters) {
      filters.value = { ...newFilters };
    }
    appliedFilters.value = { ...filters.value };
    closeFilterDrawer();
  };

  const clearFilters = () => {
    initializeFilters();
    appliedFilters.value = { ...filters.value };
  };

  const resetFilters = () => {
    filters.value = { ...appliedFilters.value };
  };

  const updateFilter = (key: string, value: any) => {
    filters.value[key] = value;

    if (autoApply) {
      applyFilters();
    }
  };

  const getFilterValue = (key: string) => {
    return filters.value[key];
  };

  const getAppliedFilterValue = (key: string) => {
    return appliedFilters.value[key];
  };

  // Build query parameters from applied filters
  const buildQueryParams = (): Record<string, any> => {
    const params: Record<string, any> = {};

    Object.entries(appliedFilters.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Handle date ranges
        if (value.from || value.to) {
          if (value.from) params[`${key}_from`] = value.from;
          if (value.to) params[`${key}_to`] = value.to;
        }
      } else if (value !== null && value !== undefined && value !== '') {
        params[key] = value;
      }
    });

    return params;
  };

  // Format filters for API request
  const formatFiltersForAPI = (): Record<string, any> => {
    const apiFilters: Record<string, any> = {};

    Object.entries(appliedFilters.value).forEach(([key, value]) => {
      // Find the filter config
      const filterConfig = findFilterConfig(key);

      if (filterConfig?.transform) {
        value = filterConfig.transform(value);
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          apiFilters[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Handle date ranges
        if (value.from || value.to) {
          apiFilters[key] = value;
        }
      } else if (value !== null && value !== undefined && value !== '') {
        apiFilters[key] = value;
      }
    });

    return apiFilters;
  };

  const findFilterConfig = (key: string): FilterConfig | undefined => {
    for (const group of filterGroups) {
      const filter = group.filters.find(f => f.key === key);
      if (filter) return filter;
    }
    return undefined;
  };

  // Initialize
  initializeFilters();

  return {
    // State
    filters,
    appliedFilters,
    isFilterDrawerOpen,

    // Computed
    hasActiveFilters,
    activeFilterCount,

    // Methods
    openFilterDrawer,
    closeFilterDrawer,
    applyFilters,
    clearFilters,
    resetFilters,
    updateFilter,
    getFilterValue,
    getAppliedFilterValue,
    buildQueryParams,
    formatFiltersForAPI,
    findFilterConfig,
    initializeFilters,
  };
}
