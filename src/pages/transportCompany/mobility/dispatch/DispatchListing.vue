<script setup lang="ts">
import { ref, computed } from 'vue'
import DateRange from 'src/components/shared/date_range/DateRange.vue'
import TimeRange from 'src/components/shared/time_range/TimeRange.vue'
import FleetChips from 'src/components/shared/chips/FleetChips.vue'
import VehiclePlate from 'src/components/shared/card/VehiclePlate.vue'

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

interface Activity {
  icon: string
  eventType: string
  subscribedService: string
}

interface Route {
  start: string
  end: string
  distance: string
  duration: string
  stops: number
}

interface Client {
  logo: string
  name: string
  phone: string
  email: string
}

interface Event {
  uniqueId: number
  schedule: Schedule
  eventStatus: EventStatus
  activity: Activity
  route: Route
  assetsStatus: {
    assignedVehicle: boolean
    assignedDriver: boolean
    assignedVehicleIcon: string
    assignedDriverIcon: string
    assignedVehicleFloatingIcon: string
    assignedDriverFloatingIcon: string
    assignedColor: string
    notAssignedColor: string
    assetDetails: {
      vehicle: {
        plate: {
          plateColor: string
          seriesCode: string
          seriesNumber: string
          uniqueNumber: string
        }
        year: string
        type: string
        make: string
        model: string
        seats: number
      }
      driver: {
        id: string
        firstName: string
        lastName: string
        image: string
        phone: string
        email: string
      }
    }
  }
  client: Client[]
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
const selectedVehicleEvent = ref<Event | null>(null)
const selectedDriverEvent = ref<Event | null>(null)
const searchEventsDialog = ref(false)
const searchText = ref('')
const searchEvents = ref<string[]>(["Event Type", "Event Name", "Event ID", "Vehicle ID", "VIN Number", "Asset Type", "Vehicle Make", "Vehicle Model", "Vehicle Year", "Plate Number"])
const selectedFilter = ref<string>('Event Type')
const activeSearchFilters = ref<{ type: string, value: string }[]>([])
const dispatchFilterDrawer = ref(false)
const activeMoreMenu = ref<number | null>(null)
// Filter Drawer
const organization = ref([])
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
])
const assetName = ref([])
const assetNameOptions = ref([
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Motorcycle', value: 'motorcycle' },

])
const assetCategory = ref([])
const assetCategoryOptions = ref([
  { label: 'Car', value: 'car' },
  { label: 'Bus', value: 'bus' },
  { label: 'Truck', value: 'truck' },
  { label: 'Van', value: 'van' },
])
const assetType = ref([])
const assetTypeOptions = ref([
  { label: 'Coach Bus', value: 'coachBus' },
  { label: 'Medium Bus', value: 'mediumBus' },
  { label: 'Small Bus', value: 'smallBus' },

])
const usageMode = ref([])
const usageModeOptions = ref([
  { label: 'Business', value: 'business' },
  { label: 'Internal', value: 'internal' },
])
const eventType = ref([])
const eventTypeOptions = ref([
  { label: 'Oneway', value: 'oneway' },
  { label: 'Roundtrip', value: 'roundtrip' },
  { label: 'Home to School', value: 'homeToSchool' },
  { label: 'Home to Office', value: 'homeToOffice' },
  { label: 'Office to Home', value: 'officeToHome' },
  { label: 'Office to Office', value: 'officeToOffice' },
  { label: 'Other', value: 'other' }
])




const showDialog = computed({
  get: () => selectedVehicleEvent.value !== null,
  set: (value: boolean) => {
    if (!value) selectedVehicleEvent.value = null
  }
})

const showDriverDialog = computed({
  get: () => selectedDriverEvent.value !== null,
  set: (value: boolean) => {
    if (!value) selectedDriverEvent.value = null
  }
})



const showVehicleDetails = (event: Event) => {
  selectedVehicleEvent.value = event
}

