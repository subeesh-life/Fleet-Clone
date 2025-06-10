<script setup lang="ts">
import { ref } from 'vue'

const driverDrawer = ref(false)
const searchDrivers = ref('')
const maximizedToggle = ref(false)
const selectedDrivers = ref([])
</script>
<template>
  <q-card-section class="q-mt-md q-pa-none">
    <div class="row items-center">
      <div class="col-6">
        <div class="text-subtitle2 text-grey-9">Add Driver</div>
      </div>
      <div class="col-6 flex justify-end">
        <div class="flex items-center">
          <q-btn flat dense padding="xs" class="q-ml-xs" @click="driverDrawer = true">
            <q-tooltip>Select Driver</q-tooltip>
            <iconify-icon icon="hugeicons:add-circle-half-dot" width="24px" height="24px" class="text-secondary" />
          </q-btn>
        </div>
      </div>
    </div>
  </q-card-section>

  <q-dialog persistent v-model="driverDrawer" :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="window-height window-width" col-md-12 col-xs-12>
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="flex items-center">
              <div class="text-h6 text-weight-bold q-mr-sm">Add Driver</div>
              <FleetChips text="For All Stops" color="success" :iconVisibility="false" />
            </div>
            <div class="text-caption text-grey-7">
              Select the driver you wish to add to this event.
            </div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" />
            <q-btn flat round dense icon="close" @click="driverDrawer = false" class="text-grey-7">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row q-py-sm">
          <div class="col-md-12 col-sm-12 bg-grey-1">
            <q-card-section>
              <q-table flat outline bordered :rows="[
                {
                  driverDetails: {
                    firstName: 'John',
                    lastName: 'Doe',
                    id: '#4D96F2',
                    phone: '+971 50 123 4567',
                    email: 'john.doe@example.com',
                    image: 'https://i.pravatar.cc/150?img=59',
                  },
                  hosRemainingHours: '7 Hours 10 Minutes',
                  driverPositionLevel: {
                    position: 'Senior Driver',
                    level: 'Level 2',
                  },
                  status: 'Available',
                },
                {
                  driverDetails: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    id: '#7G76F9',
                    phone: '+971 50 123 4568',
                    email: 'jane.smith@example.com',
                    image: 'https://i.pravatar.cc/150?img=52',
                  },
                  hosRemainingHours: '3 Hours 17 Minutes',
                  driverPositionLevel: {
                    position: 'Junior Driver',
                    level: 'Level 1',
                  },
                  status: 'On Event',
                },
                {
                  driverDetails: {
                    firstName: 'Irfan',
                    lastName: 'Khan',
                    id: '#4D96F3',
                    phone: '+971 50 123 4569',
                    email: 'irfan.khan@example.com',
                    image: 'https://i.pravatar.cc/150?img=12',
                  },
                  hosRemainingHours: '2 Hours 43 Minutes',
                  driverPositionLevel: {
                    position: 'Senior Driver',
                    level: 'Level 2',
                  },
                  status: 'Available',
                },
                {
                  driverDetails: {
                    firstName: 'Rajesh',
                    lastName: 'Kumar',
                    id: '#4D96F4',
                    phone: '+971 50 123 4567',
                    email: 'rajesh.kumar@example.com',
                    image: 'https://i.pravatar.cc/150?img=13',
                  },
                  hosRemainingHours: '1 Hour 23 Minutes',
                  driverPositionLevel: {
                    position: 'Junior Driver',
                    level: 'Level 1',
                  },
                  status: 'Available',
                },
              ]" :columns="[
                {
                  name: 'select',
                  label: '',
                  field: 'select',
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'driverDetails',
                  label: 'Details',
                  field: 'driverDetails',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'hosRemainingHours',
                  label: 'HOS Remaining Hours',
                  field: 'hosRemainingHours',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'driverPositionLevel',
                  label: 'Position & Level',
                  field: 'driverPositionLevel',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },

                {
                  name: 'status',
                  label: 'Status',
                  field: 'status',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
              ]" row-key="client" :pagination="{ rowsPerPage: 7 }" :rows-per-page-options="[5, 7, 10]">
                <template v-slot:top>
                  <div class="row items-center full-width">
                    <div class="col-12">
                      <q-input v-model="searchDrivers" dense outlined
                        placeholder="Search by driver name, ID, or phone number" class="full-width">
                        <template v-slot:prepend>
                          <IconifyIcon icon="hugeicons:search-02" width="24px" height="24px" class="text-grey-8" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <q-separator class="q-my-md" />
                </template>

                <template v-slot:body-cell-select="props">
                  <q-td>
                    <q-radio v-model="selectedDrivers" :val="props.row.driverDetails.id" dense class="no-outline" />
                  </q-td>
                </template>

                <template v-slot:body-cell-driverDetails="props">
                  <q-td>
                    <div class="row items-center">
                      <q-avatar size="40px" color="primary" text-color="white">
                        <img :src="props.row.driverDetails.image" />
                      </q-avatar>
                      <div class="column">
                        <div class="text-body2 text-weight-medium q-pl-sm">
                          {{ props.row.driverDetails.firstName }}
                          {{ props.row.driverDetails.lastName }}
                        </div>
                        <div class="row items-center q-pl-sm">
                          <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                            {{ props.row.driverDetails.id }}
                          </q-chip>
                          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                            class="q-mr-sm bg-white">
                            <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
                            <q-tooltip>{{ props.row.driverDetails.phone }}</q-tooltip>
                          </q-chip>
                          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f"
                            class="q-mr-sm bg-white">
                            <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px" class="text-grey-8" />
                            <q-tooltip>{{ props.row.driverDetails.email }}</q-tooltip>
                          </q-chip>
                        </div>
                      </div>
                    </div>
                  </q-td>
                </template>

                <template v-slot:body-cell-hosRemainingHours="props">
                  <q-td>
                    <div>
                      {{ props.row.hosRemainingHours }}
                    </div>
                  </q-td>
                </template>
                <template v-slot:body-cell-driverPositionLevel="props">
                  <q-td>
                    <div class="row items-center">
                      <div>
                        {{ props.row.driverPositionLevel.position }}
                        <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                          {{ props.row.driverPositionLevel.level }}
                        </q-chip>
                      </div>
                    </div>
                  </q-td>
                </template>
                <template v-slot:body-cell-status="props">
                  <q-td>
                    <div class="text-body2 text-weight-medium q-pl-sm"
                      :class="{ 'text-positive': props.row.status === 'Available', 'text-negative': props.row.status === 'On Event' }">
                      {{ props.row.status }}
                    </div>
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@media (min-width: 600px) {
  .q-dialog__inner--minimized>div {
    max-width: none;
  }
}
</style>
