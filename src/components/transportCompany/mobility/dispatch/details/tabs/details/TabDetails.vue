<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('estimation');
import EstimatedKPIs from './KPIs/EstimatedKPIs.vue'
</script>
<template>
   <q-tabs v-model="activeTab" dense align="justify" class="tab-style" inline-label no-caps active-color="white"
        indicator-color="primary" active-bg-color="primary">
        <q-tab name="estimation" :class="{ 'bg-grey-2': activeTab !== 'estimation' }">
          <template v-slot:default>
            <IconifyIcon icon="hugeicons:information-square" width="24px" height="24px" class="q-mr-sm" />
            <span>Estimation</span>
          </template>
        </q-tab>
        <q-tab name="actual" v-model="activeTab" :class="{ 'bg-grey-2': activeTab !== 'actual' }">
          <template v-slot:default>
            <IconifyIcon icon="hugeicons:checkmark-circle-01" width="24px" height="24px" class="q-mr-sm " />
            <span>Actual</span>
          </template>
        </q-tab>

      </q-tabs>

  <q-tab-panels v-model="activeTab" animated>
        <!-- Vehicles Tab-->
        <q-tab-panel name="estimation" class="q-pa-none q-pt-md">
          <EstimatedKPIs  />
        </q-tab-panel>
    </q-tab-panels>
</template>