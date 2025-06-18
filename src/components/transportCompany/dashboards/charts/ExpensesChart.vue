<script setup lang="ts">
import { ref } from 'vue';

// Sample data for today's expenses
const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      'Fuel',
      'Maintenance',
      'Insurance',
      'Parking',
      'Tolls',
      'Cleaning',
      'Other',
    ],
  },
  yaxis: {
    title: {
      text: 'AED (Arab Emirates Dirham)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return 'AED ' + val.toFixed(2);
      },
    },
  },
  colors: ['#2196f3', '#ff5252'],
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      shape: 'circle',
    },
  },
});

const series = ref([
  {
    name: 'Business',
    data: [874.5, 1234.56, 450.0, 120.0, 85.0, 200.0, 250.0],
  },
  {
    name: 'Unauthorized',
    data: [0, 0, 0, 0, 50.0, 0, 100.0],
  },
]);
</script>

<template>
  <q-card bordered flat class="bg-white">
    <q-card-section class="row items-center justify-between">
      <div class="text-h6 text-grey-9">Today's Expenses</div>
    </q-card-section>
    <q-card-section>
      <apex-chart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </q-card-section>
  </q-card>
</template>
