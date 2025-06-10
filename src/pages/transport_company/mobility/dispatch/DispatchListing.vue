<script setup lang="ts">
import { ref, computed } from 'vue'
import DateRange from 'src/components/shared/date_range/DateRange.vue'
import TimeRange from 'src/components/shared/time_range/TimeRange.vue'
import FleetChips from 'src/components/shared/chips/FleetChips.vue'

interface Schedule {
  startSchedule: string
  endSchedule: string
  startActual: string
  endActual: string
}

interface EventStatus {
  status: string
  time: string
}

interface Event {
  schedule: Schedule
  eventStatus: EventStatus
  activity: string
  route: string
  assetsStatus: string
  client: string
  status: string
}

interface EventDate {
  date: string
  displayDate: string
  events: Event[]
}

interface EventDetails {
  id: number
  eventDate: EventDate
}

interface Group {
  date: string
  rows: { eventDetails: EventDetails }[]
}

interface FlattenedRow {
  isGroupHeader?: boolean
  date?: string
  eventDetails?: EventDetails
}

interface QTableColumn {
  name: string
  label: string
  field: string | ((row: FlattenedRow) => unknown)
  required?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sort?: (a: unknown, b: unknown, rowA: FlattenedRow, rowB: FlattenedRow) => number
  headerClasses?: string
}

const eventStatus = ref('all')
const selectedEvents = ref<number[]>([])
const selectAll = ref(false)

const rows = [
  {
    eventDetails: {
      id: 1,
      eventDate: {
        date: '2025-06-10',
        displayDate: 'Today Tue - Jun 10, 2025',
        events: [{
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
          activity: 'Gas Delivery',
          route: 'Yas Island - Zone 1 - C67-04 - Saadiyat Island - District 2 - D8',
          assetsStatus: 'Available',
          client: 'B',
          status: 'Ready',
        },
        {
          schedule: {
            startSchedule: '10:00 AM',
            endSchedule: '11:30 AM',
            startActual: '10:15 AM',
            endActual: '11:45 AM',
          },
          eventStatus: {
            status: 'Upcoming',
            time: '11 M',
          },
          activity: 'Food Supply',
          route: 'Dubai Mall - Burj Khalifa - Downtown Dubai',
          assetsStatus: 'In Transit',
          client: 'E',
          status: 'In Progress',
        },
        {
          schedule: {
            startSchedule: '2:30 PM',
            endSchedule: '4:00 PM',
            startActual: '2:45 PM',
            endActual: '4:15 PM',
          },
          eventStatus: {
            status: 'Live',
            time: '23 M',
          },
          activity: 'Package Delivery',
          route: 'Dubai International Airport - Business Bay - DIFC',
          assetsStatus: 'Available',
          client: 'F',
          status: 'Ready',
        }],
      }
    }
  },
  {
    eventDetails: {
      id: 2,
      eventDate: {
        date: '2025-06-11',
        displayDate: 'Tomorrow Wed - Jun 11, 2025',
        events: [{
          schedule: {
            startSchedule: '9:00 AM',
            endSchedule: '10:00 AM',
            startActual: '9:15 AM',
            endActual: '10:15 AM',
          },
          eventStatus: {
            status: 'Delayed',
            time: '10 D 19 H 10 M',
          },
          activity: 'Water Supply',
          route: 'Dubai Marina - Tower 1 - Abu Dhabi - Downtown',
          assetsStatus: 'In Transit',
          client: 'A',
          status: 'In Progress',
        }],
      }
    }
  },
  {
    eventDetails: {
      id: 3,
      eventDate: {
        date: '2025-06-12',
        displayDate: 'Thu - Jun 12, 2025',
        events: [{
          schedule: {
            startSchedule: '2:00 PM',
            endSchedule: '3:30 PM',
            startActual: '2:30 PM',
            endActual: '3:45 PM',
          },
          eventStatus: {
            status: 'Canceled',
            time: '2 D 13 H 29 M',
          },
          activity: 'Maintenance',
          route: 'Sharjah Industrial Area - Dubai Mall',
          assetsStatus: 'Maintenance',
          client: 'C',
          status: 'Delayed',
        }],
      }
    }
  },
  {
    eventDetails: {
      id: 4,
      eventDate: {
        date: '2025-06-13',
        displayDate: 'Fri - Jun 13, 2025',
        events: [{
          schedule: {
            startSchedule: '11:00 AM',
            endSchedule: '12:00 PM',
            startActual: '11:00 AM',
            endActual: '12:00 PM',
          },
          eventStatus: {
            status: 'Completed',
            time: '15:00',
          },
          activity: 'Equipment Transport',
          route: 'Jebel Ali Port - Dubai Industrial City',
          assetsStatus: 'Available',
          client: 'D',
          status: 'Completed',
        }],
      }
    }
  }
]

