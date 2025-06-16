<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('vehicles');
import VehiclePlate from 'components/shared/card/VehiclePlate.vue'

</script>
<template>
  <q-card flat bordered class="q-pa-xs q-mb-md full-width">
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
        <!-- Vehicles Tab-->
        <q-tab-panel name="vehicles" class="q-pa-none cursor-pointer">
          <div class="row q-pa-sm flex items-center">
            <div class="col-8 flex items-center">
              <VehiclePlate />
              <div class="q-ml-md">
                <div>
                  <q-badge transparent rounded class="bg-grey-3 text-grey-7 text-weight-bold text-caption">
                    2025
                    <q-chip color="primary" text-color="white" size="sm" class="q-ml-sm">
                      Primary Vehicle
                    </q-chip>
                  </q-badge>
                </div>
                <div class="text-caption text-weight-medium flex items-center">Mercedes, Sprinter
                </div>
                <q-tooltip>Bus, Mini Bus</q-tooltip>
              </div>
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

        <!-- Drivers Tab-->
        <q-tab-panel name="drivers" class="q-pa-none cursor-pointer">
          <div class="row q-pa-sm flex items-center">
            <div class="col-8">
              <div class="row flex items-center">
                <q-avatar size="40px" color="primary" text-color="white">
                  <img src="https://i.pravatar.cc/150?img=59" />
                </q-avatar>
                <div class="column">
                  <div class="text-body2 text-weight-medium q-pl-sm">
                    John Doe
                  </div>
                  <div class="row items-center q-pl-sm">
                    <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                      #4D96F2
                    </q-chip>
                    <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                      class="q-mr-sm bg-white">
                      <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
                      <q-tooltip>+971 50 123 4567</q-tooltip>
                    </q-chip>
                    <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                      class="q-mr-sm bg-white">
                      <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px" class="text-grey-8" />
                      <q-tooltip>john.doe@example.com</q-tooltip>
                    </q-chip>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 ">
              <div class="text-body2 text-weight-medium text-right text-positive">
                Available
              </div>
              <div class="text-caption text-weight-medium text-right text-grey-7">
                Since 41 Minutes ago
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Assistants Tab-->
        <q-tab-panel name="assistants" class="q-pa-none cursor-pointer">
          <div class="row q-pa-sm flex items-center">
            <div class="col-12 text-center q-pa-md">
              <div class="text-body2 text-weight-medium text-grey-7">No assistant added yet!</div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Staff Tab-->
        <q-tab-panel name="staff" class="q-pa-none cursor-pointer">
          <div class="row q-pa-sm flex items-center">
            <div class="col-12 text-center q-pa-md">
              <div class="text-body2 text-weight-medium text-grey-7">No staff added yet!</div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss"></style>