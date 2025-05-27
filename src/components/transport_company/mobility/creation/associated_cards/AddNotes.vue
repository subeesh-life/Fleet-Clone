<script setup lang="ts"></script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section class="q-py-sm" style="background-color: var(--fleet-color-gray-true-200)">
        <div class="row items-center">
          <div class="col-8 flex items-center">
            <iconify-icon icon="hugeicons:note" width="24px" height="24px" class="text-grey-7" />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">
              Add Notes / Comments
            </div>
          </div>
          <div class="col-4 flex justify-end">
            <div>
              <iconify-icon
                icon="hugeicons:add-circle-half-dot"
                width="24px"
                height="24px"
                class="text-secondary cursor-pointer"
              />
              <q-tooltip>Add Notes</q-tooltip>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
