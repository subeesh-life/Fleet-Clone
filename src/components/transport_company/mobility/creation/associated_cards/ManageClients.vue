<script setup lang="ts">
import { ref } from 'vue'
const clientDrawer = ref(false);
const clientStopSelection = ref('forAllStops')
const activeTab = ref('existing-client')
const maximizedToggle = ref(false)
const clientType = ref('Group')
const searchclientType = ref('')
const selectedClients = ref([])
</script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section class="q-py-sm" style="background-color: var(--fleet-color-gray-true-200)">
        <div class="row items-center">
          <div class="col flex items-center">
            <iconify-icon icon="hugeicons:ai-user" width="24px" height="24px" class="text-grey-7" />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">Manage Client</div>
          </div>
          <div class="col flex justify-end">
            <div class="flex items-center" @click="clientDrawer = true">
              <q-tooltip>Add Client</q-tooltip>
              <iconify-icon icon="hugeicons:add-circle-half-dot" width="24px" height="24px"
                class="text-secondary cursor-pointer" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-sm">
        <div class="q-pa-none">
          <div class="q-gutter-md">
            <q-radio v-model="clientStopSelection" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="forAllStops" label="For All Stops">
              <q-tooltip self="top start"> This option will assign the same client to all stops. </q-tooltip>
            </q-radio>
            <q-radio v-model="clientStopSelection" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="withinStops" label="Within Stops">
              <q-tooltip self="top start"> This option allows you to assign a different client to each stop.
              </q-tooltip>
            </q-radio>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- client Note Drawer -->
  <q-dialog persistent v-model="clientDrawer" :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="column window-height	window-width">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">Add Client</div>
            <div class="text-caption text-grey-7">Select the clients you wish to add to this event.</div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" />
            <q-btn flat round dense icon="close" @click="clientDrawer = false" class="text-grey-7">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-tabs v-model="activeTab" dense align="justify" class="tab-style" inline-label no-caps active-color="white"
          indicator-color="primary" active-bg-color="primary">
          <q-tab name="existing-client">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:ai-user" width="24px" height="24px" class="q-mr-sm" />
              <span>Exisitng Clients</span>
            </template>
          </q-tab>
          <q-tab name="new-client" v-model="activeTab">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:add-circle-half-dot" width="24px" height="24px" class="q-mr-sm " />
              <span>Create New</span>
              <q-tooltip self="top start"> Currently unavailable </q-tooltip>
            </template>
          </q-tab>

        </q-tabs>
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="existing-client" class="q-pa-none q-mt-sm">
            <div class="row q-py-sm">
              <div class="col-md-6 col-sm-12 bg-grey-1">
                <q-card-section>
                  <q-table flat outline bordered :rows="[{
                    client: 'Gems International', subtext: 'Business',
                    type: 'With Revenue'
                  }, {
                    client: 'Emirates International School', subtext: 'Business',
                    type: 'With Revenue'
                  }, {
                    client: 'Abu Dhabi Indian School', subtext: 'Business',
                    type: 'With Revenue'
                  }, {
                    client: 'Al Reem International School', subtext: 'Business',
                    type: 'With Revenue'
                  }, {
                    client: 'Amercian International School', subtext: 'Business',
                    type: 'With Revenue'
                  }, {
                    client: 'Amity International ', subtext: 'Business', type: 'With Revenue'
                  },]" :columns="[
                    {
                      name: 'select',
                      label: '',
                      field: 'select',
                      align: 'left',
                      headerClasses: 'bg-grey-2',
                    },
                    {
                      name: 'client',
                      label: 'Groups',
                      field: 'client',
                      sortable: true,
                      align: 'left',
                      headerClasses: 'bg-grey-2',
                    },

                  ]" row-key="client" :pagination="{ rowsPerPage: 7 }">
                    <template v-slot:top>
                      <div class="row items-center full-width q-col-gutter-x-md">
                        <div class="col-6 q-pl-none">
                          <q-select label="Client Type" v-model="clientType" dense outlined
                            :options="['Group', 'Entity', 'Individual']" />
                        </div>
                        <div class="col-6">
                          <q-input v-model="searchclientType" dense outlined placeholder="Search">
                            <template v-slot:prepend>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <q-separator class="q-my-md" />
                    </template>

                    <template v-slot:body-cell-select="props">
                      <q-td>
                        <q-checkbox v-model="selectedClients" :val="props.row.client" dense class="no-outline" />
                      </q-td>
                    </template>

                    <template v-slot:body-cell-client="props">
                      <q-td>
                        <div class="column">
                          <div class="row items-center">
                            <q-avatar size="40px" color="primary" text-color="white">
                              <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar>
                            <div class="column">
                              <div class="text-body2 text-weight-medium q-pl-sm">{{ props.row.client }}</div>
                              <div class="row items-center q-pl-sm">
                                <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-td>
                    </template>
                  </q-table>
                </q-card-section>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-card-section class="flex column flex-center full-height q-col-gutter-sm">
                  <q-img src="/src/assets/states/empty-state-loader.svg" style="width: 100px; height: 80px" />
                  <div class="text-h6">No Clients Selected Yet!</div>
                  <div class="text-body2 text-center text-grey-7">
                    Select clients to add to this client.
                  </div>
                </q-card-section>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
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
