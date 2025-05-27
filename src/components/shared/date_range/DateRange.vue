<script setup lang="ts">
import { ref, computed } from 'vue'

const dateRange = ref({
  from: new Date().toISOString().split('T')[0],
  to: new Date().toISOString().split('T')[0],
})

const showDate = ref(false)

const formattedDate = computed(() => {
  const fromDate = dateRange.value.from
    ? new Date(dateRange.value.from).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''
  const toDate = dateRange.value.to
    ? new Date(dateRange.value.to).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''
  return `${fromDate} - ${toDate}`
})
</script>
<template>
  <div
    class="row flex items-center bg-white gt-sm"
    style="border: 1px solid #e0e0e0; border-radius: 4px"
  >
    <div class="text-caption q-pr-sm cursor-pointer" @click="showDate = true">
      <span class="q-ml-sm">{{ formattedDate }}</span>
    </div>
    <q-dialog v-model="showDate">
      <q-card>
        <q-date v-model="dateRange" range landscape today-btn />
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