const showDriverDetails = (event: Event) => {
  selectedDriverEvent.value = event
}

const rows = [
  {
    eventDetails: {
      id: 1,
      eventDate: {
        date: '2025-06-10',
        displayDate: 'Today Tue - Jun 10, 2025',
        events: [{
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
            stops: 3
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
                  uniqueNumber: '38475'
                },
                year: '2020',
                type: 'Truck',
                make: 'MAN',
                model: 'CX-5',
                seats: 2
              },
              driver: {
                firstName: 'Jane',
                lastName: 'Smith',
                id: '#7G76F9',
                phone: '+971 50 123 4568',
                email: 'jane.smith@example.com',
                image: 'https://i.pravatar.cc/150?img=52',
              }
            }
          },
          client: [{
            logo: '../assets/clients/logo-a.svg',
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
          }],
          status: 'Approved',
        },
        {
          uniqueId: 2,
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
          activity: {
            icon: 'hugeicons:school-bus',
            eventType: 'Home to School',
            subscribedService: 'School Transport',
          },
          route: {
            start: 'Al Reef Downtown',
            end: 'Al Bateen Academy',
            distance: '27.9 km',
            duration: '43 M',
            stops: 7
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
                  plateColor: '#DC6803',
                  seriesCode: 'AD',
                  seriesNumber: '11',
                  uniqueNumber: '76542'
                },
                year: '2020',
                type: 'Medium Bus',
                make: 'Mercedes',
                model: 'Sprinter',
                seats: 32
              },
              driver: {
                firstName: 'Irfan',
                lastName: 'Khan',
                id: '#4D96F3',
                phone: '+971 50 123 4569',
                email: 'irfan.khan@example.com',
                image: 'https://i.pravatar.cc/150?img=12',
              }
            }
          },
          client: [{
            logo: '../assets/clients/logo-b.svg',
            name: 'Oasis Venture Group',
            phone: '+971 50 123 4567',
            email: 'oasis@email.com'
          }],
          status: 'Approved',
        },
        {
          uniqueId: 3,
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
          activity: {
            icon: 'hugeicons:truck',
            eventType: 'Oneway',
            subscribedService: 'Package Delivery',
          },
          route: {
            start: 'Dubai International Airport',
            end: 'Business Bay - DIFC',
            distance: '96.3 km',
            duration: '1 H 27 M',
            stops: 9
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
                  plateColor: '#079455',
                  seriesCode: 'AD',
                  seriesNumber: '18',
                  uniqueNumber: '54389'
                },
                year: '2024',
                type: 'Pickup Truck',
                make: 'Toyota',
                model: 'Hilux',
                seats: 2
              },
              driver: {
                firstName: 'Rajesh',
                lastName: 'Kumar',
                id: '#4D96F4',
                phone: '+971 50 123 4567',
                email: 'rajesh.kumar@example.com',
                image: 'https://i.pravatar.cc/150?img=13',
              }
            }
          },
          client: [
            {
              logo: '../assets/clients/logo-c.svg',
              name: 'Fujairah Logistics',
              phone: '+971 50 123 4567',
              email: 'fujairah@logistics.com',
            },
            {
              logo: 'https://logoipsum.com/artwork/256',
              name: 'G',
              phone: '+971 50 123 4567',
              email: 'g@example.com',
            },
            {
              logo: 'https://logoipsum.com/artwork/257',
              name: 'H',
              phone: '+971 50 123 4567',
              email: 'h@example.com',
            }
          ],
          status: 'Approved',
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
          uniqueId: 4,
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
          activity: {
            icon: 'hugeicons:van',
            eventType: 'Home to Office',
            subscribedService: 'Office Transport',
          },
          route: {
            start: 'Khalifa City A',
            end: 'Al Maryah Island (ADGM)',
            distance: '21.5 km',
            duration: '33 M',
            stops: 5
          },
          assetsStatus: {
            assignedVehicle: true,
            assignedDriver: false,
            assignedVehicleIcon: 'hugeicons:car-05',
            assignedDriverIcon: 'healthicons:truck-driver-outline',
            assignedVehicleFloatingIcon: 'hugeicons:tick-01',
            assignedDriverFloatingIcon: 'hugeicons:tick-01',
            assignedColor: 'positive',
            notAssignedColor: 'negative',
            assetDetails: {
              vehicle: {
                plate: {
                  plateColor: '#000000',
                  seriesCode: 'AUH',
                  seriesNumber: '36',
                  uniqueNumber: '99887'
                },
                year: '2020',
                type: 'Mini Van',
                make: 'Toyota',
                model: 'Hiace',
                seats: 10
              },
              driver: {
                firstName: 'John',
                lastName: 'Doe',
                id: '#4D96F2',
                phone: '+971 50 123 4567',
                email: 'john.doe@example.com',
                image: 'https://i.pravatar.cc/150?img=13',
              }
            }
          },
          client: [{
              logo: '../assets/clients/et.webp',
            name: 'Emirates Transport',
            phone: '+971 50 123 4567',
            email: 'et@email.com'
          }],
          status: 'Pending',
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
          uniqueId: 5,
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
          activity: {
            icon: 'hugeicons:school-bus',
            eventType: 'Home to School',
            subscribedService: 'School Transport',
          },
          route: {
            start: 'Sharjah Industrial Area 15',
            end: 'Oud Metha',
            distance: '47.5 km',
            duration: '57 M',
            stops: 13
          },
          assetsStatus: {
            assignedVehicle: false,
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
                  plateColor: '#000000',
                  seriesCode: 'AUH',
                  seriesNumber: '36',
                  uniqueNumber: '99887'
                },
                year: '2020',
                type: 'Sedan',
                make: 'Toyota',
                model: 'Camry',
                seats: 5
              },
              driver: {
                firstName: 'Jane',
                lastName: 'Smith',
                id: '#7G76F9',
                phone: '+971 50 123 4568',
                email: 'jane.smith@example.com',
                image: 'https://i.pravatar.cc/150?img=52',
              }
            }
          },
          client: [{
            logo: '../assets/clients/salama.png',
            name: 'Salama School Transport',
            phone: '+971 50 123 4567',
            email: 'salama@transport.com'
          }],
          status: 'Declined',
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
          uniqueId: 6,
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
          activity: {
            icon: 'hugeicons:delivery-truck-02',
            eventType: 'Oneway',
            subscribedService: 'Equipment Transport',
          },
          route: {
            start: 'Jebel Ali Port',
            end: 'Dubai Industrial City',
            distance: '100 km',
            duration: '1 H 30 M',
            stops: 3
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
                  plateColor: '#000000',
                  seriesCode: 'AUH',
                  seriesNumber: '36',
                  uniqueNumber: '99887'
                },
                year: '2020',
                type: 'Sedan',
                make: 'Toyota',
                model: 'Camry',
                seats: 5
              },
              driver: {
                firstName: 'Jane',
                lastName: 'Smith',
                id: '#7G76F9',
                phone: '+971 50 123 4568',
                email: 'jane.smith@example.com',
                image: 'https://i.pravatar.cc/150?img=52',
              }
            }
          },
          client: [{
            logo: '../assets/clients/logo-d.svg',
            name: 'Dubai Perfume',
            phone: '+971 50 123 4567',
            email: 'dubai.perfume@email.com'
          }],
          status: 'Approved',
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
  { name: 'eventStatus', label: 'Event Status', field: 'eventStatus', align: 'left', sortable: true, headerClasses: 'bg-grey-2' },
  { name: 'activity', label: 'Activity', field: 'activity', align: 'left', sortable: true, headerClasses: 'bg-grey-2' },
  { name: 'route', label: 'Route', field: 'route', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'assetsStatus', label: 'Assets Status', field: 'assetsStatus', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'client', label: 'Client', field: 'client', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'status', label: 'Approval Status', field: 'status', align: 'left', headerClasses: 'bg-grey-2' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'left', headerClasses: 'bg-grey-2' },
]

