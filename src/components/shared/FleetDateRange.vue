<script setup lang="ts">
import { ref, computed } from 'vue';

interface DateRange {
  from: string;
  to: string;
}

interface Props {
  modelValue?: DateRange;
}

interface Emits {
  (e: 'update:modelValue', value: DateRange): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: (): DateRange => ({
    from: new Date().toISOString().split('T')[0] || '',
    to: new Date().toISOString().split('T')[0] || '',
  }),
});

const emit = defineEmits<Emits>();

const dateRange = computed({
  get: () => props.modelValue,
  set: (value: DateRange) => emit('update:modelValue', value),
});

const showDate = ref(false);

const formattedDate = computed(() => {
  const fromDate = dateRange.value.from
    ? new Date(dateRange.value.from).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  const toDate = dateRange.value.to
    ? new Date(dateRange.value.to).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  return `${fromDate} - ${toDate}`;
});
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
