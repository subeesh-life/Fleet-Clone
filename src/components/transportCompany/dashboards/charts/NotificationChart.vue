<script setup lang="ts">
import { ref } from 'vue';

const notificationChartOptions = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: true,
    },
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
  yaxis: {
    title: {
      text: 'Number of Notifications',
    },
  },
  // Colors for different categories
  colors: [
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#A5D6A7',
    '#90CAF9',
    '#CE93D8',
    '#B0BEC5',
  ],
  legend: {
    position: 'right',
    offsetY: 40,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number) {
        return val + ' notifications';
      },
    },
  },
});

// Restructured notification data by categories
const notificationSeries = ref([
  {
    name: 'Events',
    data: [2, 1, 4, 8, 1, 5, 4, 2],
  },
  {
    name: 'Documents',
    data: [0, 1, 0, 0, 0, 2, 0, 2],
  },
  {
    name: 'Speeding',
    data: [2, 0, 6, 3, 5, 2, 4, 0],
  },
  {
    name: 'Accidents',
    data: [1, 0, 3, 2, 4, 0, 4, 1],
  },
  {
    name: 'Maintenance',
    data: [3, 3, 0, 10, 0, 3, 3, 4],
  },
  {
    name: 'Geo Fence',
    data: [0, 3, 0, 0, 7, 0, 2, 1],
  },
  {
    name: 'Others',
    data: [1, 0, 2, 0, 2, 0, 0, 1],
  },
]);
</script>

<template>
  <div class="col-md-6 col-xs-12">
    <q-card bordered flat class="bg-white">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-grey-9">Notification Analysis</div>
      </q-card-section>
      <q-card-section>
        <apex-chart
          type="bar"
          height="350"
          :options="notificationChartOptions"
          :series="notificationSeries"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