const addSearchFilter = () => {
  if (searchText.value && selectedFilter.value) {
    activeSearchFilters.value.push({
      type: selectedFilter.value,
      value: searchText.value
    })
    searchText.value = ''
  }
}

const removeSearchFilter = (index: number) => {
  activeSearchFilters.value.splice(index, 1)
}

const clearSearchFilters = () => {
  searchText.value = ''
  selectedFilter.value = ''
  activeSearchFilters.value = []
}

</script>
<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center q-mb-md">
      <div class="col-md-4">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
          <q-breadcrumbs-el label="Mobility" :to="{ name: 'mobility-link' }" />
          <q-breadcrumbs-el label="Dispatch" :to="{ name: 'dispatch-link' }" />
          <q-breadcrumbs-el label="Listing" color="text-grey-7" />
        </q-breadcrumbs>
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <DateRange class="gt-sm" />
        <TimeRange class="gt-sm" />

        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round class="gt-sm" @click="searchEventsDialog = true">
            <q-icon>
              <IconifyIcon icon="hugeicons:search-02" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Search Events</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round @click="dispatchFilterDrawer = true">
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

    <!--Tabs & Table Data for All Events-->

    <div class="row">
      <div class="col-12 bg-white rounded-borders q-pa-md">
        <q-tabs v-model="eventStatus" dense class="text-grey" active-color="primary" indicator-color="primary"
          align="justify" narrow-indicator style="border-bottom: 1px solid #e0e0e0">
          <q-tab name="all" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                All
                <FleetChips text="32" color="success" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="upcoming" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Upcoming
                <FleetChips text="219" color="purple" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="missed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Missed
                <FleetChips text="17" color="error" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="live" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Live
                <FleetChips text="173" color="success" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="delayed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Delayed
                <FleetChips text="35" color="warning" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="completed" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Completed
                <FleetChips text="651" color="grey" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>

          <q-tab name="canceled" class="flex">
            <template v-slot:default>
              <div class="row items-center">
                Canceled
                <FleetChips text="19" color="error" :iconVisibility="false" class="q-ml-sm gt-sm" />
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>

      <div class="col-12">
        <q-tab-panels v-model="eventStatus" animated>
          <q-tab-panel name="all" class="q-pt-none">

            <q-card v-if="selectedEvents.length > 0" flat bordered class="q-pa-xs q-mb-md full-width">
              <q-card-section class="q-pa-none">
                <div class="row">
                  <div class="col flex items-center">
                    <q-btn flat dense class="q-px-sm full-width" color="primary">
                      <IconifyIcon icon="hugeicons:filter-horizontal" width="24px" height="24px"
                        class="text-grey-7 q-mr-sm gt-sm" />
                      <span>Threshold</span>
                    </q-btn>
                  </div>

                  <div class="col flex items-center">
                    <q-btn flat dense class="q-px-sm full-width" color="primary" :disabled="selectedEvents.length > 1">
                      <IconifyIcon icon="hugeicons:flip-left" width="24px" height="24px"
                        class="text-grey-7 q-mr-sm gt-sm" />
                      <span>Clone</span>
                      <q-tooltip v-if="selectedEvents.length > 1">
                        <div class="text-caption">
                          You can only clone one event at a time.
                        </div>
                      </q-tooltip>
                    </q-btn>
                  </div>
                  <div class="col flex items-center">
                    <q-btn flat dense class="q-px-sm full-width" color="primary">
                      <IconifyIcon icon="hugeicons:security-check" width="24px" height="24px"
                        class="text-grey-7 q-mr-sm gt-sm" />
                      <span>Apply Policy</span>
                    </q-btn>
                  </div>

                  <div class="col flex items-center">
                    <q-btn flat dense class="q-px-sm full-width" color="primary">
                      <IconifyIcon icon="hugeicons:filter-horizontal" width="24px" height="24px"
                        class="text-grey-7 q-mr-sm gt-sm" />
                      <span>Merge</span>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>

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
                      <q-checkbox v-model="selectedEvents" :val="event.uniqueId" dense />
                    </td>
                    <td>
                      <div class="row items-start q-gutter-x-sm flex items-center full-height">
                        <div class="column gt-md">
                          <q-badge color="secondary" text-color="white">S</q-badge>
                        </div>
                        <div class="column">
                          <div class="row items-center">
                            <IconifyIcon icon="hugeicons:clock-01" width="16px" height="16px" class="text-grey-7" />
                            <span class="q-ml-sm text-caption">{{
                              event.schedule.startSchedule }}</span>
                          </div>
                          <div class="text-grey-5 text-center">—————</div>
                          <div class="row items-center">
                            <IconifyIcon icon="hugeicons:clock-01" width="16px" height="16px" class="text-grey-7" />
                            <span class="q-ml-sm text-caption">{{ event.schedule.startActual
                            }}</span>
                          </div>
                        </div>
                      </div>

                    </td>
                    <td>
                      <FleetChips :text="event.eventStatus.status + ' - ' + event.eventStatus.time"
                        :color="event.eventStatus.status === 'Upcoming' ? 'purple' : event.eventStatus.status === 'Live' ? 'success' : event.eventStatus.status === 'Delayed' ? 'warning' : event.eventStatus.status === 'Completed' ? 'grey' : event.eventStatus.status === 'Canceled' ? 'error' : 'secondary'"
                        :iconVisibility="false" />
                    </td>
                    <td>
                      <div class="row items-start q-gutter-x-sm flex items-center full-height">
                        <div class="column gt-md">
                          <IconifyIcon :icon="event.activity.icon" width="24px" height="24px" class="text-grey-7" />
                        </div>
                        <div class="column">
                          <div class="row items-center">
                            <span class="text-caption">{{ event.activity.subscribedService
                            }}</span>
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
                          <IconifyIcon icon="hugeicons:play" width="16px" height="16px" class="text-grey-7 gt-md" />
                          <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px;">{{ event.route.start
                            }}</span>
                          <q-tooltip>{{ event.route.start }}</q-tooltip>
                        </div>
                        <q-chip dense class="bg-blue-1 text-blue" square>
                          {{ event.route.stops }} Stops • {{ event.route.distance }} • {{
                            event.route.duration }}
                        </q-chip>
                        <div class="row items-center q-mt-sm">
                          <IconifyIcon icon="hugeicons:stop" width="16px" height="16px" class="text-grey-7 gt-md" />
                          <span class="q-ml-xs text-grey-9 ellipsis" style="max-width: 264px;">{{ event.route.end
                            }}</span>
                          <q-tooltip>{{ event.route.end }}</q-tooltip>
                        </div>
                      </div>

                    </td>
                    <td>

                      <div class="row items-center q-gutter-x-sm">
                        <div>
                          <q-btn outline round dense
                            :color="event.assetsStatus.assignedVehicle ? event.assetsStatus.assignedColor : event.assetsStatus.notAssignedColor"
                            @click="showVehicleDetails(event)" :disable="!event.assetsStatus.assignedVehicle">
                            <IconifyIcon :icon="event.assetsStatus.assignedVehicleIcon" width="24px" height="24px" />
                            <q-badge floating rounded
                              :color="event.assetsStatus.assignedVehicle ? event.assetsStatus.assignedColor : event.assetsStatus.notAssignedColor"
                              text-color="white" class="q-ml-sm">
                              <IconifyIcon
                                :icon="event.assetsStatus.assignedVehicle ? 'hugeicons:tick-01' : 'hugeicons:cancel-01'"
                                width="12px" height="12px" />
                            </q-badge>
                            <q-tooltip>Vehicle {{ event.assetsStatus.assignedVehicle ?
                              'Assigned' : 'Not Assigned' }}</q-tooltip>
                          </q-btn>
                        </div>
                        <div>
                          <q-btn outline round dense
                            :color="event.assetsStatus.assignedDriver ? event.assetsStatus.assignedColor : event.assetsStatus.notAssignedColor"
                            @click="showDriverDetails(event)" :disable="!event.assetsStatus.assignedDriver">
                            <IconifyIcon :icon="event.assetsStatus.assignedDriverIcon" width="24px" height="24px" />
                            <q-badge floating rounded
                              :color="event.assetsStatus.assignedDriver ? event.assetsStatus.assignedColor : event.assetsStatus.notAssignedColor"
                              text-color="white" class="q-ml-sm">
                              <IconifyIcon
                                :icon="event.assetsStatus.assignedDriver ? 'hugeicons:tick-01' : 'hugeicons:cancel-01'"
                                width="12px" height="12px" />
                            </q-badge>
                            <q-tooltip>Driver {{ event.assetsStatus.assignedDriver ?
                              'Assigned' : 'Not Assigned' }}</q-tooltip>
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
                        <q-btn v-if="event.client.length > 1" round dense flat class="bg-grey-3 text-grey-9">
                          +{{ event.client.length - 1 }}
                          <q-tooltip>
                            {{ event.client.length - 1 }} more client(s)
                          </q-tooltip>
                        </q-btn>
                      </div>
                    </td>
                    <td>
                      <div class="text-body2 text-weight-medium q-pl-sm"
                        :class="{ 'text-positive': event.status === 'Approved', 'text-warning': event.status === 'Pending', 'text-negative': event.status === 'Declined' }">
                        {{ event.status }}
                      </div>
                    </td>
                    <td>
                      <q-btn flat round @click="activeMoreMenu = event.uniqueId">
                        <IconifyIcon icon="hugeicons:more-vertical-circle-01" width="24px" height="24px"
                          class="text-grey-7" />
                      </q-btn>
                      <q-menu :model-value="activeMoreMenu === event.uniqueId"
                        @update:model-value="val => activeMoreMenu = val ? event.uniqueId : null"
                        transition-show="jump-down" transition-hide="jump-up" anchor="center right" self="top left"
                        :offset="[-15, 0]" class="animated-menu">
                        <q-list style="min-width: 300px" padding>
                          <q-item clickable v-ripple :to="{ name: 'dispatch-details' }">
                            <q-item-section avatar>
                              <IconifyIcon icon="hugeicons:route-02" width="24px" height="24px" class="text-grey-7" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>View Details</q-item-label>
                              <q-item-label caption>View the details of this event</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <IconifyIcon icon="hugeicons:edit-01" width="24px" height="24px" class="text-grey-7" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Edit Event</q-item-label>
                              <q-item-label caption>Modify event details</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <IconifyIcon icon="hugeicons:flip-left" width="24px" height="24px" class="text-grey-7" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Clone Event</q-item-label>
                              <q-item-label caption>Create a copy of this event</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <IconifyIcon icon="hugeicons:cancel-01" width="24px" height="24px" class="text-grey-7" />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Cancel Event</q-item-label>
                              <q-item-label caption>Cancel this event</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-separator />

                          <q-item clickable v-ripple class="text-negative">
                            <q-item-section avatar>
                              <IconifyIcon icon="hugeicons:delete-02" width="24px" height="24px"
                                class="text-negative" />
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

            <!-- More Menu-->



            <!-- Modal -  Vehicle Details-->
            <q-dialog v-model="showDialog" backdrop-filter="blur(2px)">
              <q-card style="width: 500px; max-width: 80vw;">
                <q-bar class="bg-primary text-white">
                  <div class="row items-center text-weight-medium">
                    Asset Details
                  </div>
                  <q-space />
                  <q-btn flat dense icon="close" @click="selectedVehicleEvent = null" />
                </q-bar>
                <q-card-section v-if="selectedVehicleEvent">
                  <div class="text-subtitle2 text-grey-7">Primary Vehicle</div>
                  <div class="q-mt-sm row items-center justify-between q-gutter-x-md">
                    <div>
                      <VehiclePlate
                        :plateColor="selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.plateColor"
                        :seriesCode="selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.seriesCode"
                        :seriesNumber="selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.seriesNumber"
                        :uniqueNumber="selectedVehicleEvent.assetsStatus.assetDetails.vehicle.plate.uniqueNumber" />
                    </div>
                    <div>
                      <div class="text-caption text-weight-medium q-pl-sm">
                        <q-badge transparent rounded class="bg-grey-3 text-grey-7 text-weight-bold text-caption">
                          {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.year }}
                          <q-chip class="text-grey-9 text-caption text-weight-medium">
                            {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.type
                            }}
                          </q-chip>
                        </q-badge>
                      </div>
                      <div class="text-caption text-weight-medium q-pl-sm q-mt-xs">
                        {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.make }}, {{
                          selectedVehicleEvent.assetsStatus.assetDetails.vehicle.model }}
                      </div>
                    </div>
                    <div class="row items-center">
                      <div>
                        <IconifyIcon icon="hugeicons:airplane-seat" width="24px" height="24px" class="text-grey-7" />
                      </div>
                      <div class="text-caption text-weight-medium q-pl-sm">
                        <q-chip>
                          <q-avatar size="24px" color="primary" text-color="white">
                            {{ selectedVehicleEvent.assetsStatus.assetDetails.vehicle.seats
                            }}
                          </q-avatar>Seats
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="row items-center justify-end q-gutter-x-sm">
                    <q-btn flat label="Cancel" color="grey-7" class="q-mr-sm" @click="selectedVehicleEvent = null" />
                    <q-btn outline label="More Details" color="secondary" />
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>

            <!-- Modal -  Driver Details-->
            <q-dialog v-model="showDriverDialog" backdrop-filter="blur(2px)">
              <q-card style="width: 600px; max-width: 80vw;">
                <q-bar class="bg-primary text-white">
                  <div class="row items-center text-weight-medium">
                    Driver Details
                  </div>
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
                          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                            class="q-mr-sm bg-white">
                            <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
                            <q-tooltip>{{
                              selectedDriverEvent.assetsStatus.assetDetails.driver.phone
                            }}</q-tooltip>
                          </q-chip>
                          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                            class="q-mr-sm bg-white">
                            <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px" class="text-grey-8" />
                            <q-tooltip>{{
                              selectedDriverEvent.assetsStatus.assetDetails.driver.email
                            }}</q-tooltip>
                          </q-chip>
                        </div>
                      </div>
                    </div>
                    <div class="row items-center">
                      <div class="column">
                        <div class="text-caption  text-grey-7">
                          HOS Remaining Hrs
                        </div>
                        <div class="text-body2 text-weight-medium text-grey-9 ">
                          3 H 17 M <br /> &nbsp;
                        </div>
                      </div>
                    </div>
                    <div class="row items-center">
                      <div class="column">
                        <div class=" text-caption text-grey-7 ellipsis">
                          Position & Level
                        </div>
                        <div class="text-body2 text-weight-medium text-grey-9 ellipsis">
                          Intermediate driver <br /> Level 2
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="row items-center justify-end q-gutter-x-sm">
                    <q-btn flat label="Cancel" color="grey-7" class="q-mr-sm" @click="selectedDriverEvent = null" />
                    <q-btn outline label="More Details" color="secondary" />
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <!-- Card -  Search Events  -->
    <q-dialog v-model="searchEventsDialog" backdrop-filter="blur(2px)" transition-show="jump-down"
      transition-hide="jump-up" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section>
          <div class="row flex items-center">
            <div class="col-10">
              <div class="text-h6">Search Events</div>
              <div class="text-body2 text-grey-7">
                Find events faster with the filters below.
              </div>

            </div>
            <div class="col-2 flex justify-end">
              <q-btn flat dense @click="searchEventsDialog = false">
                <IconifyIcon icon="hugeicons:cancel-01" width="24px" height="24px" class="text-grey-7" />
              </q-btn>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="row">
            <div class="col-12 q-mr-sm">
              <q-chip v-for="filterTypes in searchEvents" :key="filterTypes" :selected="selectedFilter === filterTypes"
                @click="selectedFilter = selectedFilter === filterTypes ? '' : filterTypes"
                :outline="selectedFilter !== filterTypes" :color="selectedFilter === filterTypes ? 'primary' : 'grey-7'"
                :text-color="selectedFilter === filterTypes ? 'white' : 'grey-7'"
                :icon="selectedFilter === filterTypes ? 'check' : undefined" class="text-caption cursor-pointer">
                {{ filterTypes }}
              </q-chip>
            </div>
            <div class="col-12 q-pt-md">
              <q-input autofocus outlined v-model="searchText" placeholder="Search for...">
                <template v-slot:prepend>
                  <IconifyIcon icon="hugeicons:search-02" width="24px" height="24px" class="text-grey-7" />
                </template>
                <template v-slot:append>
                  <q-btn flat dense @click="addSearchFilter">
                    <IconifyIcon icon="hugeicons:add-01" width="24px" height="24px" class="text-grey-7" />
                    <q-tooltip>Add Filter</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mt-sm" v-if="activeSearchFilters.length > 0">
              <div class="row q-gutter-x-sm q-gutter-y-sm">
                <q-badge v-for="(filter, index) in activeSearchFilters" :key="index" color="grey-3" text-color="primary"
                  class="text-caption">
                  {{ filter.type }}:
                  <q-chip color="primary" text-color="white" class="text-caption">
                    {{ filter.value }}
                    <q-btn flat dense round size="xs" class="q-ml-sm" @click="removeSearchFilter(index)">
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
    <q-dialog persistent backdrop-filter="blur(2px)" v-model="dispatchFilterDrawer" position="right"
      :full-height="true">
      <q-card class="column">
        <q-card-section class="q-pb-none">
          <div class="row items-start justify-between">
            <div>
              <div class="text-h6 text-weight-bold">Filter Dispatch</div>
              <div class="text-caption text-grey-7">Select the filters applicable to this dispatch</div>
            </div>
            <div class="row items-center q-gutter-x-xs">
              <q-btn color="primary" label="Apply" />
              <q-btn flat round dense>
                <IconifyIcon icon="hugeicons:refresh" width="20px" height="20px" class="text-grey-7" />
                <q-tooltip>Clear</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="close" @click="dispatchFilterDrawer = false" class="text-grey-7">
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
                <q-select dense outlined multiple use-chips v-model="organization" :options="organizationOptions"
                  placeholder="Select Organization" />
              </div>
            </div>
            <div class="col-12">
              <div class="text-subtitle1 text-weight-medium">Assets Preference</div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Name</div>
                <q-select dense outlined multiple use-chips v-model="assetName" :options="assetNameOptions"
                  placeholder="Select Asset Name" />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Category</div>
                <q-select dense outlined multiple use-chips v-model="assetCategory" :options="assetCategoryOptions"
                  placeholder="Select Asset Category" />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Asset Type</div>
                <q-select dense outlined multiple use-chips v-model="assetType" :options="assetTypeOptions"
                  placeholder="Select Asset Type" />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Usage Mode</div>
                <q-select dense outlined multiple use-chips v-model="usageMode" :options="usageModeOptions"
                  placeholder="Select Usage Mode" />
              </div>
              <div class="q-mt-sm q-gutter-y-xs">
                <div class="text-subtitle2 text-grey-7">Event Type</div>
                <q-select dense outlined multiple use-chips v-model="eventType" :options="eventTypeOptions"
                  placeholder="Select Event Type" />
              </div>
            </div>

          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<style scoped></style>