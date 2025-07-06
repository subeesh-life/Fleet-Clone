import type { FilterGroup } from 'src/components/shared/types/filter.types';

export const TRIP_FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'organization',
    title: 'Organization',
    filters: [
      {
        key: 'organization',
        type: 'select',
        label: 'Select Organization',
        placeholder: 'Select Organization',
        multiple: true,
        options: [
          { label: 'Abu Dhabi - Operations', value: 'organization1' },
          { label: 'Dubai - Operations', value: 'organization2' },
          { label: 'Sharjah - Operations', value: 'organization3' },
          { label: 'Ajman - Operations', value: 'organization4' },
          { label: 'Umm Al Quwain - Operations', value: 'organization5' },
          { label: 'Fujairah - Operations', value: 'organization6' },
          { label: 'Ras Al Khaimah - Operations', value: 'organization7' },
          { label: 'Al Ain - Operations', value: 'organization8' },
          { label: 'Al Dhafra - Operations', value: 'organization9' },
        ],
      },
    ],
  },
  {
    id: 'assets',
    title: 'Assets Preference',
    filters: [
      {
        key: 'assetName',
        type: 'select',
        label: 'Asset Name',
        placeholder: 'Select Asset Name',
        multiple: true,
        options: [
          { label: 'Vehicle', value: 'vehicle' },
          { label: 'Motorcycle', value: 'motorcycle' },
        ],
      },
      {
        key: 'assetCategory',
        type: 'select',
        label: 'Asset Category',
        placeholder: 'Select Asset Category',
        multiple: true,
        options: [
          { label: 'Car', value: 'car' },
          { label: 'Bus', value: 'bus' },
          { label: 'Truck', value: 'truck' },
          { label: 'Van', value: 'van' },
        ],
      },
      {
        key: 'assetType',
        type: 'select',
        label: 'Asset Type',
        placeholder: 'Select Asset Type',
        multiple: true,
        options: [
          { label: 'Coach Bus', value: 'coachBus' },
          { label: 'Medium Bus', value: 'mediumBus' },
          { label: 'Small Bus', value: 'smallBus' },
        ],
      },
      {
        key: 'usageMode',
        type: 'select',
        label: 'Usage Mode',
        placeholder: 'Select Usage Mode',
        multiple: true,
        options: [
          { label: 'Business', value: 'business' },
          { label: 'Internal', value: 'internal' },
        ],
      },
      {
        key: 'eventType',
        type: 'select',
        label: 'Event Type',
        placeholder: 'Select Event Type',
        multiple: true,
        options: [
          { label: 'Oneway', value: 'oneway' },
          { label: 'Roundtrip', value: 'roundtrip' },
          { label: 'Home to School', value: 'homeToSchool' },
          { label: 'Home to Office', value: 'homeToOffice' },
          { label: 'Office to Home', value: 'officeToHome' },
          { label: 'Office to Office', value: 'officeToOffice' },
          { label: 'Other', value: 'other' },
        ],
      },
    ],
  },
];