<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('lineView');
import LineView from '../routeInfo/routes/LineView.vue';
</script>
<template>
  <q-tabs
    v-model="activeTab"
    dense
    align="justify"
    class="tab-style"
    inline-label
    no-caps
    active-color="white"
    indicator-color="primary"
    active-bg-color="primary"
  >
    <q-tab name="lineView" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'lineView' }">
      <template v-slot:default>
        <IconifyIcon icon="hugeicons:navigator-01" width="24px" height="24px" class="q-mr-sm" />
        <span>Line View</span>
      </template>
    </q-tab>
    <q-tab name="mapView" :class="{ 'bg-grey-2': activeTab !== 'mapView' }">
      <template v-slot:default>
        <IconifyIcon icon="hugeicons:maps-location-02" width="24px" height="24px" class="q-mr-sm" />
        <span>Map View</span>
      </template>
    </q-tab>
  </q-tabs>

  <q-tab-panels v-model="activeTab" animated>
    <q-tab-panel name="mapView" class="q-pa-none q-pt-md">
      <LineView />
    </q-tab-panel>
    <q-tab-panel name="lineView" class="q-pa-none q-pt-md">
      <LineView />
    </q-tab-panel>
  </q-tab-panels>
</template>
