<script setup lang="ts">
import { ref } from 'vue'
import { QBtnDropdown } from 'quasar'
import OneDayScheduleDrawer from './OneDayScheduleDrawer.vue'
import CustomScheduleDrawer from './CustomScheduleDrawer.vue'

const oneDayScheduleEventDrawer = ref(false)
const customScheduleEventDrawer = ref(false)
const dropdownRef = ref<QBtnDropdown | null>(null)

const oneDayScheduleDrawer = () => {
  oneDayScheduleEventDrawer.value = true
  dropdownRef.value?.hide()
}

const customScheduleDrawer = () => {
  customScheduleEventDrawer.value = true
  dropdownRef.value?.hide()
}
</script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section class="q-py-sm" style="background-color: var(--fleet-color-gray-true-200)">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <iconify-icon
              icon="hugeicons:calendar-03"
              width="24px"
              height="24px"
              class="text-grey-7"
            />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">Schedule Event</div>
          </div>
          <div>
            <q-btn-dropdown ref="dropdownRef" rounded color="primary" label="One Day">
              <q-list padding>
                <q-item clickable v-ripple @click="oneDayScheduleDrawer">
                  <q-item-section>
                    <q-item-label>One Day Schedule</q-item-label>
                    <q-item-label caption>Efficient for Single-Day Trips</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item clickable v-ripple @click="customScheduleDrawer">
                  <q-item-section>
                    <q-item-label>Custom Schedule</q-item-label>
                    <q-item-label caption>Flexible to Meet Specific Requirements</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-py-sm">
        <div class="row items-center">
          <div class="col-12 flex items-center justify-between q-gutter-x-sm">
            <div class="text-subtitle2 text-grey-7">Client Schedule</div>
            <div class="text-subtitle2 text-grey-7 flex items-center">
              <q-btn flat dense padding="xs" class="q-ml-xs" @click="oneDayScheduleDrawer">
                <q-tooltip>Edit</q-tooltip>
                <iconify-icon
                  icon="hugeicons:edit-02"
                  width="24px"
                  height="24px"
                  class="text-secondary"
                />
              </q-btn>
            </div>
          </div>
          <div class="col-12 q-pt-sm row items-center justify-between">
            <div class="col-6 flex items-center">
              <iconify-icon
                icon="hugeicons:calendar-04"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">Thu, Feb 20, 2025</div>
              <q-tooltip>Scheduled Date </q-tooltip>
            </div>
            <div class="col-3 flex items-center">
              <iconify-icon
                icon="hugeicons:play"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">7:30 am</div>
              <q-tooltip>Scheduled Start Time </q-tooltip>
            </div>
            <div class="col-3 flex items-center">
              <iconify-icon
                icon="hugeicons:stop"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">8:25 am</div>
              <q-tooltip>Scheduled End Time </q-tooltip>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-py-sm">
        <div class="row items-center">
          <div class="col-12 flex items-center justify-between q-gutter-x-sm">
            <div class="text-subtitle2 text-grey-7">Driver Schedule</div>
            <div class="text-subtitle2 text-grey-7 flex items-center">
              <q-btn flat dense padding="xs" class="q-ml-xs" @click="oneDayScheduleDrawer">
                <q-tooltip>Edit</q-tooltip>
                <iconify-icon
                  icon="hugeicons:edit-02"
                  width="24px"
                  height="24px"
                  class="text-secondary"
                />
              </q-btn>
            </div>
          </div>
          <div class="col-12 q-pt-sm row items-center justify-between">
            <div class="col-6 flex items-center">
              <iconify-icon
                icon="hugeicons:calendar-04"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">Thu, Feb 20, 2025</div>
              <q-tooltip>Scheduled Date </q-tooltip>
            </div>
            <div class="col-3 flex items-center">
              <iconify-icon
                icon="hugeicons:play"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">7:15 am</div>
              <q-tooltip>Scheduled Start Time </q-tooltip>
            </div>
            <div class="col flex items-center">
              <iconify-icon
                icon="hugeicons:stop"
                width="16px"
                height="16px"
                class="text-grey-7 q-mr-xs"
              />
              <div class="text-caption text-grey-9 text-weight-bold">8:30 am</div>
              <q-tooltip>Scheduled End Time </q-tooltip>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- Drawer Components -->
  <OneDayScheduleDrawer v-model="oneDayScheduleEventDrawer" />
  <CustomScheduleDrawer v-model="customScheduleEventDrawer" />
</template>
