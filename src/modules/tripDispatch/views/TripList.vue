<script setup lang="ts">
import FleetDateRange from 'src/components/shared/FleetDateRange.vue';
import FleetTimeRange from 'src/components/shared/FleetTimeRange.vue';
import FleetChips from 'src/components/shared/chips/FleetChips.vue';
import VehiclePlate from 'src/components/shared/card/VehiclePlate.vue';
import FleetBreadcrumbs from 'src/components/shared/FleetBreadcrumbs.vue';
import FleetTable from 'src/components/shared/FleetTable.vue';
import moment from 'moment';
import { ref, computed, onMounted } from 'vue';
import { LISTING_BREADCRUMBS, TRIP_STATUS_CONFIG, TRIP_MODE_CONFIG } from '../trip.constants';
import { useTripsStore } from '../store/trips.store';
import type { TripMode, TripStatus } from '../types/trips.options';
import type { Moment } from 'moment';

interface Schedule {
  startSchedule: string;
  endSchedule: string;
  startActual: string;
  endActual: string;
}

interface EventStatus {
  status: string;
  time: string;
}

interface Activity {
  icon: string;
  eventType: string;
  subscribedService: string;
}

interface Route {
  start: string;
  end: string;
  distance: string;
  duration: string;
  stops: number;
}

interface Client {
  logo: string;
  name: string;
  phone: string;
  email: string;
}

interface Event {
  uniqueId: number;
  schedule: Schedule;
  eventStatus: EventStatus;
  activity: Activity;
  route: Route;
  assetsStatus: {
    assignedVehicle: boolean;
    assignedDriver: boolean;
    assignedVehicleIcon: string;
    assignedDriverIcon: string;
    assignedVehicleFloatingIcon: string;
    assignedDriverFloatingIcon: string;
    assignedColor: string;
    notAssignedColor: string;
    assetDetails: {
      vehicle: {
        plate: {
          plateColor: string;
          seriesCode: string;
          seriesNumber: string;
          uniqueNumber: string;
        };
        year: string;
        type: string;
        make: string;
        model: string;
        seats: number;
      };
      driver: {
        id: string;
        firstName: string;
        lastName: string;
        image: string;
        phone: string;
        email: string;
      };
    };
  };
  client: Client[];
  status: string;
}

interface EventDate {
  date: string;
  displayDate: string;
  events: Event[];
}

interface EventDetails {
  id: number;
  eventDate: EventDate;
}

interface Group {
  date: string;
  rows: { eventDetails: EventDetails }[];
}

interface FlattenedRow {
  isGroupHeader?: boolean;
  date?: string;
  eventDetails?: EventDetails;
}

interface QTableColumn {
  name: string;
  label: string;
  field: string | ((row: FlattenedRow) => unknown);
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, rowA: FlattenedRow, rowB: FlattenedRow) => number;
  headerClasses?: string;
}

const store = useTripsStore();

const eventStatus = ref('all');
const selectedEvents = ref<number[]>([]);
const selectAll = ref(false);
const selectedVehicleEvent = ref<Event | null>(null);
const selectedDriverEvent = ref<Event | null>(null);
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
const activeMoreMenu = ref<number | null>(null);
// Filter Drawer
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

const showVehicleDetails = (event: Event) => {
  selectedVehicleEvent.value = event;
};

const showDriverDetails = (event: Event) => {
  selectedDriverEvent.value = event;
};

