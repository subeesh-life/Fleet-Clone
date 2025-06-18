<script setup lang="ts">
import { ref } from 'vue';
const eventNoteDrawer = ref(false);
const eventNote = ref('');
const tempNote = ref('');
const showSavedNotes = ref(false);

const handleApply = () => {
  eventNote.value = tempNote.value.trim();
  showSavedNotes.value = Boolean(eventNote.value);
  eventNoteDrawer.value = false;
};

const handleOpenDrawer = () => {
  tempNote.value = eventNote.value;
  eventNoteDrawer.value = true;
};

const handleDelete = (event: Event) => {
  event.stopPropagation();
  eventNote.value = '';
  tempNote.value = '';
  showSavedNotes.value = false;
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
          <div class="col-8 flex items-center">
            <iconify-icon
              icon="hugeicons:note"
              width="24px"
              height="24px"
              class="text-grey-7"
            />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">
              Add Notes / Comments
            </div>
          </div>
          <div class="col-4 flex justify-end">
            <div class="flex items-center" @click="handleOpenDrawer">
              <div v-if="showSavedNotes" class="cursor-pointer q-mr-md">
                <iconify-icon
                  icon="hugeicons:delete-02"
                  width="24px"
                  height="24px"
                  class="text-red-10"
                  @click="handleDelete($event)"
                />
                <q-tooltip>Delete Note</q-tooltip>
              </div>
              <div>
                <iconify-icon
                  :icon="
                    showSavedNotes
                      ? 'hugeicons:reload'
                      : 'hugeicons:add-circle-half-dot'
                  "
                  width="24px"
                  height="24px"
                  class="text-secondary cursor-pointer"
                />
                <q-tooltip>{{
                  showSavedNotes ? 'Update Notes' : 'Add Notes'
                }}</q-tooltip>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="showSavedNotes">
        <div>
          <div class="text-body2 text-grey-8">{{ eventNote }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <!-- Event Note Drawer -->
  <q-dialog
    persistent
    backdrop-filter="blur(2px)"
    v-model="eventNoteDrawer"
    position="right"
    :full-height="true"
  >
    <q-card style="width: 500px" class="column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">Event Note</div>
            <div class="text-caption text-grey-7">
              Add a general note or comment to this booking.
            </div>
          </div>
          <div class="row items-center q-gutter-x-md">
            <q-btn color="primary" label="Apply" @click="handleApply" />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="eventNoteDrawer = false"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 text-grey-7 q-pb-sm">
          You can skip this field if not needed
        </div>
        <q-input
          v-model="tempNote"
          square
          outlined
          placeholder="Add notes / comments"
          autogrow
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
