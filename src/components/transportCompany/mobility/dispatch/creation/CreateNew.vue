<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import EventAssociation from './associatedCards/EventAssociation.vue'
import ScheduleEvent from './associatedCards/ScheduleEvent/ScheduleEvent.vue'
import EventName from './associatedCards/EventName.vue'
import BusinessSource from './associatedCards/BusinessSource.vue'
import ManageClients from './associatedCards/ManageClients.vue'
import AddNotes from './associatedCards/AddNotes.vue'
import TabController from './associated_tabs/TabController.vue'
import EventThreshold from './threshold/EventThreshold.vue'
import ConfirmationModal from 'components/shared/modals/ConfirmationModal.vue'
import { useRouter } from 'vue-router'

const showCancelConfirmationModal = ref(false)
const confirmCancellation = async () => {
  await router.push({ name: 'dispatch' })
}
const showDraftConfirmationModal = ref(false)

import { L } from 'boot/leaflet'

onMounted(() => {
  setTimeout(() => {
    // Abu Dhabi coordinates: 24.4539° N, 54.3773° E
    const map = L.map('map').setView([24.4539, 54.3773], 4)

    // Using CartoDB's light (grayscale) map with English labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    map.invalidateSize()
  }, 100)
})

const $q = useQuasar()

const eventReferenceId = ref('SWHWLKP')
const prefix = ref('')
const suffix = ref('')
const showPopupEdit = ref(false)
const eventThresholdDrawer = ref(false)
const router = useRouter()

const copyEventReferenceId = async () => {
  try {
    await navigator.clipboard.writeText(eventReferenceId.value)
    $q.notify({
      message: 'Event Reference ID copied to clipboard',
      color: 'positive',
      icon: 'check',
      position: 'top',
      timeout: 2000,
    })
  } catch (error) {
    console.error('Failed to copy email:', error)
    $q.notify({
      message: 'Failed to copy Event Reference ID',
      color: 'negative',
      icon: 'error',
      position: 'top',
      timeout: 2000,
    })
  }
}

const updateEventReferenceId = () => {
  showPopupEdit.value = false
  prefix.value = ''
  suffix.value = ''
}


</script>
<template>
  <q-page class="bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center bg-white q-pa-md">
      <div class="col-md-6">
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
              <div style="max-width: 300px" class="q-pa-sm">
                <div>
                  <div class="text-subtitle2">Modify Event Reference ID</div>
                  <div class="row q-col-gutter-sm q-mt-sm">
                    <div class="col-12">
                      <q-input dense filled v-model="prefix" label="Prefix" />
                    </div>
                    <div class="col-12">
                      <q-input dense filled v-model="eventReferenceId" label="Reference ID" readonly />
                    </div>
                    <div class="col-12">
                      <q-input dense filled v-model="suffix" label="Suffix" />
                    </div>
                  </div>
                </div>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="grey-7" v-close-popup />
                  <q-btn flat label="Update" color="primary" @click="updateEventReferenceId" />
                </q-card-actions>
              </div>
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
      </div>
      <div class="col-md-6 flex justify-end">
        <div class="q-gutter-x-md flex items-center">
          <div class="set-threshold-btn">
            <q-btn dense outline color="white" @click="eventThresholdDrawer = true" text-color="grey-7" round
              class="gt-sm">
              <q-icon>
                <IconifyIcon icon="hugeicons:sorting-05" width="12px" height="12px" />
              </q-icon>
              <q-tooltip>
                <div class="text-caption">Set Threshold</div>
              </q-tooltip>
            </q-btn>
          </div>
          <div class="controls">
            <q-btn outline color="grey-7" :label="$q.screen.gt.sm ? 'Cancel' : undefined" class="q-ml-sm"
              @click="showCancelConfirmationModal = true">
              <template v-if="!$q.screen.gt.sm">
                <iconify-icon icon="hugeicons:cancel-01" width="20px" height="20px" />
              </template>
            </q-btn>
            <q-btn outline color="secondary" :label="$q.screen.gt.sm ? 'Save as Draft' : undefined" class="q-ml-sm"
              @click="showDraftConfirmationModal = true">
              <template v-if="!$q.screen.gt.sm">
                <iconify-icon icon="hugeicons:hard-drive" width="20px" height="20px" />
              </template>
            </q-btn>
            <q-btn color="primary" :label="$q.screen.gt.sm ? 'Create Event' : undefined" class="q-ml-sm"
              :to="{ name: '' }">
              <template v-if="!$q.screen.gt.sm">
                <iconify-icon icon="solar:diskette-outline" class="text-white" width="20px" height="20px" />
              </template>
            </q-btn>
          </div>
          <!-- Confirmation Modal for cancel event-->
          <ConfirmationModal v-model="showCancelConfirmationModal" title="Confirm cancellation of this event?"
            message="Are you sure you want to cancel this event? All unsaved changes will be lost." type="warning"
            confirmText="Confirm Cancellation" cancelText="Cancel" @confirm="confirmCancellation" />

          <!-- Confirmation Modal for draft event-->
          <ConfirmationModal v-model="showDraftConfirmationModal" title="Save event as draft?"
            message="Are you sure you want to save this event as a draft? You can continue editing later before finalizing."
            type="success" confirmText="Save as Draft" cancelText="Cancel" />
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-xs-12 q-gutter-y-md">
          <div class="event-association">
            <EventAssociation />
          </div>
          <div class="event-association">
            <ScheduleEvent />
          </div>
          <div class="event-name">
            <EventName />
          </div>
          <div class="business-source">
            <BusinessSource />
          </div>
          <div class="manage-clients">
            <ManageClients />
          </div>
          <div class="add-notes">
            <AddNotes />
          </div>
        </div>
        <div class="col-md-4 col-xs-12">
          <div class="bg-grey-2">
            <div class="map-container">
              <div id="map" style="height: 100%; width: 100%"></div>
            </div>
            <div class="map-controls">
              <q-btn round color="primary" size="md" class="add-stop-btn">
                <iconify-icon icon="hugeicons:plus-sign" class="text-white" width="20px" height="20px" />
                <q-tooltip>Add New Stop</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-12">
          <div class="bg-grey-3">
            <TabController />
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <EventThreshold v-model="eventThresholdDrawer" />
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
    min-height: calc(100vh - 164px);
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