const rows = [
  {
    eventDetails: {
      id: 1,
      eventDate: {
        date: '2025-06-10',
        displayDate: 'Today Tue - Jun 10, 2025',
        events: [
          {
            uniqueId: 1,
            schedule: {
              startSchedule: '7:30 AM',
              endSchedule: '8:15 AM',
              startActual: '7:45 AM',
              endActual: '8:30 AM',
            },
            eventStatus: {
              status: 'Upcoming',
              time: '7 M',
            },
            activity: {
              icon: 'hugeicons:delivery-truck-02',
              eventType: 'Oneway',
              subscribedService: 'Gas Delivery',
            },
            route: {
              start: 'Yas Island Zone B - C67-04 - Abu Dhabi, UAE',
              end: 'Zone 1 - C67-04 - Saadiyat Island',
              distance: '103.5 km',
              duration: '1 H 43 M',
              stops: 3,
            },
            assetsStatus: {
              assignedVehicle: true,
              assignedDriver: true,
              assignedVehicleIcon: 'hugeicons:car-05',
              assignedDriverIcon: 'healthicons:truck-driver-outline',
              assignedVehicleFloatingIcon: 'hugeicons:tick-01',
              assignedDriverFloatingIcon: 'hugeicons:tick-01',
              assignedColor: 'positive',
              notAssignedColor: 'negative',
              assetDetails: {
                vehicle: {
                  plate: {
                    plateColor: '#D92D20',
                    seriesCode: 'AD',
                    seriesNumber: '10',
                    uniqueNumber: '38475',
                  },
                  year: '2020',
                  type: 'Truck',
                  make: 'MAN',
                  model: 'CX-5',
                  seats: 2,
                },
                driver: {
                  firstName: 'Jane',
                  lastName: 'Smith',
                  id: '#7G76F9',
                  phone: '+971 50 123 4568',
                  email: 'jane.smith@example.com',
                  image: 'https://i.pravatar.cc/150?img=52',
                },
              },
            },
            client: [
              {
                logo: 'assets/clients/logo-a.svg',
                name: 'Al Noor Innovations FZE',
                phone: '+971 50 123 4567',
                email: 'b@example.com',
                clientType: 'Group',
                totalPax: 10,
                totalPaxIcon: 'hugeicons:user-01',
                malePax: 5,
                malePaxIcon: 'hugeicons:user-01',
                femalePax: 5,
                femalePaxIcon: 'hugeicons:user-01',
                disabledPax: 0,
                disabledPaxIcon: 'hugeicons:user-01',
              },
            ],
            status: 'Approved',
          },
        ],
      },
    },
  },
];

// Step 1: Group and Flatten
const groupedRows = computed(() => {
  const groups: Group[] = [];

  for (const row of rows) {
    const date = row.eventDetails.eventDate.displayDate;
    const group = groups.find(g => g.date === date);

    if (!group) {
      groups.push({ date, rows: [row] });
    } else {
      group.rows.push(row);
    }
  }

  const flattened: FlattenedRow[] = [];
  groups.forEach(group => {
    flattened.push({ isGroupHeader: true, date: group.date });
    group.rows.forEach(r => flattened.push(r));
  });

  return flattened;
});

// Step 2: Select All Handler
const handleSelectAll = (newSelected: readonly number[]) => {
  selectedEvents.value = [...newSelected];
  selectAll.value = newSelected.length === rows.length;
};

