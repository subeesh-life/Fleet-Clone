<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LiveMapKpis from 'src/components/adminRegulator/liveMap/liveMapKpis.vue';
import VehiclePlate from 'components/shared/card/VehiclePlate.vue';
import FleetChips from 'components/shared/chips/FleetChips.vue';
import { L } from 'boot/leaflet';

const showAllCards = ref(false);
const searchEventsDialog = ref(false);
const searchText = ref('');
const searchEvents = ref<string[]>([
  'Company Name',
  'Entity Name',
  'Vehicle ID',
  'VIN Number',
  'Asset Type',
  'Vehicle Make',
  'Vehicle Model',
  'Vehicle Year',
  'Plate Number',
  'Driver Name',
]);
const selectedFilter = ref<string>('Company Name');
const activeSearchFilters = ref<{ type: string; value: string }[]>([]);

// Vehicle markers data
const vehicleMarkers = ref([
  {
    id: 1,
    lat: 24.4539,
    lng: 54.3773,
    location: 'Abu Dhabi, UAE',
    coordinates: '24.4539° N, 54.3773° E',
    status: 'Active',
    showPopup: false,
  },
]);

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

const toggleVehiclePopup = (markerId: number) => {
  vehicleMarkers.value.forEach(marker => {
    if (marker.id === markerId) {
      marker.showPopup = !marker.showPopup;
    } else {
      marker.showPopup = false;
    }
  });
};

onMounted(() => {
  setTimeout(() => {
    // Abu Dhabi coordinates: 24.4539° N, 54.3773° E
    const map = L.map('map').setView([24.4539, 54.3773], 4);

    // Using CartoDB's light (grayscale) map with English labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    map.invalidateSize();
  }, 100);
});
</script>

<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center">
      <div class="col-md-4">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
          <q-breadcrumbs-el label="Live Map" color="text-grey-7" />
        </q-breadcrumbs>
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round @click="showAllCards = !showAllCards">
            <q-icon>
              <IconifyIcon
                :icon="
                  showAllCards ? 'hugeicons:arrow-shrink-01' : 'hugeicons:arrow-expand-diagonal-01'
                "
                width="16px"
                height="16px"
              />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">{{ showAllCards ? "Collapse KPI's" : "Expand KPI's" }}</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round @click="searchEventsDialog = true">
            <q-icon>
              <IconifyIcon icon="hugeicons:search-02" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Search</div>
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
        </div>
      </div>
    </div>

    <!-- Cards for KPI's -->
    <div class="q-col-gutter-md q-mb-md">
      <LiveMapKpis :show-all-cards="showAllCards" />
    </div>

    <!-- Map -->
    <q-card bordered flat class="q-pa-none">
      <q-card-section class="q-pa-xs">
        <div class="col-12">
          <div class="bg-grey-2">
            <div class="map-container">
              <div id="map" style="height: 100%; width: 100%"></div>

              <!-- Vehicle Markers -->
              <div
                v-for="marker in vehicleMarkers"
                :key="marker.id"
                class="vehicle-marker"
                :style="{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }"
                @click="toggleVehiclePopup(marker.id)"
              >
                <div class="vehicle-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path
                      d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                    />
                  </svg>
                </div>

                <!-- Vehicle Popover -->
                <div v-if="marker.showPopup">
                  <q-card style="min-width: 600px">
                    <q-card-section class="q-pa-none">
                      <div class="row flex items-center q-pa-md">
                        <div class="col-md-6 col-sm-12 col-xs-12 flex items-center">
                          <VehiclePlate />
                          <div class="q-ml-md">
                            <div>
                              <q-badge
                                transparent
                                rounded
                                class="bg-grey-3 text-grey-7 text-weight-bold text-caption"
                              >
                                2025 - Mini Bus
                              </q-badge>
                            </div>
                            <div class="text-caption text-weight-medium flex items-center">
                              Toyota, Coaster - SL
                            </div>
                            <q-tooltip>Bus, Mini Bus</q-tooltip>
                          </div>
                        </div>
                        <div class="col-md-2 flex items-center justify-start">
                          <div class="column">
                            <FleetChips
                              :text="'25 Seats'"
                              :color="'grey'"
                              :iconVisibility="false"
                              class="q-px-none q-mb-sm"
                            />
                            <q-badge
                              rounded
                              color="brown-7"
                              text-color="white"
                              class="text-caption"
                            >
                              BOOO7345
                            </q-badge>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="text-body2 text-weight-medium text-right text-positive">
                            Live
                          </div>
                          <div class="text-caption text-weight-medium text-right text-grey-7">
                            Since 17 Minutes ago
                          </div>
                        </div>
                      </div>
                      <q-separator />
                      <div class="row bg-grey-2 q-pa-md">
                        <div class="col flex items-center">
                          <IconifyIcon
                            icon="hugeicons:location-01"
                            width="24px"
                            height="24px"
                            class="text-grey-7 q-mr-sm"
                          />
                          <div class="text-body2 text-weight-medium">
                            Fatima Bint Mubarak Street - Al Danah - Zone 1 - Abu Dhabi
                            <div class="text-caption text-weight-medium text-grey-7">
                              Jun 16, 2025, 11:30 am
                            </div>
                          </div>
                        </div>
                      </div>
                      <q-separator />
                      <div class="row q-pa-md">
                        <div class="col-md-4">
                          <div class="text-body2 text-weight-medium">
                            <div class="text-grey-7 text-caption">Odometer</div>
                            <div class="text-weight-medium text-body2">100,000 km</div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="text-body2 text-weight-medium">
                            <div class="text-grey-7 text-caption">Company Code</div>
                            <div class="text-weight-medium text-body2">LC8393</div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="text-body2 text-weight-medium">
                            <div class="text-grey-7 text-caption">Business Domain</div>
                            <div class="text-weight-medium text-body2">Fire & Safety</div>
                          </div>
                        </div>
                      </div>
                      <div class="row q-px-md q-pb-md">
                        <div class="col-md-6">
                          <div class="text-body2 text-weight-medium">
                            <div class="text-grey-7 text-caption">Company Name</div>
                            <div class="text-weight-medium text-body2">
                              Emirates Fire Systems Co.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="text-body2 text-weight-medium">
                            <div class="text-grey-7 text-caption">Entity Name</div>
                            <div class="text-weight-medium text-body2">
                              Emirates Industrial Fire Unit
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-actions>
                      <q-btn label="View Details" color="primary" class="full-width" />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>

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
</template>

<style lang="scss" scoped>
#map {
  min-height: calc(100vh - 300px); // Default height for small devices
  z-index: 1;
  filter: grayscale(0.8);

  @media (min-width: 1024px) {
    // Medium devices and larger
    min-height: calc(100vh - 300px);
  }
}

.bg-grey-2 {
  display: block;
  position: relative;
}

.map-container {
  position: relative;
}

.vehicle-marker {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.vehicle-icon {
  background: #1976d2;
  border: 2px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    background: #1565c0;
  }
}
</style>
