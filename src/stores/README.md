# Asset Mapping Store Usage

This store provides a centralized way to manage asset and service mappings throughout the application.

## Usage Example

```typescript
import { useAssetMappingStore } from 'src/stores/asset-mapping.store';

// In a component
export default defineComponent({
  setup() {
    const assetMappingStore = useAssetMappingStore();
    
    // Fetch initial data
    onMounted(async () => {
      await assetMappingStore.fetchData();
    });
    
    // Get service options
    const serviceOptions = computed(() => assetMappingStore.serviceOptions);
    
    // Set selected service
    const setService = (service) => {
      assetMappingStore.setServiceId({
        id: service.id,
        business_category_id: service.business_category_id,
        business_category_name: service.business_category_name
      });
    };
    
    // Get asset name options (dependent on selected service)
    const assetNameOptions = computed(() => assetMappingStore.assetNameOptions);
    
    // Get current service info
    const currentService = computed(() => assetMappingStore.currentService);
    
    return {
      serviceOptions,
      assetNameOptions,
      currentService,
      setService,
      setAssetNameId: assetMappingStore.setAssetNameId,
      setAssetCategoryId: assetMappingStore.setAssetCategoryId,
      setAssetTypeId: assetMappingStore.setAssetTypeId,
    };
  }
});
```

## Key Features

- **Hierarchical Dependencies**: Service → Asset Name → Asset Category → Asset Type
- **Options Generation**: Automatically creates option arrays for dropdowns
- **Current Item Tracking**: Access currently selected items with computed properties
- **Utility Functions**: Helper functions for mapping and finding services
- **Type Safety**: Full TypeScript support with comprehensive types

## Store Methods

### Data Fetching
- `fetchData()` - Loads assets and events mapping
- `fetchTransferableTypes()` - Loads transferable types for selected service

### Setters
- `setServiceId(payload)` - Sets service and resets dependent fields
- `setEventId(id)` - Sets event ID
- `setAssetNameId(id)` - Sets asset name and resets dependent fields
- `setAssetCategoryId(id)` - Sets asset category and resets asset type
- `setAssetTypeId(id)` - Sets asset type
- `setUsageModeId(id)` - Sets usage mode

### Getters
- `serviceOptions` - All available services as options
- `eventOptions` - Events for selected service/usage mode
- `assetNameOptions` - Asset names for selected service
- `assetCategoryOptions(assetNameId?)` - Asset categories for asset name
- `assetTypeOptions(assetCategoryId?)` - Asset types for category
- `currentService` - Currently selected service object
- `currentEvent` - Currently selected event object
- And more...

## Utility Functions

```typescript
import { createOptionsMapper, flattenCategories, findServiceById } from 'src/stores/asset-mapping.store';

// Map any array to option format
const options = createOptionsMapper(items, 'id', 'name', ['extra_field']);

// Flatten nested category structure
const services = flattenCategories(transportCategories);

// Find specific service
const service = findServiceById(transportCategories, serviceId);
```