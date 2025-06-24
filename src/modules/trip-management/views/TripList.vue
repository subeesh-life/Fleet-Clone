<script setup lang="ts">
import FleetDateRange from 'src/components/shared/FleetDateRange.vue';
import FleetTimeRange from 'src/components/shared/FleetTimeRange.vue';
import FleetChips from 'src/components/shared/chips/FleetChips.vue';
import VehiclePlate from 'src/components/shared/card/VehiclePlate.vue';
import FleetBreadcrumbs from 'src/components/shared/FleetBreadcrumbs.vue';
import FleetTable from 'src/components/shared/FleetTable.vue';
import FleetAvatar from 'src/components/shared/FleetAvatar.vue';
import moment from 'moment';
import { ref, computed, onMounted } from 'vue';
import { useTripsStore } from '../store/trip.store';
import { useAutoHeight } from 'src/composables/useAutoHeight';
import type { TripMode, TripStatus } from '../types/trip-config.types';
import type { TripResponse } from '../types/trip-api.types';
import type { Moment } from 'moment';
import {
  LISTING_BREADCRUMBS,
  TRIP_STATUS_CONFIG,
  TRIP_MODE_CONFIG,
} from '../constants/trip.constants';

const store = useTripsStore();

// Table height management
const tableRef = ref();
const headerRef = ref();
const tabsRef = ref();

const { height: tableHeight } = useAutoHeight({
  targetRef: tableRef,
  minHeight: 400,
  bottomOffset: 70,
});

const eventStatus = ref('all');
const selectedEvents = ref<number[]>([]);
const selectedVehicleEvent = ref<TripResponse | null>(null);
const selectedDriverEvent = ref<TripResponse | null>(null);
const searchEventsDialog = ref(false);
const searchText = ref('');
const searchEvents = ref<string[]>([
  'Event Type',
  'Event Name',
  'Event ID',
  'Vehicle ID',
  'VIN Number',
  'Asset Type',
  'Vehicle Make',
  'Vehicle Model',
  'Vehicle Year',
  'Plate Number',
]);
const selectedFilter = ref<string>('Event Type');
const activeSearchFilters = ref<{ type: string; value: string }[]>([]);
const dispatchFilterDrawer = ref(false);
const organization = ref([]);
const organizationOptions = ref([
  { label: 'Abu Dhabi - Operations', value: 'organization1' },
  { label: 'Dubai - Operations', value: 'organization2' },
  { label: 'Sharjah - Operations', value: 'organization3' },
  { label: 'Ajman - Operations', value: 'organization4' },
  { label: 'Umm Al Quwain - Operations', value: 'organization5' },
  { label: 'Fujairah - Operations', value: 'organization6' },
  { label: 'Ras Al Khaimah - Operations', value: 'organization7' },
  { label: 'Al Ain - Operations', value: 'organization8' },
  { label: 'Al Dhafra - Operations', value: 'organization9' },
]);
const assetName = ref([]);
const assetNameOptions = ref([
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Motorcycle', value: 'motorcycle' },
]);
const assetCategory = ref([]);
const assetCategoryOptions = ref([
  { label: 'Car', value: 'car' },
  { label: 'Bus', value: 'bus' },
  { label: 'Truck', value: 'truck' },
  { label: 'Van', value: 'van' },
]);
const assetType = ref([]);
const assetTypeOptions = ref([
  { label: 'Coach Bus', value: 'coachBus' },
  { label: 'Medium Bus', value: 'mediumBus' },
  { label: 'Small Bus', value: 'smallBus' },
]);
const usageMode = ref([]);
const usageModeOptions = ref([
  { label: 'Business', value: 'business' },
  { label: 'Internal', value: 'internal' },
]);
const eventType = ref([]);

const eventTypeOptions = ref([
  { label: 'Oneway', value: 'oneway' },
  { label: 'Roundtrip', value: 'roundtrip' },
  { label: 'Home to School', value: 'homeToSchool' },
  { label: 'Home to Office', value: 'homeToOffice' },
  { label: 'Office to Home', value: 'officeToHome' },
  { label: 'Office to Office', value: 'officeToOffice' },
  { label: 'Other', value: 'other' },
]);