// Step 1: Group and Flatten
const groupedRows = computed(() => {
  const groups: Group[] = []

  for (const row of rows) {
    const date = row.eventDetails.eventDate.displayDate
    const group = groups.find(g => g.date === date)

    if (!group) {
      groups.push({ date, rows: [row] })
    } else {
      group.rows.push(row)
    }
  }

  const flattened: FlattenedRow[] = []
  groups.forEach(group => {
    flattened.push({ isGroupHeader: true, date: group.date })
    group.rows.forEach(r => flattened.push(r))
  })

  return flattened
})

// Step 2: Select All Handler
const handleSelectAll = (newSelected: readonly number[]) => {
  selectedEvents.value = [...newSelected]
  selectAll.value = newSelected.length === rows.length
}

const columns: QTableColumn[] = [
  { name: 'select', label: '', field: 'select', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'scheduleActual', label: 'Schedule / Actual', field: 'scheduleActual', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'eventStatus', label: 'Event Status', field: 'eventStatus', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'activity', label: 'Activity', field: 'activity', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'route', label: 'Route', field: 'route', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'assetsStatus', label: 'Assets Status', field: 'assetsStatus', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'client', label: 'Client', field: 'client', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'status', label: 'Status', field: 'status', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left', headerClasses: 'bg-grey-2' },
]


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
              <IconifyIcon icon="hugeicons:search-02" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Search Events</div>
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

    <!--Tabs & Table Data-->

    <div class="row">
      <div class="col-12 bg-white rounded-borders q-pa-md">
        <q-tabs v-model="eventStatus" dense class="text-grey" active-color="primary" indicator-color="primary"
          align="justify" narrow-indicator style="border-bottom: 1px solid #e0e0e0">
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

            <q-table flat bordered :columns="columns" :rows="groupedRows" row-key="eventDetails?.id"
              :pagination="{ rowsPerPage: 7 }" :rows-per-page-options="[5, 7, 10]" v-model:selected="selectedEvents"
              @update:selected="handleSelectAll">
              <!-- Group Header Row -->
              <template v-slot:body="props">
                <tr v-if="props.row.isGroupHeader">
                  <td :colspan="columns.length" class="bg-grey-1 text-body2 text-primary text-weight-bold">
                    {{ props.row.date }}
                  </td>
                </tr>
                <template v-else>
                  <tr v-for="(event, index) in props.row.eventDetails.eventDate.events" :key="index">
                    <td>
                      <q-checkbox v-model="selectedEvents" :val="props.row.eventDetails.id" dense />
                    </td>
                    <td>
                      <div class="row items-start q-gutter-x-sm flex items-center full-height">
                        <div class="column gt-md">
                          <q-badge color="secondary" text-color="white">S</q-badge>
                        </div>
                        <div class="column">
                          <div class="row items-center">
                            <IconifyIcon icon="hugeicons:clock-01" width="16px" height="16px" class="text-grey-7" />
                            <span class="q-ml-sm text-caption">{{ event.schedule.startSchedule }}</span>
                          </div>
                          <div class="text-grey-5 text-center">—————</div>
                          <div class="row items-center">
                            <IconifyIcon icon="hugeicons:clock-01" width="16px" height="16px" class="text-grey-7" />
                            <span class="q-ml-sm text-caption">{{ event.schedule.startActual }}</span>
                          </div>
                        </div>
                      </div>

                    </td>
                    <td>
                      <FleetChips :text="event.eventStatus.status + ' - ' + event.eventStatus.time"
                        :color="event.eventStatus.status === 'Upcoming' ? 'purple' : event.eventStatus.status === 'Live' ? 'success' : event.eventStatus.status === 'Delayed' ? 'warning' : event.eventStatus.status === 'Completed' ? 'grey' : event.eventStatus.status === 'Canceled' ? 'error' : 'secondary'"
                        :iconVisibility="false" />
                    </td>
                    <td>{{ event.activity }}</td>
                    <td>{{ event.route }}</td>
                    <td>{{ event.assetsStatus }}</td>
                    <td>{{ event.client }}</td>
                    <td>{{ event.status }}</td>
                    <td>
                      <!-- Actions (Edit/Delete buttons, etc) -->
                      <q-btn dense icon="edit" flat />
                      <q-btn dense icon="delete" flat />
                    </td>
                  </tr>
                </template>
              </template>
            </q-table>

          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>
<style scoped></style>