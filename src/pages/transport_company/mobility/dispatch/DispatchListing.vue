<script setup lang="ts">
import { ref } from 'vue'
import DateRange from 'src/components/shared/date_range/DateRange.vue'
import TimeRange from 'src/components/shared/time_range/TimeRange.vue'
import FleetChips from 'src/components/shared/chips/FleetChips.vue'

const eventStatus = ref('all')

const columns = [
  {
    name: 'timing',
    label: 'Timing',
    field: 'timing',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'status',
    label: 'Event Status',
    field: 'status',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'activity',
    label: 'Activity',
    field: 'activityName',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'route',
    label: 'Route',
    field: 'route',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'assets',
    label: 'Assets Status',
    field: 'assets',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'client',
    label: 'Client',
    field: 'clientLogo',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'approvalStatus',
    label: 'Status',
    field: 'approvalStatus',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'actions',
    label: 'Action',
    field: 'actions',
    align: 'center' as const,
  },
]

const events = ref([
  {
    date: '2025-01-14',
    displayDate: 'Today Tue - Jan 14, 2025',
    items: [
      {
        id: 1,
        startTime: '6:05 pm',
        endTime: '7:20 pm',
        status: 'Upcoming In 10 min',
        statusColor: 'blue',
        progress: 0,
        activityIcon: 'local_shipping',
        activityName: 'Gas Delivery',
        activityType: 'Oneway',
        startLocation: 'Yas Island - Zone 1 - C67-04',
        endLocation: 'Saadiyat Island - District 2 - D8',
        stops: '7 stops',
        distance: '16 km',
        duration: '112.9 min',
        assets: [
          { id: 1, icon: 'directions_car', status: 'green' },
          { id: 2, icon: 'person', status: 'green' },
        ],
        clientLogo: 'src/assets/clients/b.svg',
        approvalStatus: 'Approved',
        statusDetail: 'Ready',
      },
    ],
  },
  {
    date: '2025-01-15',
    displayDate: 'Tomorrow Wed - Jan 15, 2025',
    items: [
      {
        id: 2,
        startTime: '9:00 am',
        endTime: '10:30 am',
        status: 'Scheduled',
        statusColor: 'green',
        progress: 0,
        activityIcon: 'local_shipping',
        activityName: 'School Transport',
        activityType: 'Home to School',
        startLocation: 'Abu Dhabi Mall',
        endLocation: 'Marina Mall',
        stops: '11 stops',
        distance: '12 km',
        duration: '90 min',
        assets: [
          { id: 3, icon: 'directions_car', status: 'green' },
          { id: 4, icon: 'person', status: 'green' },
        ],
        clientLogo: 'src/assets/clients/a.svg',
        approvalStatus: 'Pending',
        statusDetail: 'Awaiting',
      },
    ],
  },
])
</script>

