<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('standard');
const tripMode = ref('oneway');
const subscribedServiceDrawer = ref(false);
const searchSubscribedService = ref('');
const showSubscribedService = ref(false);
const tempSubscribedServiceType = ref('');
const confirmedSubscribedServiceType = ref('');

const handleApply = () => {
  confirmedSubscribedServiceType.value = tempSubscribedServiceType.value;
  showSubscribedService.value = true;
  subscribedServiceDrawer.value = false;
};

const eventTypeDrawer = ref(false);
const searchEventType = ref('');
const eventUsage = ref('');
const showEventType = ref(false);
const tempEventType = ref('');
const confirmedEventType = ref('');
const handleApplyEventType = () => {
  confirmedEventType.value = tempEventType.value;
  showEventType.value = true;
  eventTypeDrawer.value = false;
};
</script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section
        class="q-py-sm"
        style="background-color: var(--fleet-color-gray-true-200)"
      >
        <div class="row items-center">
          <iconify-icon
            icon="hugeicons:route-02"
            width="24px"
            height="24px"
            class="text-grey-7"
          />
          <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">
            Event Association
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-py-sm">
        <div class="row items-center">
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Subscribed Service</div>
          </div>
          <div class="col-6 flex justify-end">
            <div class="flex items-center">
              <div
                v-if="showSubscribedService && confirmedSubscribedServiceType"
                class="text-subtitle2 text-grey-7"
              >
                {{ confirmedSubscribedServiceType }}
              </div>
              <q-btn
                flat
                dense
                padding="xs"
                class="q-ml-xs"
                @click="subscribedServiceDrawer = true"
              >
                <q-tooltip>{{
                  confirmedSubscribedServiceType
                    ? 'Change Service'
                    : 'Add Service'
                }}</q-tooltip>
                <iconify-icon
                  :icon="
                    confirmedSubscribedServiceType
                      ? 'hugeicons:reload'
                      : 'hugeicons:add-circle-half-dot'
                  "
                  width="24px"
                  height="24px"
                  class="text-secondary"
                />
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-py-sm">
        <div class="row items-center">
          <div class="col-6">
            <div class="text-subtitle2 text-grey-9">Event Type</div>
          </div>
          <div class="col-6 flex justify-end">
            <div class="text-subtitle2 text-grey-7">
              <div class="flex items-center">
                <div
                  v-if="showEventType && confirmedEventType"
                  class="text-subtitle2 text-grey-7"
                >
                  {{ confirmedEventType }}
                </div>
                <q-btn
                  flat
                  dense
                  :disabled="!confirmedSubscribedServiceType"
                  padding="xs"
                  class="q-ml-xs"
                  @click="eventTypeDrawer = true"
                >
                  <q-tooltip>{{
                    confirmedSubscribedServiceType
                      ? 'Add Event Type'
                      : 'Select a Subscribed Service first'
                  }}</q-tooltip>
                  <iconify-icon
                    :icon="
                      confirmedEventType
                        ? 'hugeicons:reload'
                        : 'hugeicons:add-circle-half-dot'
                    "
                    width="24px"
                    height="24px"
                    class="text-secondary"
                  />
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-py-sm">
        <q-tabs
          v-model="activeTab"
          dense
          align="justify"
          class="tab-style"
          inline-label
          no-caps
          active-color="white"
          indicator-color="primary"
          active-bg-color="primary"
        >
          <q-tab name="standard">
            <template v-slot:default>
              <IconifyIcon
                icon="hugeicons:navigator-02"
                width="24px"
                height="24px"
                class="q-mr-sm"
              />
              <span>Standard</span>
            </template>
          </q-tab>
          <q-tab disable name="shuttle" v-model="activeTab">
            <template v-slot:default>
              <IconifyIcon
                icon="hugeicons:arrow-reload-vertical"
                width="24px"
                height="24px"
                class="q-mr-sm text-grey-7"
              />
              <span>Shuttle</span>
              <q-tooltip self="top start"> Currently unavailable </q-tooltip>
            </template>
          </q-tab>
          <q-tab disable name="area" v-model="activeTab">
            <template v-slot:default>
              <IconifyIcon
                icon="hugeicons:map-pin"
                width="24px"
                height="24px"
                class="q-mr-sm text-grey-7"
              />
              <span>Area</span>
              <q-tooltip self="top start"> Currently unavailable </q-tooltip>
            </template>
          </q-tab>
        </q-tabs>
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="standard" class="q-pa-none q-mt-sm">
            <div class="q-pa-none">
              <div class="q-gutter-md">
                <q-radio
                  v-model="tripMode"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="oneway"
                  label="Oneway"
                >
                  <q-tooltip self="top start"> Selected </q-tooltip>
                </q-radio>
                <q-radio
                  disable
                  v-model="tripMode"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="roundTrip"
                  label="Round Trip"
                >
                  <q-tooltip self="top start">
                    Currently unavailable
                  </q-tooltip>
                </q-radio>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="subscribedServiceDrawer"
    position="right"
    :full-height="true"
  >
    <q-card style="width: 500px" class="column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">Subscribed Service</div>
            <div class="text-caption text-grey-7">
              Select the service applicable to this event
            </div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" @click="handleApply" />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="subscribedServiceDrawer = false"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-table
          flat
          outline
          bordered
          :rows="[
            { service: 'School Transport', type: 'Passenger Transport' },
            { service: 'Taxi Transport', type: 'Passenger Transport' },
            { service: 'Rentals', type: 'Rental & Leasing' },
            { service: 'Oil Delivery', type: 'Oil & Gas' },
            { service: 'Employee Transport', type: 'Passenger Transport' },
            { service: 'Event Shuttle', type: 'Passenger Transport' },
            { service: 'Corporate Shuttle', type: 'Passenger Transport' },
            { service: 'Airport Transfer', type: 'Passenger Transport' },
            { service: 'City Tour', type: 'Passenger Transport' },
          ]"
          :columns="[
            {
              name: 'select',
              label: '',
              field: 'select',
              align: 'left',
              headerClasses: 'bg-grey-2',
            },
            {
              name: 'service',
              label: 'Service Type',
              field: 'service',
              sortable: true,
              align: 'left',
              headerClasses: 'bg-grey-2',
            },
            {
              name: 'type',
              label: 'Business Category',
              field: 'type',
              sortable: true,
              align: 'left',
              headerClasses: 'bg-grey-2',
              classes: 'text-grey-7 text-caption',
            },
          ]"
          row-key="service"
          :pagination="{ rowsPerPage: 5 }"
        >
          <template v-slot:top>
            <div class="row items-center full-width">
              <div class="col">
                <q-input
                  v-model="searchSubscribedService"
                  dense
                  outlined
                  placeholder="Search"
                >
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
              <q-radio
                v-model="tempSubscribedServiceType"
                :val="props.row.service"
                dense
                class="no-outline"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="eventTypeDrawer"
    position="right"
    :full-height="true"
  >
    <q-card style="width: 500px" class="column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">Event Type</div>
            <div class="text-caption text-grey-7">
              Specify the nature of the trip for this event.
            </div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn
              color="primary"
              label="Apply"
              @click="handleApplyEventType"
            />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="eventTypeDrawer = false"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-table
          flat
          outline
          bordered
          :rows="[
            {
              event: 'Home to School',
              subtext: 'Business',
              type: 'With Revenue',
            },
            {
              event: 'School to Home',
              subtext: 'Business',
              type: 'With Revenue',
            },
            {
              event: 'School to School',
              subtext: 'Business',
              type: 'With Revenue',
            },
            { event: 'Field Trip', subtext: 'Business', type: 'With Revenue' },
            {
              event: 'Excursion',
              subtext: 'Internal',
              type: 'Without Revenue',
            },
            {
              event: 'City Tour',
              subtext: 'Internal',
              type: 'Without Revenue',
            },
          ]"
          :columns="[
            {
              name: 'select',
              label: '',
              field: 'select',
              align: 'left',
              headerClasses: 'bg-grey-2',
            },
            {
              name: 'event',
              label: 'Event Type',
              field: 'event',
              sortable: true,
              align: 'left',
              headerClasses: 'bg-grey-2',
            },
            {
              name: 'type',
              label: 'Event Usage',
              field: 'type',
              sortable: true,
              align: 'left',
              headerClasses: 'bg-grey-2',
              classes: 'text-grey-7 text-caption',
            },
          ]"
          row-key="event"
          :pagination="{ rowsPerPage: 5 }"
        >
          <template v-slot:top>
            <div class="row items-center full-width q-col-gutter-x-md">
              <div class="col-6 q-pl-none">
                <q-select
                  label="Event Usage"
                  v-model="eventUsage"
                  dense
                  outlined
                  placeholder="Search"
                  :options="['All', 'With Revenue', 'Without Revenue']"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="searchEventType"
                  dense
                  outlined
                  placeholder="Search"
                >
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
              <q-radio
                v-model="tempEventType"
                :val="props.row.event"
                dense
                class="no-outline"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-event="props">
            <q-td>
              <div class="column">
                <div>{{ props.row.event }}</div>
                <div v-if="props.row.subtext" class="text-caption text-grey-7">
                  {{ props.row.subtext }}
                </div>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
