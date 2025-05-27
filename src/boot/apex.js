import VueApexCharts from 'vue3-apexcharts'

// Boot function that installs ApexCharts
export default function boot({ app }) {
  app.component('apex-chart', VueApexCharts)
}
