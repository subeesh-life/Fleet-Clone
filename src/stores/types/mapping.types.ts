export interface OptionItem {
  id: number | string;
  name: string;
  [key: string]: any;
}

export interface AssetType {
  asset_type_id: number;
  asset_type_name: string;
}

export interface AssetCategory {
  category_id: number;
  category_name: string;
  asset_types: AssetType[];
}

export interface AssetName {
  asset_name_id: number;
  asset_name: string;
  categories: AssetCategory[];
  usage_modes?: UsageMode[];
}

export interface EventType {
  event_type_id: number;
  event_type_name: string;
  usage_mode_id?: number;
  usage_mode_name?: string;
}

export interface UsageMode {
  usage_mode_id: number;
  usage_mode_name: string;
  event_types?: EventType[];
}

export interface Service {
  service_id: number;
  service_name: string;
  asset_names: AssetName[];
  business_category_id?: number;
  business_category_name?: string;
}

export interface TransportCategory {
  transport_category_id: number;
  transport_category_name: string;
  services: Service[];
}

export interface TransferableType {
  id: number;
  name: string;
  [key: string]: any;
}

export interface MappingState {
  assetsMapping: TransportCategory[];
  eventsMapping: TransportCategory[];
  serviceId: number | null;
  eventId: number | null;
  assetNameId: number | null;
  assetCategoryId: number | null;
  assetTypeId: number | null;
  business_category_id: number | null;
  business_category_name: string | null;
  transferableTypeOptions: TransferableType[];
  usageModeId: number | null;
}

export interface ServiceOption extends OptionItem {
  business_category_id?: number;
  business_category_name?: string;
}

export interface EventOption extends OptionItem {
  usage_mode_id?: number;
  usage_mode_name?: string;
}

export interface MappingResponse {
  data?: {
    transport_categories: TransportCategory[];
  };
}

export interface TransferableTypesResponse {
  data: TransferableType[];
}