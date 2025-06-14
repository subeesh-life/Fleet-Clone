<script setup lang="ts">
import { ref, reactive } from 'vue'
import FleetChips from 'components/shared/chips/FleetChips.vue';
const clientDrawer = ref(false);
const clientSelection = ref('selectiveClients')
const activeTab = ref('existing-client')
const maximizedToggle = ref(false)
const clientType = ref('Group')
const searchclientType = ref('')
const selectedClients = ref([])
const gender = ref('male')
const firstName = ref('')
const lastName = ref('')
const country = ref('United Arab Emirates')
const address = ref('')
const unitNumber = ref('')
const email = ref('')
const countryCode = ref('+971')
const phone = ref('')
const profileType = ref('Passenger')
const manageClients = reactive(
  {
    group: 2,
    entity: 3,
    individual: 17
  }
)
const clearSelection = () => {
  manageClients.group = 0
  manageClients.entity = 0
  manageClients.individual = 0
}

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

            <div class="flex items-center" v-if="clientSelection === 'selectiveClients'" @click="clientDrawer = true">
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
            <q-radio v-model="clientSelection" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="selectiveClients" label="Selective Clients">
              <div class="text-caption text-grey-7">Choose clients for all stops</div>
            </q-radio>
            <!-- <div class="text-subtitle2 text-grey-7">Client Schedule</div> -->
            <q-radio v-model="clientSelection" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="nonSelectiveClients" label="Non-Selective Clients">
              <div class="text-caption text-grey-7">Choose clients when adding a stop</div>
            </q-radio>
          </div>
        </div>
        <q-separator class="q-my-md" v-if="clientSelection === 'selectiveClients'" />
        <div class="row items-center" v-if="clientSelection === 'selectiveClients'">
          <div class="col-md-8 col-sm-12">
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white">{{ manageClients.group }}</q-avatar>Group
            </q-chip>
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white">{{ manageClients.entity }}</q-avatar>Entity
            </q-chip>
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white">{{ manageClients.individual
                }}</q-avatar>Individual
            </q-chip>
          </div>
          <div class="col-md-4 col-sm-12 flex justify-end">
            <span class="text-body2 text-negative cursor-pointer" @click="clearSelection">Clear Selection</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- client Note Drawer -->
  <q-dialog persistent v-model="clientDrawer" :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="window-height	window-width" col-md-12 col-xs-12>
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="flex items-center">
              <div class="text-h6 text-weight-bold q-mr-sm">Add Client </div>
              <FleetChips text="For All Stops" color="success" :iconVisibility="false" />
            </div>
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
          <q-tab name="existing-client" :class="{ 'bg-grey-2': activeTab !== 'existing-client' }">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:ai-user" width="24px" height="24px" class="q-mr-sm" />
              <span>Exisitng Clients</span>
            </template>
          </q-tab>
          <q-tab name="new-client" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'new-client' }">
            <template v-slot:default>
              <IconifyIcon icon="hugeicons:add-circle-half-dot" width="24px" height="24px" class="q-mr-sm " />
              <span>Create New Individual</span>
              <q-tooltip self="top start"> Add a new individual profile.
              </q-tooltip>
            </template>
          </q-tab>
        </q-tabs>

        <q-tab-panels v-model="activeTab" animated>
          <!-- Existing Client Selection-->
          <q-tab-panel name="existing-client" class="q-pa-none q-mt-sm">
            <div class="row q-py-sm">
              <div class="col-md-6 col-sm-12 bg-grey-1">
                <q-card-section>
                  <q-table flat outline bordered :rows="[{
                    client: 'Gems Education', phone: '971501234567', email: 'gems@gmail.com', address: 'Abu Dhabi, UAE',
                    type: 'With Revenue', image: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042019/gems-education.jpg?e4GtceV6NoC8OR0WGuay25bCAtCFT2mT&itok=X-sjpl1A'
                  }, {
                    client: 'Aldar Education', phone: '971501234567', email: 'aldar@gmail.com', address: 'Abu Dhabi, UAE',
                    type: 'With Revenue', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7m5a0bShdDPvaq83WyNe7yOc8pwKRGi6JA&s'
                  }, {
                    client: 'Taaleem', phone: '971501234567', email: 'taaleem@gmail.com', address: 'Dubai, UAE',
                    type: 'With Revenue', image: 'https://media.licdn.com/dms/image/v2/C560BAQFxkDDhvEBnOQ/company-logo_200_200/company-logo_200_200/0/1631354649259?e=2147483647&v=beta&t=hj8QLaKDOcoZV11YwkNh6KdXGNJZOlDGFSpwLa8Dv1g'
                  }, {
                    client: 'Innoventure Education', phone: '971501234567', email: 'innoventure@gmail.com', address: 'Al Ain, UAE',
                    type: 'With Revenue', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXzxA5lNSaiRRrWUorZ3fwjj3tyInVHpKkQ&s'
                  }, {
                    client: 'SABIS Education', phone: '971501234567', email: 'sabis@gmail.com', address: 'Dubai, UAE',
                    type: 'With Revenue', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNO16M1qltXTGNDFCCtmbUPrgw2TMn86NhLQ&s'
                  },
                  {
                    client: 'Bloom Education', phone: '971501234567', email: 'bloom@gmail.com', address: 'Fujairah, UAE',
                    type: 'With Revenue', image: 'https://media.licdn.com/dms/image/v2/D4D0BAQGviDc2oDXAKg/company-logo_200_200/company-logo_200_200/0/1737348691103/bloomeducationllc_logo?e=2147483647&v=beta&t=8R8Y2UiYQN2A4b513ZGwya7vsLc4klPgZqgTttKOUuk'
                  },
                  {
                    client: 'Esol Education', phone: '971501234567', email: 'esol@gmail.com', address: 'Umm Al Quwain, UAE',
                    type: 'With Revenue', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRApFxFWxU0zfVChCYfj8z4zhWC54fpIXkHDQ&s'
                  },
                  {
                    client: 'Athena Education ', phone: '971501234567', email: 'athena@gmail.com', address: 'Dubai, UAE',
                    type: 'With Revenue', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUiOk9owYLBQFLdRuVVG9LTI9aGR5kXQ2EOw&s'
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
                              <img :src="props.row.image">
                            </q-avatar>
                            <div class="column">
                              <div class="text-body2 text-weight-medium q-pl-sm">{{
                                props.row.client }}</div>
                              <div class="row items-center q-pl-sm">
                                <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                                  #4D96F2
                                </q-chip>
                                <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001F;"
                                  class="q-mr-sm bg-white">
                                  <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
                                  <q-tooltip>{{ props.row.phone }}</q-tooltip>
                                </q-chip>
                                <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001F;"
                                  class="q-mr-sm bg-white">
                                  <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px"
                                    class="text-grey-8" />
                                  <q-tooltip>{{ props.row.email }}</q-tooltip>
                                </q-chip>
                                <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001F;"
                                  class="bg-white">
                                  <IconifyIcon icon="hugeicons:location-06" width="16px" height="16px"
                                    class="text-grey-8" />
                                  <q-tooltip>{{ props.row.address }}</q-tooltip>
                                </q-chip>
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

                  <q-img src="src/assets/states/empty-state-loader.svg" style="width: 100px; height: 80px" />
                  <div class="text-h6">No Clients Selected Yet!</div>
                  <div class="text-body2 text-center text-grey-7">
                    Choose Clients from the Available List
                  </div>

                </q-card-section>
              </div>
            </div>
          </q-tab-panel>
          <!-- New Client Creation-->
          <q-tab-panel name="new-client" class="q-pa-none q-mt-sm">
            <div class="row q-py-sm">
              <div class="col-12 ">
                <!--Header Section-->
                <q-card flat bordered class="my-card q-mx-md q-mb-md">
                  <q-card-section class="bg-grey-1">
                    <div class="text-h6">Choose the profile type</div>
                     <div class="text-body2 text-grey-7">Select the profile type you wish to create.</div>
                    <div class="row q-col-gutter-x-md">
                      <div class="col-md-2 col-xs-12 q-mt-sm">
                         <q-select dense outlined v-model="profileType" placeholder="Choose Profile Type"
                          class="bg-white" :options="['Passenger', 'Student', 'Guardian', 'Staff', 'Product']" />
                      </div>
                    </div>
                  </q-card-section>


                </q-card>

                <!--Form Section-->
                <q-card-section>
                  <div class="row q-col-gutter-x-md q-gutter-y-md">
                    <div class="col-md-4 col-xs-12">
                      <div class="text-body2 q-mb-sm">First Name</div>
                      <q-input dense outlined clearable v-model="firstName" placeholder="Enter First Name" />
                    </div>
                    <div class="col-md-4 col-xs-12">
                      <div class="text-body2 q-mb-sm">Last Name</div>
                      <q-input dense outlined clearable v-model="lastName" placeholder="Enter Last Name" />
                    </div>
                    <div class="col-md-4 col-xs-12">
                      <div class="text-body2 q-mb-sm">Choose Gender</div>
                      <q-btn-toggle v-model="gender" class="my-custom-toggle" no-caps rounded unelevated
                        toggle-color="primary" color="white" text-color="primary" :options="[
                          { label: 'Male', value: 'male', class: gender !== 'male' ? 'bg-grey-2' : '' },
                          { label: 'Female', value: 'female', class: gender !== 'female' ? 'bg-grey-2' : '' }
                        ]" />
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <div class="text-body2 q-mb-sm">Country</div>
                      <q-select dense outlined v-model="country" placeholder="Choose Country"
                        :options="['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman']" />
                    </div>
                    <div class="col-md-8 col-xs-12">
                      <div class="text-body2 q-mb-sm">Address</div>
                      <q-input dense outlined clearable v-model="address" placeholder="Search Address">
                        <template v-slot:prepend>
                          <iconify-icon icon="hugeicons:search-02" width="24px" height="24px" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <div class="text-body2 q-mb-sm">Unit Number</div>
                      <q-input dense outlined clearable v-model="unitNumber" placeholder="Enter Unit Number" />
                    </div>
                    <div class="col-md-4 col-xs-12">
                      <div class="text-body2 q-mb-sm">Email</div>
                      <q-input dense outlined clearable v-model="email" placeholder="Enter Email" />
                    </div>
                    <div class="col-md-4 col-xs-12">
                      <div class="text-body2 q-mb-sm">Primary Phone</div>
                      <div class="row q-col-gutter-x-md">
                        <div class="col-md-4 col-xs-4">
                          <q-select dense outlined v-model="countryCode" placeholder="Enter Country Code"
                            :options="['+971', '+972', '+973', '+974', '+975', '+976']">
                            <template v-slot:prepend>
                              <q-avatar size="24px">
                                <q-img class="fit" src="https://flagicons.lipis.dev/flags/4x3/ae.svg" />
                              </q-avatar>
                            </template>
                          </q-select>
                        </div>
                        <div class="col-md-8 col-xs-8">
                          <q-input dense outlined v-model="phone" placeholder="Enter Primary Phone">
                            <template v-slot:append>
                              <iconify-icon icon="hugeicons:add-circle-half-dot" width="24px" height="24px"
                                class="cursor-pointer" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </div>
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
