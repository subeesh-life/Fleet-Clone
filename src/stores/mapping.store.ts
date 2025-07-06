import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';
import { httpService } from 'src/helpers/httpService';
import type {
  MappingState,
  TransportCategory,
  Service,
  OptionItem,
  ServiceOption,
  EventOption,
  TransferableType,
  MappingResponse,
  TransferableTypesResponse
} from './types/mapping.types';

// Utility functions
export const createOptionsMapper = (
  items: any[],
  valueKey = 'id',
  labelKey = 'name',
  extraKeys: string[] = []
): OptionItem[] => {
  return items.map(item => {
    const option: OptionItem = {
      id: item[valueKey],
      name: item[labelKey],
    };

    extraKeys.forEach(key => {
      if (item[key] !== undefined) {
        option[key] = item[key];
      }
    });

    return option;
  });
};

export const flattenCategories = (mapping: TransportCategory[]): Service[] => {
  return mapping.reduce((services: Service[], category) => {
    const {
      transport_category_id: business_category_id,
      transport_category_name: business_category_name,
    } = category;

    const enrichedServices = category.services.map(service => ({
      ...service,
      business_category_id,
      business_category_name
    }));
    return [...services, ...enrichedServices];
  }, []);
};

export const findServiceById = (mapping: TransportCategory[], serviceId: number): Service | undefined => {
  return flattenCategories(mapping).find(service =>
    service.service_id === serviceId
  );
};

const initState = (): MappingState => ({
  assetsMapping: [],
  eventsMapping: [],
  serviceId: null,
  eventId: null,
  assetNameId: null,
  assetCategoryId: null,
  assetTypeId: null,
  business_category_id: null,
  business_category_name: null,
  transferableTypeOptions: [],
  usageModeId: null,
});

