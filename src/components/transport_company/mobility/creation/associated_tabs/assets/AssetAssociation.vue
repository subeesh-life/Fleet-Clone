<script setup lang="ts">
import { ref } from 'vue'

const assetAssociationDrawer = ref(false)
const confirmedAssetAssociation = ref('')
const selectedAssetName = ref('Vehicles')
const assetNames = ref([{ label: 'Vehicles', value: 'vehicles' }])
const selectedAssetCategory = ref('Bus')
const assetCategories = ref([
  { label: 'Bus', value: 'bus' },
  { label: 'Car', value: 'car' },
  { label: 'Van', value: 'van' },
  { label: 'Bike', value: 'bike' },
  { label: 'Other', value: 'other' },
])
const selectedAssetType = ref('Mini Bus')
const assetTypes = ref([
  { label: 'Mini Bus', value: 'mini-bus' },
  { label: 'Standard Bus', value: 'standard-bus' },
  { label: 'Double Decker Bus', value: 'double-decker-bus' },
  { label: 'Coach', value: 'coach' },
  { label: 'Other', value: 'other' },
])
</script>

<template>
  <q-card-section class="q-py-sm q-px-none">
    <div class="row items-center">
      <div class="col-6">
        <div class="text-subtitle2 text-grey-9">Asset Association</div>
      </div>
      <div class="col-6 flex justify-end">
        <div class="flex items-center">
          <q-btn flat dense padding="xs" class="q-ml-xs" @click="assetAssociationDrawer = true">
            <q-tooltip>{{
              confirmedAssetAssociation ? 'Change Association' : 'Add Association'
              }}</q-tooltip>
            <iconify-icon :icon="confirmedAssetAssociation ? 'hugeicons:reload' : 'hugeicons:add-circle-half-dot'
              " width="24px" height="24px" class="text-secondary" />
          </q-btn>
        </div>
      </div>
    </div>
  </q-card-section>


  <q-dialog persistent backdrop-filter="blur(2px)" v-model="assetAssociationDrawer" position="right"
    :full-height="true">
    <q-card style="width: 500px" class="column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div class="col-8">
            <div class="text-h6 text-weight-bold">Asset Association</div>
            <div class="text-caption text-grey-7">
              Select the appropriate asset corresponding to the chosen service
            </div>
          </div>
          <div class="col-4 flex justify-end q-gutter-x-md">
            <q-btn color="primary" label="Apply" />
            <q-btn flat round dense icon="close" @click="assetAssociationDrawer = false" class="text-grey-7">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Asset Name</div>
            <q-select filled dense disable v-model="selectedAssetName" :options="assetNames" />
          </div>
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Asset Category</div>
            <q-select outlined dense v-model="selectedAssetCategory" :options="assetCategories" />
          </div>
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Asset Type</div>
            <q-select outlined dense v-model="selectedAssetType" :options="assetTypes" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