const actionButtons = computed(() => [
  {
    icon: 'hugeicons:search-02',
    tooltip: 'Search Events',
    class: 'gt-sm',
    onClick: () => (searchEventsDialog.value = true),
  },
  {
    icon: 'hugeicons:filter',
    tooltip: 'Filter',
    onClick: () => (dispatchFilterDrawer.value = true),
  },
  {
    icon: 'hugeicons:chart-bar-line',
    tooltip: 'Statistics',
    class: 'gt-sm',
  },
  {
    icon: 'hugeicons:add-01',
    tooltip: 'Add New',
    to: { name: 'create-event' },
  },
]);

const toolbarActions = computed(() => [
  {
    name: 'threshold',
    icon: 'hugeicons:filter-horizontal',
    label: 'Threshold',
    disabled: false,
  },
  {
    name: 'clone',
    icon: 'hugeicons:flip-left',
    label: 'Clone',
    disabled: selectedEvents.value.length > 1,
    tooltip: selectedEvents.value.length > 1 ? 'You can only clone one event at a time.' : null,
  },
  {
    name: 'apply-policy',
    icon: 'hugeicons:security-check',
    label: 'Apply Policy',
    disabled: false,
  },
  {
    name: 'merge',
    icon: 'hugeicons:filter-horizontal',
    label: 'Merge',
    disabled: false,
  },
]);

const showDialog = computed({
  get: () => selectedVehicleEvent.value !== null,
  set: (value: boolean) => {
    if (!value) selectedVehicleEvent.value = null;
  },
});

const showDriverDialog = computed({
  get: () => selectedDriverEvent.value !== null,
  set: (value: boolean) => {
    if (!value) selectedDriverEvent.value = null;
  },
});

const showVehicleDetails = (trip: TripResponse) => {
  selectedVehicleEvent.value = trip;
};

const showDriverDetails = (trip: TripResponse) => {
  selectedDriverEvent.value = trip;
};

// Step 1: Group and Flatten
const tableColumns = computed(() => [
  {
    name: 'schedule-actual',
    label: 'Schedule / Actual',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'trip-status',
    label: 'Trip Status',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'activity',
    label: 'Activity',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'route',
    label: 'Route',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'asset-status',
    label: 'Assets Status',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'client',
    label: 'Client',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'id', // Use a simple field since we have custom template
    align: 'left' as const,
    headerClasses: 'bg-grey-2',
  },
]);

const formatDateTime = (dateTime: string | Moment): string => {
  return moment.utc(dateTime).local().format('hh:mm A');
};

const formatDuration = (start: number | string | Moment, end: number | string | Moment = '') => {
  const startTime = moment.utc(start).local();
  const endTime = end ? moment.utc(end).local() : moment();
  const duration = moment.duration(endTime.diff(startTime));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return 'Just now';
};

const getStatusDisplay = (item: any): string => {
  const { timing, actual, updated_at } = item;
  const now = moment();
  const startTime = timing?.start_at ? moment.utc(timing.start_at).local() : null;

  const configs: Partial<Record<TripStatus, string>> = {
    completed: `Completed in ${formatDuration(timing?.start_at, timing?.end_at)}`,
    live: `Live for ${formatDuration(actual?.started_at)}`,
    delayed: `Delayed by ${formatDuration(timing?.start_at)}`,
    missed: `Delayed by ${formatDuration(timing?.start_at)}`,
    confirmed:
      startTime && now.isBefore(startTime)
        ? `In ${formatDuration(now, timing.start_at)}`
        : `Delayed by ${formatDuration(timing?.start_at)}`,
    cancelled: `Cancelled ${formatDuration(updated_at)} ago`,
  };

  return configs[item.status as TripStatus] as string;
};

const getStatusColor = (status: TripStatus): string => {
  const statusConfig = TRIP_STATUS_CONFIG.find(s => s.name === status);
  return statusConfig ? statusConfig.color : 'grey-3';
};

const getStatusLabel = (status: TripStatus): string => {
  const statusConfig = TRIP_STATUS_CONFIG.find(s => s.name === status);
  return statusConfig ? statusConfig.label : 'Unknown';
};