const tableColumns: QTableColumn[] = [
  {
    name: 'select',
    label: '',
    field: 'select',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'schedule-actual',
    label: 'Schedule / Actual',
    field: 'scheduleActual',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'trip-status',
    label: 'Event Status',
    field: 'eventStatus',
    align: 'left',
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'activity',
    label: 'Activity',
    field: 'activity',
    align: 'left',
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'route',
    label: 'Route',
    field: 'route',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'assetsStatus',
    label: 'Assets Status',
    field: 'assetsStatus',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'client',
    label: 'Client',
    field: 'client',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'status',
    label: 'Approval Status',
    field: 'status',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
];

const columns: QTableColumn[] = [
  {
    name: 'select',
    label: '',
    field: 'select',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'scheduleActual',
    label: 'Schedule / Actual',
    field: 'scheduleActual',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'eventStatus',
    label: 'Event Status',
    field: 'eventStatus',
    align: 'left',
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'activity',
    label: 'Activity',
    field: 'activity',
    align: 'left',
    sortable: true,
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'route',
    label: 'Route',
    field: 'route',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'assetsStatus',
    label: 'Assets Status',
    field: 'assetsStatus',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'client',
    label: 'Client',
    field: 'client',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'status',
    label: 'Approval Status',
    field: 'status',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'left',
    headerClasses: 'bg-grey-2',
  },
];

const formatDuration = (start: string | Moment, end: string | Moment = '') => {
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
    <div class="row flex justify-between items-center q-mb-md">
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
      <div class="col-12 bg-white rounded-borders q-pa-md">
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
                  :text="(store.tripStats[status.name] ?? 0).toLocaleString()"
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

        <FleetTable :columns="tableColumns" :rows="store.trips">
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
                  <span class="q-ml-sm text-caption">{{ row.timing.start_at }}</span>
                </div>
                <div class="text-grey-5 text-center">—————</div>
                <div class="row items-center">
                  <IconifyIcon
                    icon="hugeicons:clock-01"
                    width="16px"
                    height="16px"
                    class="text-grey-7"
                  />
                  <span class="q-ml-sm text-caption">{{ row.timing.end_at }}</span>
                </div>
              </div>
            </div>
          </template>

          <template #cell-trip-status="{ row }">
            <FleetChips
              class="full-width text-weight-medium"
              :text="getStatusDisplay(row)"
              :color="getStatusColor(row.status)"
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
                    {{ getTripMode(row.event_association.standardshuttle_type) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </FleetTable>

        <q-table
          v-model:selected="selectedEvents"
          flat
          bordered
          row-key="eventDetails?.id"
          :columns="columns"
          :rows="groupedRows"
          :pagination="{ rowsPerPage: 7 }"
          :rows-per-page-options="[5, 7, 10]"
          @update:selected="handleSelectAll"
        >
          <template v-slot:body="props">
            <tr v-if="props.row.isGroupHeader">
              <td
                :colspan="columns.length"
                class="bg-grey-1 text-body2 text-primary text-weight-bold"
              >
                {{ props.row.date }}
              </td>
            </tr>
            <template v-else>
              <tr v-for="(event, index) in props.row.eventDetails.eventDate.events" :key="index">
                <td>
                  <q-checkbox v-model="selectedEvents" :val="event.uniqueId" dense />
                </td>
                <td>
                  <div class="row items-start q-gutter-x-sm flex items-center full-height">
                    <div class="column gt-md">
                      <IconifyIcon
                        :icon="event.activity.icon"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </div>
                    <div class="column">
                      <div class="row items-center">
                        <span class="text-caption">{{ event.activity.subscribedService }}</span>
                      </div>
                      <div class="row items-center">
                        <span class="text-caption">{{ event.activity.eventType }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="column">
                    <div class="row items-center q-mb-sm">
                      <IconifyIcon
                        icon="hugeicons:play"
                        width="16px"
                        height="16px"
                        class="text-grey-7 gt-md"
                      />
                      <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px">{{
                        event.route.start
                      }}</span>
                      <q-tooltip>{{ event.route.start }}</q-tooltip>
                    </div>
                    <q-chip dense class="bg-blue-1 text-blue" square>
                      {{ event.route.stops }} Stops • {{ event.route.distance }} •
                      {{ event.route.duration }}
                    </q-chip>
                    <div class="row items-center q-mt-sm">
                      <IconifyIcon
                        icon="hugeicons:stop"
                        width="16px"
                        height="16px"
                        class="text-grey-7 gt-md"
                      />
                      <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px">{{
                        event.route.end
                      }}</span>
                      <q-tooltip>{{ event.route.end }}</q-tooltip>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row items-center q-gutter-x-sm">
                    <div>
                      <q-btn
                        outline
                        round
                        dense
                        :color="
                          event.assetsStatus.assignedVehicle
                            ? event.assetsStatus.assignedColor
                            : event.assetsStatus.notAssignedColor
                        "
                        @click="showVehicleDetails(event)"
                        :disable="!event.assetsStatus.assignedVehicle"
                      >
                        <IconifyIcon
                          :icon="event.assetsStatus.assignedVehicleIcon"
                          width="24px"
                          height="24px"
                        />
                        <q-badge
                          floating
                          rounded
                          :color="
                            event.assetsStatus.assignedVehicle
                              ? event.assetsStatus.assignedColor
                              : event.assetsStatus.notAssignedColor
                          "
                          text-color="white"
                          class="q-ml-sm"
                        >
                          <IconifyIcon
                            :icon="
                              event.assetsStatus.assignedVehicle
                                ? 'hugeicons:tick-01'
                                : 'hugeicons:cancel-01'
                            "
                            width="12px"
                            height="12px"
                          />
                        </q-badge>
                        <q-tooltip
                          >Vehicle
                          {{
                            event.assetsStatus.assignedVehicle ? 'Assigned' : 'Not Assigned'
                          }}</q-tooltip
                        >
                      </q-btn>
                    </div>
                    <div>
                      <q-btn
                        outline
                        round
                        dense
                        :color="
                          event.assetsStatus.assignedDriver
                            ? event.assetsStatus.assignedColor
                            : event.assetsStatus.notAssignedColor
                        "
                        @click="showDriverDetails(event)"
                        :disable="!event.assetsStatus.assignedDriver"
                      >
                        <IconifyIcon
                          :icon="event.assetsStatus.assignedDriverIcon"
                          width="24px"
                          height="24px"
                        />
                        <q-badge
                          floating
                          rounded
                          :color="
                            event.assetsStatus.assignedDriver
                              ? event.assetsStatus.assignedColor
                              : event.assetsStatus.notAssignedColor
                          "
                          text-color="white"
                          class="q-ml-sm"
                        >
                          <IconifyIcon
                            :icon="
                              event.assetsStatus.assignedDriver
                                ? 'hugeicons:tick-01'
                                : 'hugeicons:cancel-01'
                            "
                            width="12px"
                            height="12px"
                          />
                        </q-badge>
                        <q-tooltip
                          >Driver
                          {{
                            event.assetsStatus.assignedDriver ? 'Assigned' : 'Not Assigned'
                          }}</q-tooltip
                        >
                      </q-btn>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="row items-center q-gutter-x-sm">
                    <q-btn flat round dense>
                      <q-avatar size="24px">
                        <img :src="event.client[0].logo" />
                      </q-avatar>
                      <q-tooltip>{{ event.client[0].name }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="event.client.length > 1"
                      round
                      dense
                      flat
                      class="bg-grey-3 text-grey-9"
                    >
                      +{{ event.client.length - 1 }}
                      <q-tooltip> {{ event.client.length - 1 }} more client(s) </q-tooltip>
                    </q-btn>
                  </div>
                </td>
                <td>
                  <div
                    class="text-body2 text-weight-medium q-pl-sm"
                    :class="{
                      'text-positive': event.status === 'Approved',
                      'text-warning': event.status === 'Pending',
                      'text-negative': event.status === 'Declined',
                    }"
                  >
                    {{ event.status }}
                  </div>
                </td>
                <td>
                  <q-btn flat round @click="activeMoreMenu = event.uniqueId">
                    <IconifyIcon
                      icon="hugeicons:more-vertical-circle-01"
                      width="24px"
                      height="24px"
                      class="text-grey-7"
                    />
                  </q-btn>
                  <q-menu
                    :model-value="activeMoreMenu === event.uniqueId"
                    @update:model-value="val => (activeMoreMenu = val ? event.uniqueId : null)"
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
                          <q-item-label caption>View the details of this event</q-item-label>
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
                          <q-item-label>Edit Event</q-item-label>
                          <q-item-label caption>Modify event details</q-item-label>
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
                          <q-item-label>Clone Event</q-item-label>
                          <q-item-label caption>Create a copy of this event</q-item-label>
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
                          <q-item-label>Cancel Event</q-item-label>
                          <q-item-label caption>Cancel this event</q-item-label>
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
                          <q-item-label>Delete Event</q-item-label>
                          <q-item-label caption>Remove this event permanently</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </td>
              </tr>
            </template>
          </template>
        </q-table>

        <q-dialog v-model="showDialog" backdrop-filter="blur(2px)">
          <q-card style="width: 500px; max-width: 80vw">
            <q-bar class="bg-primary text-white">
              <div class="row items-center text-weight-medium">Asset Details</div>
              <q-space />
              <q-btn flat dense icon="close" @click="selectedVehicleEvent = null" />
            </q-bar>
            <q-card-section v-if="selectedVehicleEvent">
              <div class="text-subtitle2 text-grey-7">Primary Vehicle</div>
              <div class="q-mt-sm row items-center justify-between q-gutter-x-md">
                <div>
                  <VehiclePlate
                    :plateColor="
                      selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.plateColor
                    "
                    :seriesCode="
                      selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.seriesCode
                    "
                    :seriesNumber="
                      selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.seriesNumber
                    "
                    :uniqueNumber="
                      selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.uniqueNumber
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
                      {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.year }}
                      <q-chip class="text-grey-9 text-caption text-weight-medium">
                        {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.type }}
                      </q-chip>
                    </q-badge>
                  </div>
                  <div class="text-caption text-weight-medium q-pl-sm q-mt-xs">
                    {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.make }},
                    {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.model }}
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
                        {{
                          selectedVehicleEvent.assetsStatus.assetDetails.vehicle.seats
                        }} </q-avatar
                      >Seats
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
            <q-card-section v-if="selectedDriverEvent">
              <div class="text-subtitle2 text-grey-7">Primary Driver</div>
              <div class="q-mt-sm row items-center justify-between q-gutter-x-md">
                <div class="row items-center">
                  <q-avatar size="40px" color="primary" text-color="white">
                    <img :src="selectedDriverEvent.assetsStatus.assetDetails.driver.image" />
                  </q-avatar>
                  <div class="column">
                    <div class="text-body2 text-weight-medium q-pl-sm">
                      {{ selectedDriverEvent.assetsStatus.assetDetails.driver.firstName }}
                      {{ selectedDriverEvent.assetsStatus.assetDetails.driver.lastName }}
                    </div>
                    <div class="row items-center q-pl-sm">
                      <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                        {{ selectedDriverEvent.assetsStatus.assetDetails.driver.id }}
                      </q-chip>
                      <q-chip
                        dense
                        rounded
                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                        class="q-mr-sm bg-white"
                      >
                        <IconifyIcon
                          icon="hugeicons:call"
                          width="16px"
                          height="16px"
                          class="text-grey-8"
                        />
                        <q-tooltip>{{
                          selectedDriverEvent.assetsStatus.assetDetails.driver.phone
                        }}</q-tooltip>
                      </q-chip>
                      <q-chip
                        dense
                        rounded
                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                        class="q-mr-sm bg-white"
                      >
                        <IconifyIcon
                          icon="hugeicons:mail-01"
                          width="16px"
                          height="16px"
                          class="text-grey-8"
                        />
                        <q-tooltip>{{
                          selectedDriverEvent.assetsStatus.assetDetails.driver.email
                        }}</q-tooltip>
                      </q-chip>
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="column">
                    <div class="text-caption text-grey-7">HOS Remaining Hrs</div>
                    <div class="text-body2 text-weight-medium text-grey-9">
                      3 H 17 M <br />
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="column">
                    <div class="text-caption text-grey-7 ellipsis">Position & Level</div>
                    <div class="text-body2 text-weight-medium text-grey-9 ellipsis">
                      Intermediate driver <br />
                      Level 2
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
