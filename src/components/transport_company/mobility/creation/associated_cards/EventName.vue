<script setup lang="ts">
import { ref, computed } from 'vue'
const eventNameDrawer = ref(false)
const selectedEventName = ref('eventName')
const showSavedItems = ref(false)

// Separate models for each type
const routeName = ref('')
const eventName = ref('')
const signName = ref('')

// Define the arrays to store the lists
const routeNameList = ref<string[]>([])
const eventNameList = ref<string[]>([])
const signNameList = ref<string[]>([])

// Computed property for dynamic label
const getInputLabel = computed(() => {
  switch (selectedEventName.value) {
    case 'routeName':
      return 'Route Name'
    case 'eventName':
      return 'Event Name'
    case 'signName':
      return 'Sign Name'
    default:
      return 'Event Name'
  }
})

// Computed property for dynamic v-model
const currentModel = computed({
  get: () => {
    switch (selectedEventName.value) {
      case 'routeName':
        return routeName.value
      case 'eventName':
        return eventName.value
      case 'signName':
        return signName.value
      default:
        return eventName.value
    }
  },
  set: (value) => {
    switch (selectedEventName.value) {
      case 'routeName':
        routeName.value = value
        break
      case 'eventName':
        eventName.value = value
        break
      case 'signName':
        signName.value = value
        break
    }
  },
})

// Computed property to check if current type already has a value
const isCurrentTypeAdded = computed(() => {
  switch (selectedEventName.value) {
    case 'routeName':
      return routeNameList.value.length > 0
    case 'eventName':
      return eventNameList.value.length > 0
    case 'signName':
      return signNameList.value.length > 0
    default:
      return false
  }
})

// Function to add current value to appropriate list
const addToList = () => {
  const currentValue = currentModel.value.trim()
  if (!currentValue || isCurrentTypeAdded.value) return

  switch (selectedEventName.value) {
    case 'routeName':
      routeNameList.value.push(currentValue)
      routeName.value = ''
      break
    case 'eventName':
      eventNameList.value.push(currentValue)
      eventName.value = ''
      break
    case 'signName':
      signNameList.value.push(currentValue)
      signName.value = ''
      break
  }
}

// Computed property for all items with their types
const allItems = computed(() => {
  const items = []
  if (routeNameList.value.length) {
    items.push({ type: 'Route Name', value: routeNameList.value[0] })
  }
  if (eventNameList.value.length) {
    items.push({ type: 'Event Name', value: eventNameList.value[0] })
  }
  if (signNameList.value.length) {
    items.push({ type: 'Sign Name', value: signNameList.value[0] })
  }
  return items
})

// Modified delete function to handle global table
const deleteItem = (type: string) => {
  switch (type) {
    case 'Route Name':
      routeNameList.value = []
      break
    case 'Event Name':
      eventNameList.value = []
      break
    case 'Sign Name':
      signNameList.value = []
      break
  }
}

const handleApply = () => {
  showSavedItems.value = true
  eventNameDrawer.value = false
}
</script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section class="q-py-sm" style="background-color: var(--fleet-color-gray-true-200)">
        <div class="row items-center">
          <div class="col flex items-center">
            <iconify-icon icon="hugeicons:tag-01" width="24px" height="24px" class="text-grey-7" />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">Event Name</div>
          </div>
          <div class="col flex justify-end">
            <div class="flex items-center" @click="eventNameDrawer = true">
              <iconify-icon
                icon="hugeicons:add-circle-half-dot"
                width="24px"
                height="24px"
                class="text-secondary cursor-pointer"
              />
              <q-tooltip>Add Name</q-tooltip>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Display saved items - modified condition -->
    <q-card flat bordered v-if="allItems.length && showSavedItems" class="q-mt-sm">
      <q-card-section>
        <q-table
          :rows="allItems"
          :columns="[
            { name: 'type', label: 'Type', field: 'type', align: 'left' },
            { name: 'value', label: 'Value', field: 'value', align: 'left' },
            { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
          ]"
          hide-bottom
          flat
          dense
          :pagination="{ rowsPerPage: 0 }"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="type" :props="props">
                {{ props.row.type }}
              </q-td>
              <q-td key="value" :props="props">
                {{ props.row.value }}
              </q-td>
              <q-td key="actions" :props="props" class="text-right">
                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  @click="deleteItem(props.row.type)"
                >
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>

  <!-- Event Name Drawer -->
  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="eventNameDrawer"
    position="right"
    :full-height="true"
  >
    <q-card style="width: 500px" class="column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">Event Name</div>
            <div class="text-caption text-grey-7">Specify the name of the event.</div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" @click="handleApply" />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="eventNameDrawer = false"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-4">
            <q-radio
              v-model="selectedEventName"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="routeName"
              label="Route Name"
            />
          </div>
          <div class="col">
            <q-radio
              v-model="selectedEventName"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="eventName"
              label="Event Name"
            />
          </div>
          <div class="col">
            <q-radio
              v-model="selectedEventName"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="signName"
              label="Sign Name"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col">
            <div class="text-subtitle2 text-grey-7">{{ getInputLabel }}</div>
            <q-input
              outlined
              dense
              v-model="currentModel"
              :placeholder="`Enter ${getInputLabel}`"
              :disable="isCurrentTypeAdded"
              @keyup.enter="addToList"
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="add"
                  @click="addToList"
                  :disable="isCurrentTypeAdded"
                />
              </template>
              <template v-slot:hint>
                <span v-if="isCurrentTypeAdded" class="text-warning">
                  You can only add one {{ getInputLabel }}
                </span>
              </template>
            </q-input>

            <!-- Global table to display all items -->
            <div class="q-mt-md">
              <q-table
                v-if="allItems.length"
                :rows="allItems"
                :columns="[
                  { name: 'type', label: 'Type', field: 'type', align: 'left' },
                  { name: 'value', label: 'Value', field: 'value', align: 'left' },
                  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
                ]"
                hide-bottom
                flat
                dense
                :pagination="{ rowsPerPage: 0 }"
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="type" :props="props">
                      {{ props.row.type }}
                    </q-td>
                    <q-td key="value" :props="props">
                      {{ props.row.value }}
                    </q-td>
                    <q-td key="actions" :props="props" class="text-right">
                      <q-btn
                        flat
                        round
                        dense
                        color="negative"
                        icon="delete"
                        @click="deleteItem(props.row.type)"
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
