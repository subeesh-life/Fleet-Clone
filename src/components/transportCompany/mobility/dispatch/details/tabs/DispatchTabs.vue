<script setup lang="ts">
import { ref } from 'vue';
const tab = ref('details');
import TabDetails from './details/TabDetails.vue';
import TabRouteInfo from './routeInfo/TabRouteInfo.vue';
</script>
<template>
  <q-card flat bordered class="q-pa-xs full-width">
    <q-card-section class="q-pa-none">
      <div class="row">
        <div class="col-md-12 col-xs-12 bg-white rounded-borders q-pa-md">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            style="border-bottom: 1px solid #e0e0e0"
          >
            <q-tab name="details" class="flex">
              <template v-slot:default>
                <IconifyIcon icon="hugeicons:more" width="24px" height="24px" class="q-mb-xs" />
                <div class="row items-center">Details</div>
              </template>
            </q-tab>

            <q-tab name="route-details" class="flex">
              <template v-slot:default>
                <IconifyIcon icon="hugeicons:route-02" width="24px" height="24px" class="q-mb-xs" />
                <div class="row items-center">Routes</div>
              </template>
            </q-tab>

            <q-tab name="dvir" class="flex">
              <template v-slot:default>
                <IconifyIcon
                  icon="hugeicons:check-list"
                  width="24px"
                  height="24px"
                  class="q-mb-xs"
                />
                <div class="row items-center">DVIR</div>
              </template>
            </q-tab>

            <q-tab name="alerts" class="flex">
              <template v-slot:default>
                <IconifyIcon
                  icon="hugeicons:notification-01"
                  width="24px"
                  height="24px"
                  class="q-mb-xs"
                />
                <div class="row items-center">Notifications</div>
              </template>
            </q-tab>

            <q-tab name="billing" class="flex">
              <template v-slot:default>
                <IconifyIcon
                  icon="hugeicons:invoice-02"
                  width="24px"
                  height="24px"
                  class="q-mb-xs"
                />
                <div class="row items-center">Billing</div>
              </template>
            </q-tab>

            <q-tab name="cost" class="flex">
              <template v-slot:default>
                <IconifyIcon
                  icon="hugeicons:dollar-02"
                  width="24px"
                  height="24px"
                  class="q-mb-xs"
                />
                <div class="row items-center">Cost</div>
              </template>
            </q-tab>

            <q-tab name="expenses" class="flex">
              <template v-slot:default>
                <IconifyIcon
                  icon="hugeicons:credit-card"
                  width="24px"
                  height="24px"
                  class="q-mb-xs"
                />
                <div class="row items-center">Expenses</div>
              </template>
            </q-tab>

            <q-tab name="logs" class="flex">
              <template v-slot:default>
                <IconifyIcon icon="hugeicons:clock-02" width="24px" height="24px" class="q-mb-xs" />
                <div class="row items-center">Logs</div>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="details" class="q-px-none q-pb-none">
              <TabDetails />
            </q-tab-panel>
            <q-tab-panel name="route-details" class="q-px-none q-pb-none">
              <TabRouteInfo />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
