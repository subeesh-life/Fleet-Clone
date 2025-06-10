<script setup lang="ts">
import { ref } from 'vue'
import VehiclePlate from 'src/components/shared/card/VehiclePlate.vue'

const vehicleDrawer = ref(false)
const maximizedToggle = ref(false)
const selectedVehicles = ref([])
const searchVehicles = ref('')


</script>
<template>
  <q-card-section class="q-mt-md q-pa-none">
    <div class="row items-center">
      <div class="col-md-6 col-sm-12">
        <div class="text-subtitle2 text-grey-9">Add Vehicle</div>
      </div>
      <div class="col-md-6 col-sm-12 flex justify-end">
        <div class="flex items-center">
          <q-btn flat dense padding="xs" class="q-ml-xs" @click="vehicleDrawer = true">
            <q-tooltip>Add Vehicle</q-tooltip>
            <iconify-icon icon="hugeicons:add-circle-half-dot" width="24px" height="24px" class="text-secondary" />
          </q-btn>
        </div>
      </div>
    </div>
  </q-card-section>

  <q-dialog persistent v-model="vehicleDrawer" :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="window-height	window-width" col-md-12 col-xs-12>
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="flex items-center">
              <div class="text-h6 text-weight-bold q-mr-sm">Add Vehicle </div>
              <FleetChips text="For All Stops" color="success" :iconVisibility="false" />
            </div>
            <div class="text-caption text-grey-7">Select the vehicle you wish to add to this event.</div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" />
            <q-btn flat round dense icon="close" @click="vehicleDrawer = false" class="text-grey-7">
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
              <q-table flat outline bordered :rows="[{
                assetCategory: 'Car',
                assetType: 'Sedan',
                vehiclePlate: {
                  plateColor: '#D92D20',
                  seriesCode: 'AD',
                  seriesNumber: '10',
                  uniqueNumber: '38475'
                },
                vehicleDetails: {
                  make: 'Toyota',
                  model: 'Corolla',
                  year: '2020',

                },
                seatingCapacity: '5',
                workingStatus: {
                  status: 'Available',
                  since: '1 day ago'
                }
              }, {
                assetCategory: 'Bus',
                assetType: 'Mini Bus',
                vehiclePlate: {
                  plateColor: '#DC6803',
                  seriesCode: 'DXB',
                  seriesNumber: '11',
                  uniqueNumber: '76542'
                },
                vehicleDetails: {
                  make: 'Mercedes',
                  model: 'Sprinter',
                  year: '2022',

                },
                seatingCapacity: '32',
                workingStatus: {
                  status: 'On Event',
                  since: '7 Minutes ago'
                }
              },
              {
                assetCategory: 'Truck',
                assetType: 'Flat Bed',
                vehiclePlate: {
                  plateColor: '#079455',
                  seriesCode: 'AD',
                  seriesNumber: '18',
                  uniqueNumber: '54389'
                },
                vehicleDetails: {
                  make: 'Ashok Leyland',
                  model: 'Dost',
                  year: '2023',

                },
                seatingCapacity: '2',
                workingStatus: {
                  status: 'Under Maintenance',
                  since: '7 days ago'
                }
              },
              {
                assetCategory: 'Truck',
                assetType: 'Cargo Truck',
                vehiclePlate: {
                  plateColor: '#000000', // Black for commercial
                  seriesCode: 'DXB',
                  seriesNumber: '24',
                  uniqueNumber: '19823'
                },
                vehicleDetails: {
                  make: 'Isuzu',
                  model: 'N-Series',
                  year: '2021'
                },
                seatingCapacity: '3',
                workingStatus: {
                  status: 'Available',
                  since: '2 days ago'
                }
              },
              {
                assetCategory: 'Van',
                assetType: 'Cargo Van',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'SHJ',
                  seriesNumber: '12',
                  uniqueNumber: '45678'
                },
                vehicleDetails: {
                  make: 'Nissan',
                  model: 'Urvan',
                  year: '2020'
                },
                seatingCapacity: '3',
                workingStatus: {
                  status: 'Available',
                  since: '4 hours ago'
                }
              },
              {
                assetCategory: 'Bus',
                assetType: 'Staff Bus',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'AUH',
                  seriesNumber: '31',
                  uniqueNumber: '78901'
                },
                vehicleDetails: {
                  make: 'Ashok Leyland',
                  model: 'Falcon',
                  year: '2023'
                },
                seatingCapacity: '30',
                workingStatus: {
                  status: 'Available',
                  since: '1 day ago'
                }
              },
              {
                assetCategory: 'Truck',
                assetType: 'Tipper',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'DXB',
                  seriesNumber: '45',
                  uniqueNumber: '23456'
                },
                vehicleDetails: {
                  make: 'Mercedes-Benz',
                  model: 'Actros',
                  year: '2022'
                },
                seatingCapacity: '2',
                workingStatus: {
                  status: 'Under Maintenance',
                  since: '2 days ago'
                }
              },
              {
                assetCategory: 'Van',
                assetType: 'Passenger Van',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'SHJ',
                  seriesNumber: '27',
                  uniqueNumber: '65432'
                },
                vehicleDetails: {
                  make: 'Toyota',
                  model: 'Hiace',
                  year: '2021'
                },
                seatingCapacity: '14',
                workingStatus: {
                  status: 'Available',
                  since: '6 hours ago'
                }
              },
              {
                assetCategory: 'Bus',
                assetType: 'Mini Bus',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'DXB',
                  seriesNumber: '19',
                  uniqueNumber: '32109'
                },
                vehicleDetails: {
                  make: 'Fuso',
                  model: 'Rosa',
                  year: '2022'
                },
                seatingCapacity: '26',
                workingStatus: {
                  status: 'On Event',
                  since: '13 Minutes ago'
                }
              },
              {
                assetCategory: 'Truck',
                assetType: 'Refrigerated Truck',
                vehiclePlate: {
                  plateColor: '#000000',
                  seriesCode: 'AUH',
                  seriesNumber: '36',
                  uniqueNumber: '99887'
                },
                vehicleDetails: {
                  make: 'Hino',
                  model: '300 Series',
                  year: '2023'
                },
                seatingCapacity: '3',
                workingStatus: {
                  status: 'Available',
                  since: '1 day ago'
                }
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
                  name: 'assetCategory',
                  label: 'Asset Category',
                  field: 'assetCategory',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'assetType',
                  label: 'Asset Type',
                  field: 'assetType',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'vehiclePlate',
                  label: 'Vehicle Plate',
                  field: 'vehiclePlate',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },

                {
                  name: 'vehicleDetails',
                  label: 'Vehicle Details',
                  field: 'vehicleDetails',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'seatingCapacity',
                  label: 'Seating Capacity',
                  field: 'seatingCapacity',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },
                {
                  name: 'workingStatus',
                  label: 'Working Status',
                  field: 'workingStatus',
                  sortable: true,
                  align: 'left',
                  headerClasses: 'bg-grey-2',
                },


              ]" row-key="client" :pagination="{ rowsPerPage: 7 }" :rows-per-page-options="[5, 7, 10]">
                <template v-slot:top>
                  <div class="row items-center full-width ">

                    <div class="col-12">
                      <q-input v-model="searchVehicles" dense outlined
                        placeholder="Search by category, type, or vehicle details" class="full-width">
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
                    <q-radio v-model="selectedVehicles" :val="props.row.vehiclePlate" dense class="no-outline" />
                  </q-td>
                </template>

                <template v-slot:body-cell-assetCategory="props">
                  <q-td>
                    <div class="text-caption text-weight-medium q-pl-sm">{{
                      props.row.assetCategory }}</div>
                  </q-td>
                </template>

                <template v-slot:body-cell-assetType="props">
                  <q-td>
                    <div class=" text-weight-medium q-pl-sm">{{
                      props.row.assetType }}</div>
                  </q-td>
                </template>

                <template v-slot:body-cell-vehiclePlate="props">
                  <q-td>
                    <VehiclePlate :plateColor="props.row.vehiclePlate.plateColor"
                      :seriesCode="props.row.vehiclePlate.seriesCode"
                      :seriesNumber="props.row.vehiclePlate.seriesNumber"
                      :uniqueNumber="props.row.vehiclePlate.uniqueNumber" />
                  </q-td>
                </template>

                <template v-slot:body-cell-vehicleDetails="props">
                  <q-td>
                    <div class="text-caption text-weight-medium q-pl-sm">
                      <q-badge transparent rounded class="bg-grey-3 text-grey-7 text-weight-bold text-caption">
                        {{ props.row.vehicleDetails.year }}
                      </q-badge>
                    </div>
                    <div class="text-caption text-weight-medium q-pl-sm">{{ props.row.vehicleDetails.make }}, {{
                      props.row.vehicleDetails.model }}</div>
                  </q-td>
                </template>

                <template v-slot:body-cell-seatingCapacity="props">
                  <q-td>
                    <div class="row items-center">
                      <iconify-icon icon="hugeicons:airplane-seat" width="24px" height="24px" class="text-grey-7" />
                      <span class="text-caption text-weight-medium q-pl-sm">
                        {{ props.row.seatingCapacity }}
                      </span>
                    </div>

                  </q-td>
                </template>

                <template v-slot:body-cell-workingStatus="props">
                  <q-td>
                    <div class="text-body2 text-weight-medium q-pl-sm"
                      :class="{ 'text-positive': props.row.workingStatus.status === 'Available', 'text-negative': props.row.workingStatus.status === 'Under Maintenance', 'text-warning': props.row.workingStatus.status === 'On Event' }">
                      {{ props.row.workingStatus.status }}
                    </div>
                    <div class="row text-caption text-weight-medium q-pl-sm text-grey-7">
                      Since {{ props.row.workingStatus.since }}
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