<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

// Computed property for v-model handling
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const tripStartReminder = ref(1)
const activeGroup = ref('driver')
</script>
<template>
  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="isOpen"
    position="right"
    :full-height="true"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'min-width: 900px; max-width: 60vw'">
      <q-card-section :class="$q.screen.lt.sm ? 'q-pa-md q-pb-none' : 'q-pb-none'">
        <div
          class="row items-start justify-between"
          :class="$q.screen.lt.sm ? 'q-col-gutter-y-md' : ''"
        >
          <div :class="$q.screen.lt.sm ? 'col-6' : 'col-6'">
            <div class="text-h6 text-weight-bold">Predefined Threshold</div>
            <div class="text-caption text-grey-7">Configure the threshold for the event.</div>
          </div>
          <div
            :class="{ 'col-6 row justify-end': $q.screen.lt.sm }"
            class="row items-center q-gutter-x-md"
          >
            <q-btn color="primary" label="Apply" />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="emit('update:modelValue', false)"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>

      <div class="q-pa-md">
        <q-list bordered>
          <q-expansion-item
            group="somegroup"
            default-opened
            :header-class="
              activeGroup === 'driver'
                ? 'bg-secondary text-white text-weight-bold'
                : 'text-weight-medium'
            "
            :expand-icon-class="activeGroup === 'driver' ? 'text-white' : ''"
            @show="activeGroup = 'driver'"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <IconifyIcon icon="healthicons:truck-driver-outline" width="30px" height="30px" />
              </q-item-section>
              <q-item-section> Driver Mobile App </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Trip Start Reminder</div>
                    <div class="text-caption text-grey-7">
                      Notify drivers to start their assigned trip in advance of the scheduled
                      departure time.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Time Allowed to Start a Trip</div>
                    <div class="text-caption text-grey-7">
                      Set the allowable time period for a trip to begin prior to its scheduled
                      departure time.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Time Allowed to Complete a Trip</div>
                    <div class="text-caption text-grey-7">
                      Set the grace period allowed for a trip to be completed after its scheduled
                      completion time.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Driver Readiness</div>
                    <div class="text-caption text-grey-7">
                      Specify the time period a driver is required to be ready before the trip's
                      scheduled departure. Includes checking in, vehicle preparation, and necessary
                      pre-trip inspections.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            :header-class="
              activeGroup === 'assets'
                ? 'bg-secondary text-white text-weight-bold'
                : 'text-weight-medium'
            "
            :expand-icon-class="activeGroup === 'assets' ? 'text-white' : ''"
            @show="activeGroup = 'assets'"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <IconifyIcon icon="hugeicons:bus-03" width="24px" height="24px" />
              </q-item-section>
              <q-item-section> Assets </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Minimum Allowed Speed</div>
                    <div class="text-caption text-grey-7">
                      Set the minimum speed limit permitted for the assigned asset.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="km/h"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Maximum Allowed Speed</div>
                    <div class="text-caption text-grey-7">
                      Set the maximum speed limit permitted for the assigned asset.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="km/h"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Vehicle Readiness</div>
                    <div class="text-caption text-grey-7">
                      Specify the time period a driver is required to be ready before the trip's
                      scheduled departure. Includes checking in, vehicle preparation, and necessary
                      pre-trip inspections.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            :header-class="
              activeGroup === 'stops'
                ? 'bg-secondary text-white text-weight-bold'
                : 'text-weight-medium'
            "
            :expand-icon-class="activeGroup === 'stops' ? 'text-white' : ''"
            @show="activeGroup = 'stops'"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <IconifyIcon icon="hugeicons:stop" width="24px" height="24px" />
              </q-item-section>
              <q-item-section> Stops </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Automatic Stop Grouping Within</div>
                    <div class="text-caption text-grey-7">
                      Group nearby stops automatically within the specified distance.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="meters"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Wrong Pickup Radius</div>
                    <div class="text-caption text-grey-7">
                      Set the maximum allowable distance from the scheduled pickup point within
                      which a driver can incorrectly mark a pickup as completed.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="meters"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Wrong Dropoff Radius</div>
                    <div class="text-caption text-grey-7">
                      Define the maximum distance from the intended dropoff point where a dropoff
                      can still be considered valid.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="meters"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            :header-class="
              activeGroup === 'delay'
                ? 'bg-secondary text-white text-weight-bold'
                : 'text-weight-medium'
            "
            :expand-icon-class="activeGroup === 'delay' ? 'text-white' : ''"
            @show="activeGroup = 'delay'"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <IconifyIcon icon="hugeicons:stop-watch" width="24px" height="24px" />
              </q-item-section>
              <q-item-section> Delay & Others </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Allowed Delay To Start</div>
                    <div class="text-caption text-grey-7">
                      Define the maximum time a trip can be delayed beyond its scheduled start time
                      without incurring penalties or re-scheduling.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Allowed Delay To Finish</div>
                    <div class="text-caption text-grey-7">
                      Set the maximum time that an activity or trip can extend beyond its scheduled
                      completion time without consequences.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Route Geo Popup</div>
                    <div class="text-caption text-grey-7">
                      Specify the distance threshold in meters within which a route-related popup
                      should be triggered.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="meters"
                    />
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="row items-center">
                  <div class="col-10">
                    <div class="text-subtitle2 text-grey-9">Trip Threshold</div>
                    <div class="text-caption text-grey-7">
                      Define the limits for acceptable trip parameters such as duration, speed, and
                      delays. Exceeding these limits triggers alerts or actions to ensure trips
                      adhere to safety and efficiency standards.
                    </div>
                  </div>
                  <div class="col-2">
                    <q-input
                      type="number"
                      outlined
                      dense
                      v-model="tripStartReminder"
                      suffix="min"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>
