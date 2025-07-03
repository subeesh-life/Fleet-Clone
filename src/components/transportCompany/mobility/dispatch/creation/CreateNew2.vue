<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import type { QStepper } from 'quasar';

import EventThreshold from './threshold/EventThreshold.vue';
import ConfirmationModal from 'components/shared/modals/ConfirmationModal.vue';
import { useRouter } from 'vue-router';
import FleetTimeRange from 'src/components/shared/FleetTimeRange.vue';
import { useTripsStore } from 'src/modules/trip-management/store/trip.store';

const store = useTripsStore();

// Add computed property for estimated trip duration
const estimatedTripDuration = computed(() => {
  const { timeRange } = store.dateTimeRange;
  const duration = timeRange.max - timeRange.min;

  // Handle case where end time is before start time (crosses midnight)
  const adjustedDuration = duration < 0 ? duration + 24 : duration;

  const hours = Math.floor(adjustedDuration);
  const minutes = Math.round((adjustedDuration - hours) * 60);

  // Format the duration
  const hoursText = hours > 0 ? `${hours}h` : '';
  const minutesText = minutes > 0 ? ` ${minutes}min` : '';

  // If duration is 0, show "0h 0min"
  if (hours === 0 && minutes === 0) {
    return '0h 0min';
  }

  return `${hoursText}${minutesText}`.trim();
});

const showCancelConfirmationModal = ref(false);
const confirmCancellation = async () => {
  await router.push({ name: 'dispatch-listing' });
};
const showDraftConfirmationModal = ref(false);
const step = ref(1);
const stepper = ref<QStepper>();
const eventName = ref('');
const tripMode = ref('one-way-trip');
const eventSchedule = ref('single-day-trip');
const eventStartDate = ref('2025/06/30');
const selectedGroup = ref([]);
const groups = ref([
  { label: 'Gems Willington School', value: 'gems-willington-school' },
  { label: 'Al Dafna School', value: 'al-dafna-school' },
  { label: 'Abu Dhabi Indian School', value: 'abu-dhabi-indian-school' },
  { label: 'Al Mafraq School', value: 'al-mafraq-school' },
  { label: 'Al Mafraq School', value: 'al-mafraq-school' },
]);

const selectedEntity = ref([]);
const entities = ref([
  { label: 'Gems Willington School', value: 'gems-willington-school' },
  { label: 'Al Dafna School', value: 'al-dafna-school' },
  { label: 'Abu Dhabi Indian School', value: 'abu-dhabi-indian-school' },
  { label: 'Al Mafraq School', value: 'al-mafraq-school' },
  { label: 'Al Mafraq School', value: 'al-mafraq-school' },
]);
const selectedIndividual = ref([]);
const individuals = ref([
  { label: 'Ahmed Al Mansouri', value: 'ahmed-al-mansouri' },
  { label: 'Fatima Al Zaabi', value: 'fatima-al-zaabi' },
  { label: 'Mohammed Al Qasimi', value: 'mohammed-al-qasimi' },
  { label: 'Aisha Al Falasi', value: 'aisha-al-falasi' },
  { label: 'Omar Al Suwaidi', value: 'omar-al-suwaidi' },
]);

// Filtered options for autocomplete
const filteredGroups = ref([...groups.value]);
const filteredEntities = ref([...entities.value]);
const filteredIndividuals = ref([...individuals.value]);

const clientSelection = ref(false);

import { L } from 'boot/leaflet';

onMounted(() => {
  setTimeout(() => {
    // Abu Dhabi coordinates: 24.4539° N, 54.3773° E
    const map = L.map('map').setView([24.4539, 54.3773], 4);

    // Using CartoDB's light (grayscale) map with English labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    map.invalidateSize();
  }, 100);
});

const $q = useQuasar();

