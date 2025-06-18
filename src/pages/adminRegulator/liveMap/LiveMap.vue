<script setup lang="ts">
import { ref } from 'vue';
import LiveMapKpis from 'src/components/adminRegulator/liveMap/liveMapKpis.vue';

const showAllCards = ref(false);
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
          <q-breadcrumbs-el label="Live Map" color="text-grey-7" />
        </q-breadcrumbs>
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:arrow-expand-diagonal-01" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Expand KPI's</div>
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
    <div class="q-col-gutter-md">
      <LiveMapKpis :show-all-cards="showAllCards" />
    </div>
  </q-page>
</template>
