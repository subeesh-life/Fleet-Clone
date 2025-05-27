<script setup lang="ts">
import { ref } from 'vue'

const businessSource = ref('In-House')
const dropdownOpen = ref(false)
const businessSourceOptions = [
  {
    label: 'In-House',
    caption: 'Fleets own by company',
  },
  {
    label: 'Farm In',
    caption: 'Fleets from external sources',
  },
  {
    label: 'Farm Out',
    caption: 'Fleets that are outsourced or leased to others',
  },
]
</script>

<template>
  <div class="bg-white">
    <q-card flat bordered>
      <q-card-section class="q-py-sm" style="background-color: var(--fleet-color-gray-true-200)">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <iconify-icon
              icon="hugeicons:building-02"
              width="24px"
              height="24px"
              class="text-grey-7"
            />
            <div class="text-subtitle1 text-grey-9 text-weight-medium q-ml-xs">Business Source</div>
          </div>
          <div>
            <q-btn-dropdown rounded color="primary" v-model="dropdownOpen" :label="businessSource">
              <q-list padding>
                <q-item
                  v-for="option in businessSourceOptions"
                  :key="option.label"
                  clickable
                  v-ripple
                  @click="
                    () => {
                      businessSource = option.label
                      dropdownOpen = false
                    }
                  "
                >
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                    <q-item-label caption>{{ option.caption }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