<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center q-mb-md">
      <div class="col-md-4">
        <q-breadcrumbs>
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
          <q-breadcrumbs-el label="Mobility" />
          <q-breadcrumbs-el label="Dispatch" />
        </q-breadcrumbs>
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <DateRange class="gt-sm" />
        <TimeRange class="gt-sm" />
        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:layout-grid" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Grid View</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="primary" text-color="white" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:menu-06" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">List View</div>
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:edit-table" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Edit Table</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:filter" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Filter</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:chart-bar-line" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Statistics</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round :to="{ name: 'create-event' }">
            <q-icon>
              <IconifyIcon icon="hugeicons:add-01" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Add New</div>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

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
          <q-tab name="all" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                All
                <FleetChips text="32" color="success" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="upcoming" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Upcoming
                <FleetChips text="219" color="purple" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="missed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Missed
                <FleetChips text="17" color="error" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="live" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Live
                <FleetChips text="173" color="success" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="delayed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Delayed
                <FleetChips text="35" color="warning" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="completed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Completed
                <FleetChips text="651" color="grey" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="canceled" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Canceled
                <FleetChips text="19" color="error" :iconVisibility="false" class="q-ml-sm" />
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>

      <div class="col-12">
        <q-tab-panels v-model="eventStatus" animated>
          <q-tab-panel name="all">
            <div class="row">
              <div class="col-12">
                <q-table
                  flat
                  bordered
                  :rows="events.flatMap((group) => group.items)"
                  :columns="columns"
                  row-key="id"
                  :pagination="{ rowsPerPage: 10 }"
                >
                  <template v-slot:body>
                    <template v-for="dateGroup in events" :key="dateGroup.date">
                      <!-- Date Header -->
                      <tr>
                        <td colspan="100%" class="bg-grey-1 q-pa-md text-weight-medium text-grey-8">
                          {{ dateGroup.displayDate }}
                        </td>
                      </tr>
                      <!-- Events for this date -->
                      <tr v-for="event in dateGroup.items" :key="event.id">
                        <td class="text-no-wrap">
                          <div class="row items-center">
                            <div class="timing-bar bg-blue-3 q-mr-sm"></div>
                            <div class="column">
                              <div class="row items-center">
                                <q-icon name="schedule" size="xs" color="blue" />
                                <span class="q-ml-sm">{{ event.startTime }}</span>
                              </div>
                              <div class="text-grey-5 text-center">—</div>
                              <div class="row items-center">
                                <q-icon name="schedule" size="xs" color="blue" />
                                <span class="q-ml-sm">{{ event.endTime }}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <q-chip
                            :color="event.statusColor"
                            text-color="white"
                            size="sm"
                            class="q-px-sm"
                          >
                            {{ event.status }}
                          </q-chip>
                          <q-linear-progress
                            v-if="event.progress !== undefined"
                            :value="event.progress"
                            class="q-mt-sm"
                            rounded
                            size="5px"
                            :color="event.statusColor"
                          />
                        </td>
                        <td>
                          <div class="row items-center">
                            <q-icon :name="event.activityIcon" size="sm" class="q-mr-sm" />
                            <div class="column">
                              <div>{{ event.activityName }}</div>
                              <div class="text-grey-6">{{ event.activityType }}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="column">
                            <div class="row items-center q-mb-sm">
                              <q-icon name="place" size="xs" color="grey" />
                              <span class="q-ml-sm">{{ event.startLocation }}</span>
                            </div>
                            <q-chip dense class="bg-blue-1 text-blue" square>
                              {{ event.stops }} • {{ event.distance }} • {{ event.duration }}
                            </q-chip>
                            <div class="row items-center q-mt-sm">
                              <q-icon name="place" size="xs" color="grey" />
                              <span class="q-ml-sm">{{ event.endLocation }}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="row q-gutter-sm">
                            <q-icon
                              v-for="asset in event.assets"
                              :key="asset.id"
                              :name="asset.icon"
                              :color="asset.status"
                              size="md"
                            />
                          </div>
                        </td>
                        <td>
                          <q-avatar size="24px">
                            <img :src="event.clientLogo" />
                          </q-avatar>
                        </td>
                        <td>
                          <div :class="`status-badge-${event.approvalStatus.toLowerCase()}`">
                            {{ event.approvalStatus }}
                            <div class="text-caption">{{ event.statusDetail }}</div>
                          </div>
                        </td>
                        <td class="text-center">
                          <q-btn flat round color="grey" icon="more_vert">
                            <q-menu>
                              <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup>
                                  <q-item-section>Edit</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                  <q-item-section>Delete</q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-btn>
                        </td>
                      </tr>
                    </template>
                  </template>
                </q-table>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.timing-bar {
  width: 4px;
  height: 64px;
  border-radius: 2px;
}

.status-badge-approved {
  color: $positive;
  .text-caption {
    color: lighten($positive, 20%);
  }
}

.status-badge-pending {
  color: $warning;
  .text-caption {
    color: lighten($warning, 20%);
  }
}

.status-badge-declined {
  color: $negative;
  .text-caption {
    color: lighten($negative, 20%);
  }
}
</style>