export const useMappingStore = defineStore('mapping', () => {
  // State
  const state = ref<MappingState>(initState());

  // Getters
  const serviceId = computed(() => state.value.serviceId);
  const eventId = computed(() => state.value.eventId);
  const assetNameId = computed(() => state.value.assetNameId);
  const assetCategoryId = computed(() => state.value.assetCategoryId);
  const assetTypeId = computed(() => state.value.assetTypeId);
  const businessCategoryOptions = computed(() => state.value.assetsMapping);
  const transferableTypeOptions = computed(() => state.value.transferableTypeOptions);
  const usageModeId = computed(() => state.value.usageModeId);

  const serviceOptions = computed((): ServiceOption[] => {
    const services = flattenCategories(state.value.assetsMapping);
    return createOptionsMapper(
      services,
      'service_id',
      'service_name',
      ['business_category_id', 'business_category_name']
    ) as ServiceOption[];
  });

  const eventOptions = computed((): EventOption[] => {
    if (!state.value.serviceId) return [];

    const service = findServiceById(state.value.eventsMapping, state.value.serviceId);
    if (!service?.asset_names?.[0]?.usage_modes) return [];

    // Get selected usage mode
    const selectedUsageModeId = state.value.usageModeId;

    // If no usage mode is selected, return empty array
    if (!selectedUsageModeId) return [];

    // Find the specific usage mode
    const selectedUsageMode = service.asset_names[0].usage_modes.find(
      mode => mode.usage_mode_id === selectedUsageModeId
    );

    if (!selectedUsageMode) return [];

    // Return event types only from the selected usage mode
    const events = (selectedUsageMode.event_types || []).map(event => ({
      ...event,
      usage_mode_id: selectedUsageMode.usage_mode_id,
      usage_mode_name: selectedUsageMode.usage_mode_name
    }));

    return createOptionsMapper(
      events, 
      'event_type_id', 
      'event_type_name', 
      ['usage_mode_id', 'usage_mode_name']
    ) as EventOption[];
  });

  const usageModeOptions = computed((): OptionItem[] => {
    if (!state.value.serviceId) return [];

    const service = findServiceById(state.value.eventsMapping, state.value.serviceId);
    if (!service?.asset_names?.[0]?.usage_modes) return [];

    return createOptionsMapper(
      service.asset_names[0].usage_modes, 
      'usage_mode_id', 
      'usage_mode_name'
    );
  });

  const assetNameOptions = computed((): OptionItem[] => {
    if (!state.value.serviceId) return [];

    const service = findServiceById(state.value.assetsMapping, state.value.serviceId);
    if (!service?.asset_names) return [];

    return createOptionsMapper(service.asset_names, 'asset_name_id', 'asset_name');
  });

  const assetCategoryOptions = computed(() => (assetNameId?: number): OptionItem[] => {
    const targetAssetNameId = assetNameId || state.value.assetNameId;
    if (!state.value.serviceId || !targetAssetNameId) return [];

    const service = findServiceById(state.value.assetsMapping, state.value.serviceId);
    const assetName = service?.asset_names?.find(asset =>
      asset.asset_name_id === targetAssetNameId
    );

    if (!assetName?.categories) return [];

    return createOptionsMapper(assetName.categories, 'category_id', 'category_name');
  });

  const assetTypeOptions = computed(() => (assetCategoryId?: number): OptionItem[] => {
    const targetAssetCategoryId = assetCategoryId || state.value.assetCategoryId;
    if (!state.value.serviceId || !state.value.assetNameId || !targetAssetCategoryId) return [];

    const service = findServiceById(state.value.assetsMapping, state.value.serviceId);
    const assetName = service?.asset_names?.find(asset =>
      asset.asset_name_id === state.value.assetNameId
    );
    const category = assetName?.categories?.find(cat =>
      cat.category_id === targetAssetCategoryId
    );
    if (!category?.asset_types) return [];

    return createOptionsMapper(category.asset_types, 'asset_type_id', 'asset_type_name');
  });

  // Config getters
  const serviceConfig = computed(() => {
    return serviceOptions.value.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string | number, ServiceOption>);
  });

  const eventConfig = computed(() => {
    return eventOptions.value.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string | number, EventOption>);
  });

  const assetNameConfig = computed(() => {
    return assetNameOptions.value.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string | number, OptionItem>);
  });

  const assetCategoryConfig = computed(() => {
    return assetCategoryOptions.value(state.value.assetNameId || undefined).reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string | number, OptionItem>);
  });

  const assetTypeConfig = computed(() => {
    return assetTypeOptions.value(state.value.assetCategoryId || undefined).reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<string | number, OptionItem>);
  });

  // Current item getters
  const currentService = computed(() => {
    return state.value.serviceId ? serviceConfig.value[state.value.serviceId] ?? {} : {};
  });

  const currentEvent = computed(() => {
    return state.value.eventId ? eventConfig.value[state.value.eventId] ?? {} : {};
  });

  const currentAssetName = computed(() => {
    return state.value.assetNameId ? assetNameConfig.value[state.value.assetNameId] ?? {} : {};
  });

  const currentAssetCategory = computed(() => {
    return state.value.assetCategoryId ? assetCategoryConfig.value[state.value.assetCategoryId] ?? {} : {};
  });

  const currentAssetType = computed(() => {
    return state.value.assetTypeId ? assetTypeConfig.value[state.value.assetTypeId] ?? {} : {};
  });

  const currentUsageMode = computed(() => {
    if (!state.value.usageModeId) return {};
    return usageModeOptions.value.find(mode => mode.id === state.value.usageModeId) ?? {};
  });

  // Actions
  const resetState = () => {
    state.value = initState();
  };

  const setAssetsMapping = (payload: TransportCategory[]) => {
    state.value.assetsMapping = payload;
  };

  const setEventsMapping = (payload: TransportCategory[]) => {
    state.value.eventsMapping = payload;
  };

  const setServiceId = (payload: { id: number; business_category_id?: number; business_category_name?: string }) => {
    state.value.serviceId = payload.id;
    state.value.eventId = null;
    state.value.assetNameId = null;
    state.value.assetCategoryId = null;
    state.value.assetTypeId = null;
    state.value.usageModeId = null;
    state.value.business_category_id = payload.business_category_id || null;
    state.value.business_category_name = payload.business_category_name || null;
  };

  const setEventId = (payload: number) => {
    state.value.eventId = payload;
    if (payload && state.value.serviceId) {
      const service = findServiceById(state.value.eventsMapping, state.value.serviceId);
      const assetName = service?.asset_names?.find(asset =>
        asset.usage_modes?.some(mode =>
          mode.event_types?.some(event => event.event_type_id === payload)
        )
      );
      if (assetName) {
        state.value.assetNameId = assetName.asset_name_id;
      }
    }
  };

  const setAssetNameId = (payload: number) => {
    state.value.assetNameId = payload;
    state.value.assetCategoryId = null;
    state.value.assetTypeId = null;
  };

  const setAssetCategoryId = (payload: number) => {
    state.value.assetCategoryId = payload;
    state.value.assetTypeId = null;
  };

  const setAssetTypeId = (payload: number) => {
    state.value.assetTypeId = payload;
  };

  const setUsageModeId = (payload: number) => {
    state.value.usageModeId = payload;
  };

  const setTransferableTypeOptions = (options: TransferableType[]) => {
    state.value.transferableTypeOptions = options ?? [];
  };

  const fetchData = async () => {
    try {
      const [assetsResponse, eventsResponse] = await Promise.all([
        httpService.get<MappingResponse>('tpc-settings/preset/asset-type-mapping'),
        httpService.get<MappingResponse>('tpc-settings/preset/event-type-mapping')
      ]);

      setAssetsMapping(assetsResponse.data?.transport_categories ?? []);
      setEventsMapping(eventsResponse.data?.transport_categories ?? []);
    } catch (error) {
      console.error('Error fetching mapping data:', error);
      throw error;
    }
  };

  const fetchTransferableTypes = async () => {
    try {
      const currentServiceId = state.value.serviceId;

      if (!currentServiceId) return;

      const response = await httpService.post<TransferableTypesResponse>(
        '/sa-transportation-fee-manager/transferable_types-by-service_types-ids',
        { service_type_ids: currentServiceId ? [currentServiceId] : undefined }
      );

      setTransferableTypeOptions(response.data ?? []);
    } catch (error) {
      console.error('Error fetching transferable types:', error);
    }
  };

  return {
    // State
    state,
    
    // Getters
    serviceId,
    eventId,
    assetNameId,
    assetCategoryId,
    assetTypeId,
    businessCategoryOptions,
    transferableTypeOptions,
    usageModeId,
    serviceOptions,
    eventOptions,
    usageModeOptions,
    assetNameOptions,
    assetCategoryOptions,
    assetTypeOptions,
    serviceConfig,
    eventConfig,
    assetNameConfig,
    assetCategoryConfig,
    assetTypeConfig,
    currentService,
    currentEvent,
    currentAssetName,
    currentAssetCategory,
    currentAssetType,
    currentUsageMode,
    
    // Actions
    resetState,
    setAssetsMapping,
    setEventsMapping,
    setServiceId,
    setEventId,
    setAssetNameId,
    setAssetCategoryId,
    setAssetTypeId,
    setUsageModeId,
    setTransferableTypeOptions,
    fetchData,
    fetchTransferableTypes,
  };
});

export type MappingStore = ReturnType<typeof useMappingStore>;

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMappingStore, import.meta.hot));
}