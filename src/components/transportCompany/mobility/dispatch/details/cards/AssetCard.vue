<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('vehicles');
import VehiclePlate from 'components/shared/card/VehiclePlate.vue'

</script>
<template>
  <q-card flat bordered class="q-pa-xs  full-width">
    <q-card-section class="q-pa-none">
        <q-tabs v-model="activeTab" dense align="justify" class="tab-style" inline-label no-caps active-color="white"
          indicator-color="primary" active-bg-color="primary">
          <q-tab name="vehicles" :class="{ 'bg-grey-2': activeTab !== 'vehicles' }">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:bus-03" width="24px" height="24px" class="q-mr-sm" />
              <span>Vehicles</span>
            </template>
          </q-tab>
          <q-tab name="drivers" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'drivers' }">
            <template v-slot:default>
              <IconifyIcon icon="healthicons:truck-driver-outline" width="24px" height="24px" class="q-mr-sm " />
              <span>Drivers</span>
            </template>
          </q-tab>
          <q-tab name="assistants" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'assistants' }">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:user-square" width="24px" height="24px" class="q-mr-sm " />
              <span>Assistants</span>
            </template>
          </q-tab>
          <q-tab name="staff" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'staff' }">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:user-account" width="24px" height="24px" class="q-mr-sm " />
              <span>Staff</span>
            </template>
          </q-tab>
        </q-tabs>

        <q-tab-panels v-model="activeTab" animated>
          <!-- Existing Client Selection-->
          <q-tab-panel name="vehicles" class="q-pa-none cursor-pointer">
            <div class="row q-pa-sm flex items-center justify-between">
              <div class="col-2">
                <VehiclePlate />
              </div>
              <div class="col-5 ">
                <div class="text-caption text-weight-medium">
                      <q-badge transparent rounded class="bg-grey-3 text-grey-7 text-weight-bold text-caption">
                        2025
                      </q-badge>
                    </div>
                    <div class="text-caption text-weight-medium ">Mercedes, Sprinter </div>
                    <q-tooltip>Bus, Mini Bus</q-tooltip>
              </div>
              <div class="col-4">
                <div class="text-body2 text-weight-medium text-right text-positive">
                      Available
                    </div>
                    <div class="text-caption text-weight-medium text-right text-grey-7">
                      Since 17 Minutes ago
                    </div>
              </div>
            </div>

          </q-tab-panel>
          <!-- New Client Creation-->

        </q-tab-panels>
      </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">

</style>