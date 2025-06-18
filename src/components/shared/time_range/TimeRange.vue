<script setup lang="ts">
import { ref, computed } from 'vue';
const timeRange = ref({
  min: 0,
  max: 23.983, // 23 hours and 59 minutes (23 + 59/60)
});

const formatTime = (hour: number) => {
  const wholeHours = Math.floor(hour);
  const minutes = Math.round((hour - wholeHours) * 60);
  const period = wholeHours >= 12 ? 'PM' : 'AM';
  const displayHour = wholeHours % 12 || 12;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const startTime = computed(() => formatTime(timeRange.value.min));
const endTime = computed(() => formatTime(timeRange.value.max));

const showStartTime = ref(false);
const showEndTime = ref(false);

const updateTimeFromQTime = (
  time: string | null | undefined,
  isStart: boolean
) => {
  if (!time) return;

  const [hours = '0', minutes = '0'] = time.split(':');
  const decimalTime = parseInt(hours) + parseInt(minutes) / 60;

  if (isStart) {
    timeRange.value.min = decimalTime;
  } else {
    timeRange.value.max = decimalTime;
  }
};
</script>

<template>
  <div
    class="row flex items-center bg-white q-px-sm"
    style="border: 1px solid #e0e0e0; border-radius: 4px"
  >
    <div
      class="text-caption q-pr-md cursor-pointer"
      @click="showStartTime = true"
    >
      {{ startTime }}
    </div>
    <q-dialog v-model="showStartTime">
      <q-card>
        <q-time
          v-model="startTime"
          landscape
          @update:model-value="time => updateTimeFromQTime(time, true)"
        />
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <q-range
        style="width: 100px"
        v-model="timeRange"
        :min="0"
        :max="23.983"
        :step="0.167"
        color="secondary"
      />
    </div>

    <div
      class="text-caption q-pl-md cursor-pointer"
      @click="showEndTime = true"
    >
      {{ endTime }}
    </div>
    <q-dialog v-model="showEndTime">
      <q-card>
        <q-time
          v-model="endTime"
          landscape
          @update:model-value="time => updateTimeFromQTime(time, false)"
        />
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
