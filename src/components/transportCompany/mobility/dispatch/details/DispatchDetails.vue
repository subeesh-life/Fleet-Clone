<script setup lang="ts">
import { ref } from 'vue';
import EventCard from './cards/EventCard.vue';
import AssetCard from './cards/AssetCard.vue';

const tab = ref('all');
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
          <q-btn outline color="primary" text-color="grey-7" round class="gt-sm">
            <q-icon>
              <IconifyIcon icon="hugeicons:filter-horizontal" width="16px" height="16px" class="text-grey-7" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Event Thresold</div>
            </q-tooltip>
          </q-btn>
          <q-btn outline color="primary" text-color="grey-7" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:edit-01" width="16px" height="16px" class="text-grey-7" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Edit</div>
            </q-tooltip>
          </q-btn>
          <q-btn outline color="primary" text-color="grey-7" round :to="{ name: 'dispatch' }">
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
      </div>

      <div class="col-md-8 col-xs-12">
        <q-card flat bordered class="q-pa-xs q-mb-md full-width">
          <q-card-section class="q-pa-none">
            <div class="row">
              <div class="col-md-12 col-xs-12 bg-white rounded-borders q-pa-md">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                  align="justify" narrow-indicator style="border-bottom: 1px solid #e0e0e0">
                  <q-tab name="all" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:more" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Details
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="route-details" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:route-02" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Routes
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="dvir" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:check-list" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        DVIR
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="alerts" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:notification-01" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Notifications
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="billing" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:invoice-02" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Billing
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="cost" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:dollar-02" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Cost
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="expenses" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:credit-card" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Expenses
                      </div>
                    </template>
                  </q-tab>

                  <q-tab name="logs" class="flex">
                    <template v-slot:default>
                      <IconifyIcon icon="hugeicons:clock-02" width="24px" height="24px" class="q-mb-xs" />
                      <div class="row items-center">
                        Logs
                      </div>
                    </template>
                  </q-tab>

                </q-tabs>
              </div>
            </div>
          </q-card-section>
        </q-card>
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
