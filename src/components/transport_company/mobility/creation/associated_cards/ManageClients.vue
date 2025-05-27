<script setup lang="ts">
import { ref } from 'vue'

const clientStopSelection = ref('forAllStops')
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
            <div class="flex items-center">
              <q-tooltip>Add Client</q-tooltip>
              <iconify-icon
                icon="hugeicons:add-circle-half-dot"
                width="24px"
                height="24px"
                class="text-secondary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-sm">
        <div class="q-pa-none">
          <div class="q-gutter-md">
            <q-radio
              v-model="clientStopSelection"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="forAllStops"
              label="For All Stops"
            >
              <q-tooltip self="top start"> Selected </q-tooltip>
            </q-radio>
            <q-radio
              v-model="clientStopSelection"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="withinStops"
              label="Within Stops"
            >
            </q-radio>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
