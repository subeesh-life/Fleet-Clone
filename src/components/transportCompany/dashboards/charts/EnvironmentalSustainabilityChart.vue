<script setup lang="ts">
import { ref } from 'vue';
// Update default value to 'fuel'
const utilizationViewType = ref('fuel');

// Updated chart options for utilization
const utilizationChartOptions = ref({
  chart: {
    type: 'area',
    toolbar: {
      show: true,
    },
    background: '#ffffff',
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  xaxis: {
    categories: [
      '00:00',
      '03:00',
      '06:00',
      '09:00',
      '12:00',
      '15:00',
      '18:00',
      '21:00',
    ],
    title: {
      text: 'Time of Day',
    },
  },
  grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 4,
  },
  yaxis: {
    title: {
      text: 'Fuel Consumption (L)',
    },
    min: 0,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm',
    },
    y: {
      formatter: function (val: number) {
        return val.toFixed(1) + 'L';
      },
    },
  },
  colors: ['#4CAF50', '#FFC107'],
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
});

// Updated series data to match time categories
const utilizationSeries = ref([
  {
    name: 'Business',
    data: [12, 15, 25, 42, 38, 45, 35, 20],
  },
  {
    name: 'Unauthorized',
    data: [5, 8, 15, 22, 25, 20, 15, 10],
  },
]);
</script>
<template>
  <div class="col-md-6 col-xs-12">
    <q-card bordered flat class="bg-white">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-grey-9">Environmental Sustainability</div>
        <div class="q-gutter-sm">
          <q-btn-toggle
            v-model="utilizationViewType"
            flat
            toggle-color="secondary"
            :options="[
              { label: 'Fuel', value: 'fuel' },
              { label: 'Idling', value: 'idle' },
              { label: 'Efficiency', value: 'efficiency' },
              { label: 'Co2', value: 'co2' },
            ]"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <apex-chart
          type="line"
          height="350"
          :options="utilizationChartOptions"
          :series="utilizationSeries"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
