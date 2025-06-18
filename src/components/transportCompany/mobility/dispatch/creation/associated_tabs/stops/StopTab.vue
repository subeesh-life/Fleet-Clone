<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const startEndWaitTimePopup = ref(false);
const startEndWaitTime = ref(5);
const startEndWaitTimeType = ref('Minutes');
const withinStopWaitTimePopup = ref(false);
const withinStopWaitTime = ref(2);
const withinStopWaitTimeType = ref('Minutes');
</script>

<template>
  <div>
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col">
            <div class="column q-col-gutter-sm">
              <div class="row items-center">
                <iconify-icon
                  icon="hugeicons:play"
                  width="20px"
                  height="20px"
                  class="text-grey-7 q-mr-xs"
                /><span class="text-subtitle2 text-grey-7">7:30 am </span>
                <q-btn
                  primary
                  outline
                  color="primary"
                  label="Add Start Location"
                  size="sm"
                  class="q-ml-sm"
                />
              </div>

              <div class="row items-center">
                <iconify-icon
                  icon="hugeicons:stop"
                  width="20px"
                  height="20px"
                  class="text-grey-7 q-mr-xs"
                /><span class="text-subtitle2 text-grey-7">8:25 am </span>
                <q-btn
                  color="primary"
                  outline
                  label="Add End Location"
                  size="sm"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-py-sm">
        <div class="col-12 q-pt-sm row items-center justify-between">
          <div class="col flex items-center">
            <iconify-icon
              icon="hugeicons:clock-04"
              width="20px"
              height="20px"
              class="text-grey-7 q-mr-sm"
            />
            <div class="text-caption text-grey-7 text-weight-bold">
              <template v-if="$q.screen.lt.xl">
                Start & End<br />Wait Time:
              </template>
              <template v-else> Start & End Wait Time: </template>
              <span class="text-secondary cursor-pointer"
                >5 mins
                <iconify-icon
                  icon="hugeicons:edit-02"
                  width="16px"
                  height="16px"
                  class="text-secondary q-ml-xs"
                />
                <q-tooltip>Update Time</q-tooltip>
              </span>
              <q-popup-edit
                v-model="startEndWaitTimePopup"
                :cover="false"
                :offset="[0, 10]"
              >
                <div style="max-width: 300px" class="q-pa-sm">
                  <div>
                    <div class="text-subtitle2">
                      Modify Start & End Wait Time
                    </div>
                    <div class="row q-col-gutter-sm q-mt-sm">
                      <div class="col-6">
                        <div class="text-body2 q-pb-xs">Time</div>
                        <q-input
                          dense
                          filled
                          v-model="startEndWaitTime"
                          type="number"
                        />
                      </div>
                      <div class="col-6">
                        <div class="text-body2 q-pb-xs">Duration</div>
                        <q-select
                          dense
                          filled
                          v-model="startEndWaitTimeType"
                          :options="['Minutes', 'Hours']"
                        />
                      </div>
                    </div>
                  </div>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="grey-7" v-close-popup />
                    <q-btn flat label="Update" color="primary" />
                  </q-card-actions>
                </div>
              </q-popup-edit>
            </div>
          </div>
          <div class="col flex items-center">
            <iconify-icon
              icon="hugeicons:clock-05"
              width="20px"
              height="20px"
              class="text-grey-7 q-mr-sm"
            />
            <div class="text-caption text-grey-7 text-weight-bold">
              <template v-if="$q.screen.lt.xl">
                Within stop<br />Wait Time:
              </template>
              <template v-else> Within stop Wait Time: </template>
              <span class="text-secondary cursor-pointer"
                >2 mins
                <iconify-icon
                  icon="hugeicons:edit-02"
                  width="16px"
                  height="16px"
                  class="text-secondary q-ml-xs"
                />
                <q-tooltip>Update Time</q-tooltip>
              </span>
              <q-popup-edit
                v-model="withinStopWaitTimePopup"
                :cover="false"
                :offset="[0, 10]"
              >
                <div style="max-width: 300px" class="q-pa-sm">
                  <div>
                    <div class="text-subtitle2">
                      Modify Within Stop Wait Time
                    </div>
                    <div class="row q-col-gutter-sm q-mt-sm">
                      <div class="col-6">
                        <div class="text-body2 q-pb-xs">Time</div>
                        <q-input
                          dense
                          filled
                          v-model="withinStopWaitTime"
                          type="number"
                        />
                      </div>
                      <div class="col-6">
                        <div class="text-body2 q-pb-xs">Duration</div>
                        <q-select
                          dense
                          filled
                          v-model="withinStopWaitTimeType"
                          :options="['Minutes', 'Hours']"
                        />
                      </div>
                    </div>
                  </div>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="grey-7" v-close-popup />
                    <q-btn flat label="Update" color="primary" />
                  </q-card-actions>
                </div>
              </q-popup-edit>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="stats-section q-py-sm rounded-borders">
        <div class="row flex items-center justify-center">
          <div class="col-4 flex items-center q-gutter-x-sm q-px-md stats-card">
            <iconify-icon
              icon="hugeicons:stop"
              width="20px"
              height="20px"
              class="text-white"
            />
            <div class="text-subtitle2 text-white">0 Stops</div>
          </div>
          <div class="col-4 flex items-center q-gutter-x-sm q-px-md stats-card">
            <iconify-icon
              icon="hugeicons:clock-05"
              width="20px"
              height="20px"
              class="text-white"
            />
            <div class="text-subtitle2 text-white">0 Min</div>
          </div>
          <div class="col-4 flex items-center q-gutter-x-sm q-px-md stats-card">
            <iconify-icon
              icon="hugeicons:route-03"
              width="20px"
              height="20px"
              class="text-white"
            />
            <div class="text-subtitle2 text-white">0 KM</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex column flex-center q-col-gutter-sm">
        <q-img
          src="/public/assets/states/empty-state-loader.svg"
          style="width: 100px; height: 80px"
        />
        <div class="text-h6">No Stops Added Yet!</div>
        <div class="text-body2 text-center text-grey-7">
          Add stops to plan and optimize your route.
          <span class="block q-mt-xs">Click 'Add Stops' to get started.</span>
        </div>
        <div class="flex justify-center q-mt-md">
          <q-btn color="primary" label="Add Stops" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.stats-section {
  background: var(--q-secondary);
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%) -10px
      0,
    linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.05) 25%,
        transparent 25%
      ) -10px
      0,
    linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%);
  background-size: 20px 20px;
  opacity: 0.6;
}

.stats-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-card:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
