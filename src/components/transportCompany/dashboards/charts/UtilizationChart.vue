<script setup lang="ts">
import { ref } from 'vue'
// Add state for utilization view type
const utilizationViewType = ref('vehicle')

// Updated chart options for utilization
const utilizationChartOptions = ref({
  chart: {
    type: 'line',
    toolbar: {
      show: true,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  xaxis: {
    categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    title: {
      text: 'Time of Day',
    },
  },
  yaxis: {
    title: {
      text: 'Utilization Rate (%)',
    },
    min: 0,
    max: 100,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val.toFixed(1) + '%'
      },
    },
  },
  colors: ['#4CAF50', '#FFC107', '#2196f3'],
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
})

// Sample utilization data
const utilizationSeries = ref([
  {
    name: 'Business',
    data: [45, 52, 38, 78, 93, 82, 75, 60],
  },
  {
    name: 'Unauthorized',
    data: [65, 72, 58, 96, 98, 90, 85, 78],
  },
  {
    name: 'Internal',
    data: [25, 32, 28, 45, 65, 52, 45, 40],
  },
])
</script>
<template>
  <div class="col-md-6 col-xs-12">
    <q-card bordered flat class="bg-white">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-grey-9">Utilization Vehicle Analysis</div>
        <div class="q-gutter-sm">
          <q-btn-toggle
            v-model="utilizationViewType"
            flat
            toggle-color="primary"
            :options="[
              { label: 'Vehicle', value: 'vehicle' },
              { label: 'Driver', value: 'driver' },
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
