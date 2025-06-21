<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import FleetTimeRange from 'src/components/shared/FleetTimeRange.vue';

const $q = useQuasar();
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

// Computed property for v-model handling
const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const startDate = ref('');
const copyClientTime = ref(false);
const copyDriverTime = ref(false);
const gracePeriod = ref(0);
</script>

<template>
  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="isOpen"
    position="right"
    :full-height="true"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'min-width: 700px; max-width: 60vw'">
      <q-card-section :class="$q.screen.lt.sm ? 'q-pa-md q-pb-none' : 'q-pb-none'">
        <div
          class="row items-start justify-between"
          :class="$q.screen.lt.sm ? 'q-col-gutter-y-md' : ''"
        >
          <div :class="$q.screen.lt.sm ? 'col-6' : 'col-6'">
            <div class="text-h6 text-weight-bold">One Day Schedule</div>
            <div class="text-caption text-grey-7">Efficient for Single-Day Trips.</div>
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

      <q-card-section class="q-py-none">
        <div class="row items-center">
          <div class="col-md-6 col-xs-12">
            <div>
              <div class="text-subtitle2 text-grey-7">Start Date</div>
              <q-input
                dense
                outlined
                v-model="startDate"
                mask="date"
                :rules="['date']"
                placeholder="Choose Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="startDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div
          class="row items-center q-pa-lg"
          style="
            background-color: var(--fleet-color-blue-light-50);
            border-color: var(--fleet-color-blue-light-200);
            border-width: 1px;
            border-style: solid;
            border-radius: 8px;
          "
        >
          <div class="col-6 flex items-center">
            <iconify-icon
              icon="hugeicons:calendar-04"
              width="24px"
              height="24px"
              class="text-grey-7 q-mr-xs gt-sm"
            />
            <div class="text-grey-9 text-subtitle2">
              Trips for: <span class="text-grey-9 text-weight-bold">1 day</span>
            </div>
          </div>
          <div class="col-6 flex items-center justify-end">
            <iconify-icon
              icon="hugeicons:clock-01"
              width="24px"
              height="24px"
              class="text-grey-7 q-mr-xs gt-sm"
            />
            <div class="text-grey-9 text-subtitle2">
              Estimated Trip Duration:
              <span class="text-grey-9 text-weight-bold">0h 0min</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md q-pt-sm">
        <div class="row items-center">
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Grace Period</div>
            <div class="text-caption text-grey-7">
              Additional time allowed for the trip to start after the scheduled pickup time.
            </div>
          </div>
          <div class="col-6 flex items-center justify-end q-gutter-x-sm">
            <q-btn
              outline
              dense
              padding="xs"
              class="q-ml-xs"
              @click="gracePeriod--"
              :disabled="gracePeriod === 0"
            >
              <q-tooltip>Decrease</q-tooltip>
              <iconify-icon
                icon="hugeicons:minus-sign"
                width="20px"
                height="20px"
                class="text-primary"
              />
            </q-btn>
            <div class="text-subtitle2 text-grey-9">{{ gracePeriod }} min</div>
            <q-btn outline dense padding="xs" class="q-ml-xs" @click="gracePeriod++">
              <q-tooltip>Increase</q-tooltip>
              <iconify-icon
                icon="hugeicons:add-01"
                width="20px"
                height="20px"
                class="text-primary"
              />
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-pa-md q-pt-sm hidden">
        <div class="row items-center">
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Copy Schedule Time</div>
            <div class="text-caption text-grey-7">
              Copy the schedule from the first day to the other weekdays.
            </div>
          </div>
          <div class="col-6 flex items-center justify-end q-gutter-x-sm">
            <div class="text-subtitle2 text-grey-9">
              <q-toggle v-model="copyClientTime" label="Client" />
              <q-toggle v-model="copyDriverTime" label="Driver" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-md q-pt-sm">
        <div class="row items-center q-col-gutter-md">
          <div class="col-md-6 col-xs-12">
            <div class="text-subtitle2 text-grey-9 q-pb-sm">Client Schedule Time</div>
            <div class="row items-center q-gutter-x-sm">
              <q-btn round color="primary" outline dense label="M" />
              <FleetTimeRange />
            </div>
          </div>
          <div class="col-md-6 col-xs-12">
            <div class="text-subtitle2 text-grey-9 q-pb-sm">Driver Schedule Time</div>
            <div class="row items-center q-gutter-x-sm">
              <q-btn round color="primary" outline dense label="M" />
              <FleetTimeRange />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
