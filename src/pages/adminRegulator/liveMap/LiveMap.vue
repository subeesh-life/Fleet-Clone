<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LiveMapKpis from 'src/components/adminRegulator/liveMap/liveMapKpis.vue';
import { L } from 'boot/leaflet';

const showAllCards = ref(false);

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
          <q-btn push color="white" text-color="grey-9" round>
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
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
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
</style>
