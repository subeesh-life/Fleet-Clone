<script setup lang="ts">
import { ref } from 'vue';

// Maintenance chart options
const maintenanceChartOptions = ref({
  chart: {
    type: 'donut',
    height: 350,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
      },
      offsetY: 0,
    },
  },
  labels: [
    'Under Maintenance',
    'Completed',
    'Due',
    'Overdue',
    'Scheduled',
    'Pending',
  ],
  colors: ['#2196F3', '#4CAF50', '#FFC107', '#F44336', '#9C27B0', '#FF9800'],
  fill: {
    type: 'gradient',
  },
  legend: {
    show: true,
    position: 'right',
    verticalAlign: 'middle',
    floating: false,
    fontSize: '14px',
    offsetX: -20,
    offsetY: 50,
    markers: {
      width: 12,
      height: 12,
      radius: 12,
    },
    itemMargin: {
      vertical: 8,
      horizontal: 0,
    },
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val: number) {
        return val + ' vehicles';
      },
    },
    style: {
      fontSize: '14px',
      color: '#FFFFFF',
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});

// Sample maintenance data
const maintenanceSeries = ref([25, 45, 15, 10, 20, 35]);
</script>

<template>
  <div class="col-md-6 col-xs-12">
    <q-card bordered flat class="bg-white">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-grey-9">Fleet Maintenance</div>
      </q-card-section>
      <q-card-section
        class="chart-container"
        style="min-height: 400px; position: relative"
      >
        <apex-chart
          type="donut"
          :options="maintenanceChartOptions"
          :series="maintenanceSeries"
          height="350"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
