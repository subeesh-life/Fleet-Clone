<script setup lang="ts">
import { onMounted } from 'vue';
import FleetChips from 'src/components/shared/chips/FleetChips.vue';
import { L } from 'boot/leaflet';

onMounted(() => {
  setTimeout(() => {
    // Abu Dhabi coordinates: 24.4539° N, 54.3773° E
    const map = L.map('map').setView([24.4539, 54.3773], 4);

    // Using CartoDB's light (grayscale) map with English labels
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 20,
      }
    ).addTo(map);

    map.invalidateSize();
  }, 100);
});
</script>
<template>
  <q-card flat bordered class="q-pa-xs q-mb-md full-width">
    <q-card-section class="q-pa-none">
      <div class="row flex flex-center justify-between q-pa-sm bg-primary">
        <div class="col-6 text-h6 q-px-sm text-white">
          HS-76578
          <q-tooltip>Event Name</q-tooltip>
          <q-btn flat dense padding="xs" class="q-ml-xs">
            <iconify-icon
              icon="hugeicons:copy-02"
              width="16px"
              height="16px"
              class="text-white"
            />
          </q-btn>
        </div>
        <div class="col-6 text-body2">
          <FleetChips
            text="Upcoming - 11 M"
            color="purple"
            :iconVisibility="false"
            class="q-pa-xs"
          />
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="col-12">
          <div class="bg-grey-2">
            <div class="map-container">
              <div id="map" style="height: 300px; width: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="row q-mt-sm q-px-sm flex flex-center">
        <div class="col-4">
          <div class="text-caption text-grey-7">Service Type</div>
          <div class="text-body2 text-weight-medium text-grey-9">
            School Transport
          </div>
        </div>
        <div class="col-4">
          <div class="text-caption text-grey-7">Event Type</div>
          <div class="text-body2 text-weight-medium text-grey-9">
            Home to School
          </div>
        </div>
        <div class="col-4">
          <div class="text-caption text-grey-7">Refference ID</div>
          <div class="text-body2 text-weight-medium text-grey-9">
            BVJ20IB1
            <q-btn flat dense padding="xs" class="q-ml-xs">
              <q-tooltip>Copy</q-tooltip>
              <iconify-icon
                icon="hugeicons:copy-02"
                width="16px"
                height="16px"
                class="text-grey-7"
              />
            </q-btn>
          </div>
        </div>
      </div>
      <q-separator class="q-my-sm q-mx-sm" />
      <div class="row q-mt-sm q-px-sm flex flex-center">
        <div class="col-4">
          <div class="text-caption text-grey-7">Schedule</div>
          <div class="text-body2 text-weight-medium text-grey-9">
            Jun, 16 2025
          </div>
        </div>
        <div class="col-4">
          <div class="text-caption text-grey-7">Start</div>
          <div class="text-body2 text-weight-medium text-grey-9">07:45 AM</div>
        </div>
        <div class="col-4">
          <div class="text-caption text-grey-7">Est.End</div>
          <div class="text-body2 text-weight-medium text-grey-9">08:37 AM</div>
        </div>
      </div>
      <q-separator class="q-my-sm q-mx-sm" />
      <div class="row q-mt-sm q-px-sm flex flex-center cursor-pointer">
        <div class="col-12">
          <div class="column">
            <div class="row items-center q-mb-sm">
              <IconifyIcon
                icon="hugeicons:play"
                width="16px"
                height="16px"
                class="text-grey-7 gt-md"
              />
              <span
                class="q-ml-xs text-grey-9 ellipsis"
                style="max-width: 364px"
                >Yas Island Zone B - C67-04 - Abu Dhabi, UAE
              </span>
            </div>
            <q-chip dense class="bg-blue-1 text-blue" square>
              7 Stops • 27.9 KM • 43 Mins • 29 Pax
            </q-chip>
            <div class="row items-center q-mt-sm">
              <IconifyIcon
                icon="hugeicons:stop"
                width="16px"
                height="16px"
                class="text-grey-7 gt-md"
              />
              <span
                class="q-ml-xs text-grey-9 ellipsis"
                style="max-width: 264px"
                >Al Bateen Academy
              </span>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style scoped lang="scss">
#map {
  min-height: 300px; // Default height for small devices
  z-index: 1;
  filter: grayscale(0.8);
}

.bg-grey-2 {
  display: block;
  position: relative;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2; // Increased z-index
  pointer-events: auto;
}

// Separate container for the map to apply grayscale
</style>
