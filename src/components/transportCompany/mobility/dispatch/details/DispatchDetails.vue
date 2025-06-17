<script setup lang="ts">
import EventCard from './cards/EventCard.vue';
import AssetCard from './cards/AssetCard.vue';
import ClientCard from './cards/ClientCard.vue';
import LogInformation from 'components/shared/card/LogInformation.vue';
import DispatchTabs from './tabs/DispatchTabs.vue';

</script>
<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center q-mb-md">
      <div class="col-md-4 flex items-center" style="min-height: 42px">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
          <q-breadcrumbs-el label="Mobility" :to="{ name: 'mobility-link' }" class="gt-sm" />
          <q-breadcrumbs-el label="Dispatch" :to="{ name: 'dispatch-link' }" class="gt-sm" />
          <q-breadcrumbs-el label="Listing" :to="{ name: 'dispatch' }" />
          <q-breadcrumbs-el label="Details" color="text-grey-7" />
        </q-breadcrumbs>
      </div>
      <div class="col-md-8 flex justify-end q-gutter-x-md">

        <div class="row q-gutter-x-sm">
          <q-btn flat color="primary" text-color="grey-7" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:filter-horizontal" width="16px" height="16px" class="text-grey-7" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Event Thresold</div>
            </q-tooltip>
          </q-btn>
          <q-btn flat color="primary" text-color="grey-7" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:edit-01" width="16px" height="16px" class="text-grey-7" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Edit</div>
            </q-tooltip>
          </q-btn>
          <q-btn flat color="primary" text-color="grey-7" round :to="{ name: 'dispatch' }">
            <q-icon>
              <IconifyIcon icon="hugeicons:cancel-01" width="16px" height="16px" class="text-grey-7" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Close</div>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-x-md">
      <div class="col-md-4 col-xs-12">
        <EventCard />
        <AssetCard />
        <ClientCard />
        <LogInformation />
      </div>

      <div class="col-md-8 col-xs-12">
        <DispatchTabs />
      </div>
    </div>
  </q-page>
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

// Separate container for the map to apply grayscale</style>