const eventReferenceId = ref('SWHWLKP');
const prefix = ref('');
const suffix = ref('');
const showPopupEdit = ref(false);
const eventThresholdDrawer = ref(false);
const router = useRouter();
const selectedSubscribedServices = ref('Please select ...');
const subscribedServices = ref([
  { label: 'Please select ...', value: 'Please select ...', disabled: true },
  { label: 'School Transport', value: 'school-transport' },
  { label: 'Employee Transport', value: 'employee-transport' },
  { label: 'Driving Company', value: 'driving-company' },
  { label: 'Other', value: 'other' },
]);
const selectedEventType = ref('Please select ...');
const eventTypes = ref([
  { label: 'Please select ...', value: 'Please select ...', disabled: true },
  { label: 'Home to School', value: 'home-to-school' },
  { label: 'School to Home', value: 'school-to-home' },
  { label: 'School to School', value: 'school-to-school' },
]);

const copyEventReferenceId = async () => {
  try {
    await navigator.clipboard.writeText(eventReferenceId.value);
    $q.notify({
      message: 'Event Reference ID copied to clipboard',
      color: 'positive',
      icon: 'check',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('Failed to copy email:', error);
    $q.notify({
      message: 'Failed to copy Event Reference ID',
      color: 'negative',
      icon: 'error',
      position: 'top',
      timeout: 2000,
    });
  }
};

const updateEventReferenceId = () => {
  showPopupEdit.value = false;
  prefix.value = '';
  suffix.value = '';
};

// Filter methods for QSelect autocomplete
const filterGroups = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      filteredGroups.value = [...groups.value];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredGroups.value = groups.value.filter(
      group => group.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterEntities = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      filteredEntities.value = [...entities.value];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredEntities.value = entities.value.filter(
      entity => entity.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterIndividuals = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      filteredIndividuals.value = [...individuals.value];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredIndividuals.value = individuals.value.filter(
      individual => individual.label.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
<template>
  <q-page class="bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <header class="row flex justify-between items-center bg-white q-pa-md">
      <section class="col-md-6">
        <div class="row items-center">
          <span class="text-h6 text-weight-bold">{{
            $q.screen.gt.sm ? 'Event Reference ID' : 'Event ID'
          }}</span>
          <q-input filled dense v-model="eventReferenceId" class="q-ml-xs" style="width: 100px" />
          <q-btn flat dense padding="xs" class="q-ml-xs" @click="copyEventReferenceId">
            <q-tooltip>Copy</q-tooltip>
            <iconify-icon icon="hugeicons:copy-02" width="16px" height="16px" class="text-grey-7" />
          </q-btn>
          <q-btn flat dense padding="xs" class="q-ml-xs" @click="showPopupEdit = true">
            <q-popup-edit v-model="showPopupEdit" :cover="false" :offset="[0, 10]">
              <section style="max-width: 300px" class="q-pa-sm">
                <div class="text-subtitle2">Modify Event Reference ID</div>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div class="col-12">
                    <q-input dense filled v-model="prefix" label="Prefix" />
                  </div>
                  <div class="col-12">
                    <q-input
                      dense
                      filled
                      v-model="eventReferenceId"
                      label="Reference ID"
                      readonly
                    />
                  </div>
                  <div class="col-12">
                    <q-input dense filled v-model="suffix" label="Suffix" />
                  </div>
                </div>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="grey-7" v-close-popup />
                  <q-btn flat label="Update" color="primary" @click="updateEventReferenceId" />
                </q-card-actions>
              </section>
            </q-popup-edit>
            <q-tooltip>Add Prefix or Suffix</q-tooltip>
            <iconify-icon icon="hugeicons:edit-02" width="16px" height="16px" class="text-grey-7" />
          </q-btn>
        </div>
        <div class="row items-center">
          <span class="text-caption text-grey-7">{{
            $q.screen.gt.sm
              ? 'You can override the Event Reference ID if you want to.'
              : 'Override ID if you want to.'
          }}</span>
        </div>
      </section>
      <section class="col-md-6 flex justify-end">
        <div class="q-gutter-x-md flex items-center">
          <q-btn
            dense
            outline
            color="white"
            @click="eventThresholdDrawer = true"
            text-color="grey-7"
            round
            class="gt-sm"
          >
            <q-icon>
              <IconifyIcon icon="hugeicons:sorting-05" width="12px" height="12px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Set Threshold</div>
            </q-tooltip>
          </q-btn>
          <q-btn
            outline
            color="grey-7"
            :label="$q.screen.gt.sm ? 'Cancel' : undefined"
            class="q-ml-sm"
            @click="showCancelConfirmationModal = true"
          >
            <template v-if="!$q.screen.gt.sm">
              <iconify-icon icon="hugeicons:cancel-01" width="20px" height="20px" />
            </template>
          </q-btn>
          <q-btn
            outline
            color="secondary"
            :label="$q.screen.gt.sm ? 'Save as Draft' : undefined"
            class="q-ml-sm"
            @click="showDraftConfirmationModal = true"
          >
            <template v-if="!$q.screen.gt.sm">
              <iconify-icon icon="hugeicons:hard-drive" width="20px" height="20px" />
            </template>
          </q-btn>
          <q-btn
            color="primary"
            :label="$q.screen.gt.sm ? 'Create Event' : undefined"
            class="q-ml-sm"
            :to="{ name: '' }"
          >
            <template v-if="!$q.screen.gt.sm">
              <iconify-icon
                icon="solar:diskette-outline"
                class="text-white"
                width="20px"
                height="20px"
              />
            </template>
          </q-btn>
        </div>
      </section>
    </header>

    <main class="q-pa-md">
      <div class="row q-col-gutter-md">
        <section class="col-md-8 col-xs-12">
          <q-card flat bordered>
            <q-card-section class="q-pa-xs">
              <q-stepper
                v-model="step"
                ref="stepper"
                alternative-labels
                color="primary"
                animated
                swipeable
                header-nav
                flat
                :vertical="$q.screen.lt.md"
              >
                <q-step :name="1" title="Event Details" icon="settings" :done="step > 1">
                  <div class="q-gutter-y-md">
                    <q-card flat>
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-md-4 col-xs-12">
                            <div class="text-subtitle2 text-grey-7">Event Name</div>
                            <q-input
                              outlined
                              dense
                              v-model="eventName"
                              placeholder="Enter Event Name"
                            />
                          </div>
                          <div class="col-md-4 col-xs-12">
                            <div class="text-subtitle2 text-grey-7">Subscribed Services</div>
                            <q-select
                              outlined
                              dense
                              v-model="selectedSubscribedServices"
                              placeholder="Please choose one"
                              :options="subscribedServices"
                            />
                          </div>
                          <div class="col-md-4 col-xs-12">
                            <div class="text-subtitle2 text-grey-7">Event Type</div>
                            <q-select
                              outlined
                              dense
                              v-model="selectedEventType"
                              placeholder="Select Event Type"
                              :options="eventTypes"
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-separator />
                    <q-card flat>
                      <q-card-section class="q-py-sm">
                        <div class="text-subtitle2 text-grey-7 q-mb-sm">Event Mode</div>
                        <div class="q-gutter-md">
                          <q-radio
                            v-model="tripMode"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="one-way-trip"
                            label="One-Way Trip"
                          >
                            <q-tooltip self="top start"> Selected </q-tooltip>
                          </q-radio>
                          <q-radio
                            disable
                            v-model="tripMode"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="round-trip"
                            label="Round Trip"
                          >
                            <q-tooltip self="top start"> Currently unavailable </q-tooltip>
                          </q-radio>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-separator />
                    <q-card flat>
                      <q-card-section class="q-py-sm">
                        <div class="text-subtitle2 text-grey-7">Event Schedule</div>
                        <div class="row q-col-gutter-md">
                          <div class="col-md-8">
                            <div class="q-gutter-md">
                              <q-radio
                                v-model="eventSchedule"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="single-day-trip"
                                label="Single Day Trip"
                              >
                              </q-radio>
                              <q-radio
                                v-model="eventSchedule"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="multi-days-trip"
                                label="Multi-Days Trip"
                              >
                              </q-radio>
                            </div>
                            <div class="q-mt-sm">
                              <div class="text-subtitle2 text-grey-7">Start Date</div>
                              <q-input
                                dense
                                outlined
                                v-model="eventStartDate"
                                mask="date"
                                :rules="['date']"
                                placeholder="Choose Date"
                                style="width: 300px"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      cover
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date v-model="eventStartDate">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="q-mt-sm">
                              <div class="row items-center q-col-gutter-md">
                                <div class="col">
                                  <div class="row items-center q-gutter-x-sm">
                                    <div class="col flex">
                                      <q-btn
                                        round
                                        color="primary"
                                        outline
                                        dense
                                        label="M"
                                        class="q-mr-sm"
                                      />
                                      <FleetTimeRange v-model="store.dateTimeRange.timeRange" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div
                              class="items-center q-pa-md"
                              style="
                                background-color: var(--fleet-color-blue-light-50);
                                border-color: var(--fleet-color-blue-light-200);
                                border-width: 1px;
                                border-style: solid;
                                border-radius: 8px;
                              "
                            >
                              <div class="flex items-center q-mb-sm">
                                <iconify-icon
                                  icon="hugeicons:calendar-04"
                                  width="24px"
                                  height="24px"
                                  class="text-grey-7 q-mr-sm"
                                />
                                <div class="text-grey-9 text-subtitle2">
                                  Trips for:
                                  <span class="text-grey-9 text-weight-bold">1 day</span>
                                </div>
                              </div>
                              <div class="flex items-center">
                                <iconify-icon
                                  icon="hugeicons:clock-01"
                                  width="24px"
                                  height="24px"
                                  class="text-grey-7 q-mr-sm"
                                />
                                <div class="text-grey-9 text-subtitle2">
                                  Estimated Trip Duration:
                                  <span class="text-grey-9 text-weight-bold">{{
                                    estimatedTripDuration
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-step>

                <q-step
                  :name="2"
                  title="Client Selection"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  <div class="q-gutter-y-md">
                    <q-card flat>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-md-8 col-xs-12">
                            <div class="q-gutter-sm">
                              <q-toggle
                                indeterminate-value="maybe"
                                v-model="clientSelection"
                                label="Did you want to choose clients now for specific stops?"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-xs-12 flex justify-end">
                            <q-chip
                              dense
                              :color="clientSelection ? 'positive' : 'grey-3'"
                              :text-color="clientSelection ? 'white' : 'grey-7'"
                              :label="clientSelection ? 'Selective' : 'Non-Selective'"
                              class="q-px-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <div class="q-gutter-y-md">
                            <div v-if="clientSelection === true" class="row q-mt-lg">
                              <div class="col">
                                <div class="text-subtitle2 text-grey-7">Select Group</div>
                                <q-select
                                  outlined
                                  dense
                                  v-model="selectedGroup"
                                  placeholder="Please select one"
                                  multiple
                                  use-chips
                                  clearable
                                  use-input
                                  input-debounce="0"
                                  :options="filteredGroups"
                                  @filter="filterGroups"
                                >
                                  <template v-slot:no-option>
                                    <q-item>
                                      <q-item-section class="text-grey">
                                        No results
                                      </q-item-section>
                                    </q-item>
                                  </template>
                                </q-select>
                              </div>
                            </div>
                            <div v-if="clientSelection === true" class="row">
                              <div class="col">
                                <div class="text-subtitle2 text-grey-7">Select Entity</div>
                                <q-select
                                  outlined
                                  dense
                                  v-model="selectedEntity"
                                  placeholder="Please select one"
                                  multiple
                                  use-chips
                                  clearable
                                  use-input
                                  input-debounce="0"
                                  :options="filteredEntities"
                                  @filter="filterEntities"
                                />
                              </div>
                            </div>
                            <div v-if="clientSelection === true" class="row">
                              <div class="col">
                                <div class="text-subtitle2 text-grey-7">Select Individual</div>
                                <q-select
                                  outlined
                                  dense
                                  v-model="selectedIndividual"
                                  placeholder="Please select one"
                                  multiple
                                  use-chips
                                  clearable
                                  use-input
                                  input-debounce="0"
                                  :options="filteredIndividuals"
                                  @filter="filterIndividuals"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-step>

                <q-step :name="3" title="Stop Planning" icon="add_comment" :done="step > 3">
                  Try out different ad text to see what brings in the most customers, and learn how
                  to enhance your ads using features like ad extensions. If you run into any
                  problems with your ads, find out how to tell if they're running and how to resolve
                  approval issues.
                </q-step>

                <q-step :name="4" title="Staff & Vehicle" icon="add_comment" :done="step > 4">
                  Try out different ad text to see what brings in the most customers, and learn how
                  to enhance your ads using features like ad extensions. If you run into any
                  problems with your ads, find out how to tell if they're running and how to resolve
                  approval issues.
                </q-step>

                <q-step :name="5" title="Review & Note" icon="add_comment" :done="step > 5">
                  Try out different ad text to see what brings in the most customers, and learn how
                  to enhance your ads using features like ad extensions. If you run into any
                  problems with your ads, find out how to tell if they're running and how to resolve
                  approval issues.
                </q-step>

                <template v-slot:navigation>
                  <q-stepper-navigation>
                    <q-btn
                      @click="stepper?.next()"
                      color="primary"
                      :label="step === 5 ? 'Finish' : 'Continue'"
                    />
                    <q-btn
                      v-if="step > 1"
                      flat
                      color="primary"
                      @click="stepper?.previous()"
                      label="Back"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </template>
              </q-stepper>
            </q-card-section>
          </q-card>
        </section>
        <aside class="col-md-4 col-xs-12">
          <div class="bg-grey-2">
            <div class="map-container">
              <q-card flat bordered>
                <q-card-section class="q-pa-xs">
                  <div id="map" style="height: 100%; width: 100%"></div>
                </q-card-section>
              </q-card>
            </div>
            <div class="map-controls">
              <q-btn round color="primary" size="md" class="add-stop-btn">
                <iconify-icon
                  icon="hugeicons:plus-sign"
                  class="text-white"
                  width="20px"
                  height="20px"
                />
                <q-tooltip>Add New Stop</q-tooltip>
              </q-btn>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Confirmation Modal for cancel event-->
    <ConfirmationModal
      v-model="showCancelConfirmationModal"
      title="Confirm cancellation of this event?"
      message="Are you sure you want to cancel this event? All unsaved changes will be lost."
      type="warning"
      confirmText="Confirm Cancellation"
      cancelText="Cancel"
      @confirm="confirmCancellation"
    />

    <!-- Confirmation Modal for draft event-->
    <ConfirmationModal
      v-model="showDraftConfirmationModal"
      title="Save event as draft?"
      message="Are you sure you want to save this event as a draft? You can continue editing later before finalizing."
      type="success"
      confirmText="Save as Draft"
      cancelText="Cancel"
    />

    <EventThreshold v-model="eventThresholdDrawer" />
  </q-page>
</template>

<style scoped lang="scss">
.dotted-link {
  border-bottom: 1px dotted #1976d2;
  cursor: pointer;
}

#map {
  min-height: 300px; // Default height for small devices
  z-index: 1;
  filter: grayscale(0.8);

  @media (min-width: 1024px) {
    // Medium devices and larger
    min-height: calc(100vh - 224px);
  }
}

.bg-grey-2 {
  display: block;
  position: relative;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2; // Increased z-index
  pointer-events: auto;
}

// Separate container for the map to apply grayscale
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.add-stop-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  filter: drop-shadow(0 0 10px rgba(var(--fleet-color-blue-500), 0.3));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    filter: drop-shadow(0 0 15px rgba(var(--fleet-color-blue-500), 0.5));
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(1px) scale(0.98);
    filter: drop-shadow(0 0 8px rgba(var(--fleet-color-blue-500), 0.4));
  }
}
</style>