const getTripMode = (mode: TripMode): string => {
  const tripModeConfig = TRIP_MODE_CONFIG[mode];
  return tripModeConfig ? tripModeConfig.label : 'Unknown';
};

const addSearchFilter = () => {
  if (searchText.value && selectedFilter.value) {
    activeSearchFilters.value.push({
      type: selectedFilter.value,
      value: searchText.value,
    });
    searchText.value = '';
  }
};

const removeSearchFilter = (index: number) => {
  activeSearchFilters.value.splice(index, 1);
};

const clearSearchFilters = () => {
  searchText.value = '';
  selectedFilter.value = '';
  activeSearchFilters.value = [];
};

onMounted((): void => {
  void store.fetchTripStats();
  void store.fetchTrips();
});
</script>

<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <!-- Action Bar / Header Bar -->
    <div ref="headerRef" class="row flex justify-between items-center q-mb-md">
      <div class="col-md-4">
        <FleetBreadcrumbs :items="LISTING_BREADCRUMBS" />
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <FleetDateRange class="gt-sm" />

        <FleetTimeRange class="gt-sm" />

        <div class="row q-gutter-x-sm">
          <q-btn
            v-for="action in actionButtons"
            :key="action.tooltip"
            push
            color="white"
            text-color="grey-9"
            round
            :class="action.class"
            :to="action.to"
            @click="action.onClick"
          >
            <q-icon>
              <IconifyIcon :icon="action.icon" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">{{ action.tooltip }}</div>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Trip Status Tabs -->
    <div class="row">
      <div ref="tabsRef" class="col-12 bg-white rounded-borders q-pa-md">
        <q-tabs
          v-model="eventStatus"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          style="border-bottom: 1px solid #e0e0e0"
        >
          <q-tab
            v-for="status in TRIP_STATUS_CONFIG"
            :key="status.name"
            :name="status.name"
            class="flex"
          >
            <template #default>
              <div class="row no-wrap items-center q-px-lg">
                {{ status.label }}
                <FleetChips
                  :text="(store.tripStats?.[status.name] ?? 0).toLocaleString()"
                  :color="status.color"
                  :iconVisibility="false"
                  class="q-ml-sm gt-sm"
                />
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>

      <div class="col-12 q-px-md bg-white q-pb-md">
        <q-card v-if="selectedEvents.length > 0" flat bordered class="q-px-xs q-mb-md full-width">
          <q-card-section class="q-pa-none">
            <div class="row">
              <div
                v-for="button in toolbarActions"
                :key="button.name"
                class="col flex items-center"
              >
                <q-btn
                  flat
                  dense
                  class="q-px-sm full-width"
                  color="primary"
                  :disabled="button.disabled"
                >
                  <IconifyIcon
                    :icon="button.icon"
                    width="24px"
                    height="24px"
                    class="text-grey-7 q-mr-sm gt-sm"
                  />
                  <span>{{ button.label }}</span>
                  <q-tooltip v-if="button.tooltip">
                    <div class="text-caption">{{ button.tooltip }}</div>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <FleetTable
          ref="tableRef"
          :columns="tableColumns"
          :rows="store.trips"
          :loading="store.tripsLoader"
          :height="tableHeight"
          selection="multiple"
          row-key="id"
        >
          <template #cell-schedule-actual="{ row }">
            <div class="row items-start q-gutter-x-sm flex items-center full-height">
              <div class="column gt-md">
                <q-badge color="secondary" text-color="white">S</q-badge>
              </div>
              <div class="column">
                <div class="row items-center">
                  <IconifyIcon
                    icon="hugeicons:clock-01"
                    width="16px"
                    height="16px"
                    class="text-grey-7"
                  />
                  <span class="q-ml-sm text-caption">
                    {{ formatDateTime(row.timing.start_at) }}
                  </span>
                </div>
                <div class="text-grey-5 text-center">—————</div>
                <div class="row items-center">
                  <IconifyIcon
                    icon="hugeicons:clock-01"
                    width="16px"
                    height="16px"
                    class="text-grey-7"
                  />
                  <span class="q-ml-sm text-caption">
                    {{ formatDateTime(row.timing.end_at) }}
                  </span>
                </div>
              </div>
            </div>
          </template>

          <template #cell-trip-status="{ row }">
            <FleetChips
              class="full-width text-weight-medium"
              :text="getStatusDisplay(row)"
              :color="getStatusColor(row.status as TripStatus)"
              :iconVisibility="false"
            />
          </template>

          <template #cell-activity="{ row }">
            <div class="row items-start q-gutter-x-sm flex items-center full-height">
              <div class="column gt-md">
                <IconifyIcon
                  icon="heroicons:truck"
                  width="24px"
                  height="24px"
                  class="text-grey-7"
                />
              </div>
              <div class="column">
                <div class="row items-center">
                  <span class="text-caption">
                    {{ row.event_association.service.service_name }}
                  </span>
                </div>
                <div class="row items-center">
                  <span class="text-caption">
                    {{ getTripMode(row.event_association.standardshuttle_type as TripMode) }}
                  </span>
                </div>
              </div>
            </div>
          </template>

          <template #cell-route="{ row }">
            <div class="column">
              <div class="row items-center q-mb-sm">
                <IconifyIcon
                  icon="hugeicons:play"
                  width="16px"
                  height="16px"
                  class="text-grey-7 gt-md"
                />
                <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px">
                  {{ row.timing.start_location.address }}
                </span>
                <q-tooltip>{{ row.timing.start_location.address }}</q-tooltip>
              </div>
              <q-chip dense class="bg-blue-1 text-blue" square>
                {{ row.timing.total_stops }} Stops • {{ row.timing.total_distance }} km •
                {{ formatDuration(row.timing.total_duration) }}
              </q-chip>
              <div class="row items-center q-mt-sm">
                <IconifyIcon
                  icon="hugeicons:stop"
                  width="16px"
                  height="16px"
                  class="text-grey-7 gt-md"
                />
                <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px">
                  {{ row.timing.end_location.address }}
                </span>
                <q-tooltip>{{ row.timing.end_location.address }}</q-tooltip>
              </div>
            </div>
          </template>

          <template #cell-asset-status="{ row }">
            <div class="row items-center q-gutter-x-sm">
              <div>
                <q-btn
                  outline
                  round
                  dense
                  :color="row.asset ? 'positive' : 'negative'"
                  @click="showVehicleDetails(row)"
                  :disable="!row.asset"
                >
                  <IconifyIcon icon="hugeicons:car-05" width="24px" height="24px" />
                  <q-badge
                    floating
                    rounded
                    :color="row.asset ? 'positive' : 'negative'"
                    text-color="white"
                    class="q-ml-sm"
                  >
                    <IconifyIcon
                      :icon="row.asset ? 'hugeicons:tick-01' : 'hugeicons:cancel-01'"
                      width="12px"
                      height="12px"
                    />
                  </q-badge>
                  <q-tooltip> Vehicle {{ row.asset?.id ? 'Assigned' : 'Not Assigned' }} </q-tooltip>
                </q-btn>
              </div>
              <div>
                <q-btn
                  outline
                  round
                  dense
                  :color="row.driver ? 'positive' : 'negative'"
                  @click="showDriverDetails(row)"
                  :disable="!row.driver"
                >
                  <IconifyIcon icon="healthicons:truck-driver-outline" width="24px" height="24px" />
                  <q-badge
                    floating
                    rounded
                    :color="row.driver ? 'positive' : 'negative'"
                    text-color="white"
                    class="q-ml-sm"
                  >
                    <IconifyIcon
                      :icon="row.driver ? 'hugeicons:tick-01' : 'hugeicons:cancel-01'"
                      width="12px"
                      height="12px"
                    />
                  </q-badge>
                  <q-tooltip> Driver {{ row.driver?.id ? 'Assigned' : 'Not Assigned' }} </q-tooltip>
                </q-btn>
              </div>
            </div>
          </template>

          <template #cell-client="{ row }">
            <div class="row items-center q-gutter-x-sm">
              <q-btn flat round dense v-if="row.timing?.list_view?.length > 0">
                <FleetAvatar
                  size="34px"
                  color="grey-3"
                  text-color="grey-7"
                  :title="row.timing.list_view?.[0]?.client?.name || 'N/A'"
                />
                <q-tooltip>{{ row.timing.list_view?.[0]?.client?.name || 'N/A' }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="row.timing.list_view?.length > 1"
                round
                dense
                flat
                class="bg-grey-3 text-grey-9"
              >
                +{{ row.timing.list_view?.length - 1 }}
                <q-tooltip>{{ row.timing.list_view?.length - 1 }} more client(s)</q-tooltip>
              </q-btn>
            </div>
          </template>

          <template #cell-status="{ row }">
            <span :class="`text-${getStatusColor(row.status as TripStatus)} text-weight-medium`">
              {{ getStatusLabel(row.status as TripStatus) }}
            </span>
          </template>

          <template #cell-actions>
            <q-btn flat round>
              <IconifyIcon
                icon="hugeicons:more-vertical-circle-01"
                width="24px"
                height="24px"
                class="text-grey-7"
              />
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                anchor="center right"
                self="top left"
                :offset="[-15, 0]"
                class="animated-menu"
              >
                <q-list style="min-width: 300px" padding>
                  <q-item clickable v-ripple :to="{ name: 'dispatch-details' }">
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:route-02"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>View Details</q-item-label>
                      <q-item-label caption>View the details of this trip</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:edit-01"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Edit Trip</q-item-label>
                      <q-item-label caption>Modify trip details</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:flip-left"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Clone Trip</q-item-label>
                      <q-item-label caption>Create a copy of this trip</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:cancel-01"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Cancel Trip</q-item-label>
                      <q-item-label caption>Cancel this trip</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item clickable v-ripple class="text-negative">
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:delete-02"
                        width="24px"
                        height="24px"
                        class="text-negative"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Delete Trip</q-item-label>
                      <q-item-label caption>Remove this trip permanently</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </FleetTable>

        <q-dialog v-model="showDialog" backdrop-filter="blur(2px)">
          <q-card style="width: 500px; max-width: 80vw">
            <q-bar class="bg-primary text-white">
              <div class="row items-center text-weight-medium">Asset Details</div>
              <q-space />
              <q-btn flat dense icon="close" @click="selectedVehicleEvent = null" />
            </q-bar>
            <q-card-section v-if="selectedVehicleEvent && selectedVehicleEvent.asset">
              <div class="text-subtitle2 text-grey-7">Primary Vehicle</div>
              <div class="q-mt-sm row items-center justify-between q-gutter-x-md">
                <div>
                  <VehiclePlate
                    :plateColor="selectedVehicleEvent.asset.vehicle_plate_color"
                    :seriesCode="selectedVehicleEvent.asset.vehicle_plate.split(' ')[0] || 'AD'"
                    :seriesNumber="selectedVehicleEvent.asset.vehicle_plate.split(' ')[1] || '10'"
                    :uniqueNumber="
                      selectedVehicleEvent.asset.vehicle_plate.split(' ')[2] || '12345'
                    "
                  />
                </div>
                <div>
                  <div class="text-caption text-weight-medium q-pl-sm">
                    <q-badge
                      transparent
                      rounded
                      class="bg-grey-3 text-grey-7 text-weight-bold text-caption"
                    >
                      {{ selectedVehicleEvent.asset.year }}
                      <q-chip class="text-grey-9 text-caption text-weight-medium">
                        {{ selectedVehicleEvent.asset.asset_type_name }}
                      </q-chip>
                    </q-badge>
                  </div>
                  <div class="text-caption text-weight-medium q-pl-sm q-mt-xs">
                    {{ selectedVehicleEvent.asset.make_name }},
                    {{ selectedVehicleEvent.asset.model_name }}
                  </div>
                </div>
                <div class="row items-center">
                  <div>
                    <IconifyIcon
                      icon="hugeicons:airplane-seat"
                      width="24px"
                      height="24px"
                      class="text-grey-7"
                    />
                  </div>
                  <div class="text-caption text-weight-medium q-pl-sm">
                    <q-chip>
                      <q-avatar size="24px" color="primary" text-color="white">
                        {{ selectedVehicleEvent.asset.seats }}
                      </q-avatar>
                      Seats
                    </q-chip>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row items-center justify-end q-gutter-x-sm">
                <q-btn
                  flat
                  label="Cancel"
                  color="grey-7"
                  class="q-mr-sm"
                  @click="selectedVehicleEvent = null"
                />
                <q-btn outline label="More Details" color="secondary" />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showDriverDialog" backdrop-filter="blur(2px)">
          <q-card style="width: 600px; max-width: 80vw">
            <q-bar class="bg-primary text-white">
              <div class="row items-center text-weight-medium">Driver Details</div>
              <q-space />
              <q-btn flat dense icon="close" @click="selectedDriverEvent = null" />
            </q-bar>
            <q-card-section v-if="selectedDriverEvent && selectedDriverEvent.driver">
              <div class="text-subtitle2 text-grey-7">Primary Driver</div>
              <div class="q-mt-sm row items-center justify-between q-gutter-x-md">
                <div class="row items-center">
                  <q-avatar size="40px" color="primary" text-color="white">
                    <span
                      >{{ selectedDriverEvent.driver.first_name[0]
                      }}{{ selectedDriverEvent.driver.last_name[0] }}</span
                    >
                  </q-avatar>
                  <div class="column">
                    <div class="text-body2 text-weight-medium q-pl-sm">
                      {{ selectedDriverEvent.driver.first_name }}
                      {{ selectedDriverEvent.driver.last_name }}
                    </div>
                    <div class="row items-center q-pl-sm">
                      <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                        #{{ selectedDriverEvent.driver.id }}
                      </q-chip>
                      <q-chip
                        dense
                        rounded
                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                        class="q-mr-sm bg-white"
                        v-if="selectedDriverEvent.driver.phone.length > 0"
                      >
                        <IconifyIcon
                          icon="hugeicons:call"
                          width="16px"
                          height="16px"
                          class="text-grey-8"
                        />
                        <q-tooltip>{{ selectedDriverEvent.driver.phone[0] }}</q-tooltip>
                      </q-chip>
                      <q-chip
                        dense
                        rounded
                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                        class="q-mr-sm bg-white"
                        v-if="selectedDriverEvent.driver.email.length > 0"
                      >
                        <IconifyIcon
                          icon="hugeicons:mail-01"
                          width="16px"
                          height="16px"
                          class="text-grey-8"
                        />
                        <q-tooltip>{{ selectedDriverEvent.driver.email[0] }}</q-tooltip>
                      </q-chip>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="column">
                    <div class="text-caption text-grey-7">Driver Status</div>
                    <div class="text-body2 text-weight-medium text-grey-9">
                      {{ selectedDriverEvent.driver.is_active_driver ? 'Active' : 'Inactive' }}
                      <br />
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="column">
                    <div class="text-caption text-grey-7 ellipsis">Gender</div>
                    <div class="text-body2 text-weight-medium text-grey-9 ellipsis">
                      {{ selectedDriverEvent.driver.gender === 1 ? 'Male' : 'Female' }} <br />
                      Primary Driver
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row items-center justify-end q-gutter-x-sm">
                <q-btn
                  flat
                  label="Cancel"
                  color="grey-7"
                  class="q-mr-sm"
                  @click="selectedDriverEvent = null"
                />
                <q-btn outline label="More Details" color="secondary" />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <!-- Card -  Search Events  -->
    <q-dialog
      v-model="searchEventsDialog"
      backdrop-filter="blur(2px)"
      transition-show="jump-down"
      transition-hide="jump-up"
      persistent
    >
      <q-card style="width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="row flex items-center">
            <div class="col-10">
              <div class="text-h6">Search Events</div>
              <div class="text-body2 text-grey-7">Find events faster with the filters below.</div>
            </div>
            <div class="col-2 flex justify-end">
              <q-btn flat dense @click="searchEventsDialog = false">
                <IconifyIcon
                  icon="hugeicons:cancel-01"
                  width="24px"
                  height="24px"
                  class="text-grey-7"
                />
              </q-btn>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="row">
            <div class="col-12 q-mr-sm">
              <q-chip
                v-for="filterTypes in searchEvents"
                :key="filterTypes"
                :selected="selectedFilter === filterTypes"
                @click="selectedFilter = selectedFilter === filterTypes ? '' : filterTypes"
                :outline="selectedFilter !== filterTypes"
                :color="selectedFilter === filterTypes ? 'primary' : 'grey-7'"
                :text-color="selectedFilter === filterTypes ? 'white' : 'grey-7'"
                :icon="selectedFilter === filterTypes ? 'check' : undefined"
                class="text-caption cursor-pointer"
              >
                {{ filterTypes }}
              </q-chip>
            </div>
            <div class="col-12 q-pt-md">
              <q-input autofocus outlined v-model="searchText" placeholder="Search for...">
                <template v-slot:prepend>
                  <IconifyIcon
                    icon="hugeicons:search-02"
                    width="24px"
                    height="24px"
                    class="text-grey-7"
                  />
                </template>
                <template v-slot:append>
                  <q-btn flat dense @click="addSearchFilter">
                    <IconifyIcon
                      icon="hugeicons:add-01"
                      width="24px"
                      height="24px"
                      class="text-grey-7"
                    />
                    <q-tooltip>Add Filter</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mt-sm" v-if="activeSearchFilters.length > 0">
              <div class="row q-gutter-x-sm q-gutter-y-sm">
                <q-badge
                  v-for="(filter, index) in activeSearchFilters"
                  :key="index"
                  color="grey-3"
                  text-color="primary"
                  class="text-caption"
                >
                  {{ filter.type }}:
                  <q-chip color="primary" text-color="white" class="text-caption">
                    {{ filter.value }}
                    <q-btn
                      flat
                      dense
                      round
                      size="xs"
                      class="q-ml-sm"
                      @click="removeSearchFilter(index)"
                    >
                      <IconifyIcon icon="hugeicons:cancel-01" width="12px" height="12px" />
                    </q-btn>
                  </q-chip>
                </q-badge>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="col-12 flex justify-end q-gutter-x-sm">
            <q-btn outline label="Clear" color="secondary" @click="clearSearchFilters" />
            <q-btn label="Search" color="primary" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Model - Filter Drawer-->
    <q-dialog
      persistent
      backdrop-filter="blur(2px)"
      v-model="dispatchFilterDrawer"
      position="right"
      :full-height="true"
    >
      <q-card class="column">
        <q-card-section class="q-pb-none">
          <div class="row items-start justify-between">
            <div>
              <div class="text-h6 text-weight-bold">Filter Dispatch</div>
              <div class="text-caption text-grey-7">
                Select the filters applicable to this dispatch
              </div>
            </div>
            <div class="row items-center q-gutter-x-xs">
              <q-btn color="primary" label="Apply" />
              <q-btn flat round dense>
                <IconifyIcon
                  icon="hugeicons:refresh"
                  width="20px"
                  height="20px"
                  class="text-grey-7"
                />
                <q-tooltip>Clear</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                icon="close"
                @click="dispatchFilterDrawer = false"
                class="text-grey-7"
              >
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </div>
          </div>
          <q-separator class="q-my-md" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-lg">
            <div class="col-12">
              <div class="text-subtitle1 text-weight-medium">Organization</div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Select Organization</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="organization"
                  :options="organizationOptions"
                  placeholder="Select Organization"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="text-subtitle1 text-weight-medium">Assets Preference</div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Name</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="assetName"
                  :options="assetNameOptions"
                  placeholder="Select Asset Name"
                />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Category</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="assetCategory"
                  :options="assetCategoryOptions"
                  placeholder="Select Asset Category"
                />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Type</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="assetType"
                  :options="assetTypeOptions"
                  placeholder="Select Asset Type"
                />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Usage Mode</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="usageMode"
                  :options="usageModeOptions"
                  placeholder="Select Usage Mode"
                />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Event Type</div>
                <q-select
                  dense
                  outlined
                  multiple
                  use-chips
                  v-model="eventType"
                  :options="eventTypeOptions"
                  placeholder="Select Event Type"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style lang="scss" scoped></style>
