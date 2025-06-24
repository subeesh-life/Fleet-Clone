<script setup lang="ts">
import { ref, computed } from 'vue';

interface DateTimeRange {
  dateRange: {
    from: string;
    to: string;
  };
  timeRange: {
    min: number;
    max: number;
  };
}

interface Props {
  modelValue?: DateTimeRange;
}

interface Emits {
  (e: 'update:modelValue', value: DateTimeRange): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: (): DateTimeRange => ({
    dateRange: {
      from: new Date().toISOString().split('T')[0] || '',
      to: new Date().toISOString().split('T')[0] || '',
    },
    timeRange: {
      min: 0,
      max: 23.983,
    },
  }),
});

const emit = defineEmits<Emits>();

const dateTimeRange = computed({
  get: () => props.modelValue,
  set: (value: DateTimeRange) => emit('update:modelValue', value),
});

// Date range functionality
const showDate = ref(false);

const formattedDate = computed(() => {
  const fromDate = dateTimeRange.value.dateRange.from
    ? new Date(dateTimeRange.value.dateRange.from).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  const toDate = dateTimeRange.value.dateRange.to
    ? new Date(dateTimeRange.value.dateRange.to).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  return `${fromDate} - ${toDate}`;
});

// Time range functionality
const formatTime = (hour: number) => {
  const wholeHours = Math.floor(hour);
  const minutes = Math.round((hour - wholeHours) * 60);
  const period = wholeHours >= 12 ? 'PM' : 'AM';
  const displayHour = wholeHours % 12 || 12;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const startTime = computed(() => formatTime(dateTimeRange.value.timeRange.min));
const endTime = computed(() => formatTime(dateTimeRange.value.timeRange.max));

const showStartTime = ref(false);
const showEndTime = ref(false);

const updateTimeFromQTime = (
  time: string | null | undefined,
  isStart: boolean
): void => {
  if (!time) return;

  const [hours = '0', minutes = '0'] = time.split(':');
  const decimalTime = parseInt(hours) + parseInt(minutes) / 60;

  const newTimeRange = { ...dateTimeRange.value.timeRange };
  if (isStart) {
    newTimeRange.min = decimalTime;
  } else {
    newTimeRange.max = decimalTime;
  }

  dateTimeRange.value = {
    ...dateTimeRange.value,
    timeRange: newTimeRange,
  };
};

const updateTimeRange = (newRange: { min: number; max: number }) => {
  dateTimeRange.value = {
    ...dateTimeRange.value,
    timeRange: newRange,
  };
};

const updateDateRange = (newRange: { from: string; to: string }) => {
  dateTimeRange.value = {
    ...dateTimeRange.value,
    dateRange: newRange,
  };
};
</script>

<template>
  <div class="row q-gutter-x-md">
    <!-- Date Range Section -->
    <div
      class="row flex items-center bg-white gt-sm"
      style="border: 1px solid #e0e0e0; border-radius: 4px"
    >
      <div class="text-caption q-pr-sm cursor-pointer" @click="showDate = true">
        <span class="q-ml-sm">{{ formattedDate }}</span>
      </div>
      <q-dialog v-model="showDate">
        <q-card>
          <q-date 
            :model-value="dateTimeRange.dateRange" 
            @update:model-value="updateDateRange"
            range 
            landscape 
            today-btn 
          />
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- Time Range Section -->
    <div
      class="row flex items-center bg-white q-px-sm gt-sm"
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
            @update:model-value="(time: string | null) => updateTimeFromQTime(time, true)"
          />
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div>
        <q-range
          style="width: 100px"
          :model-value="dateTimeRange.timeRange"
          @update:model-value="updateTimeRange"
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
            @update:model-value="(time: string | null) => updateTimeFromQTime(time, false)"
          />
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>