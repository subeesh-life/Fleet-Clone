<script setup lang="ts">
import ExecutiveKpis from 'components/transportCompany/dashboards/KPIs/ExecutiveKPIs.vue';
import ExpensesChart from 'components/transportCompany/dashboards/charts/ExpensesChart.vue';
import UtilizationChart from 'components/transportCompany/dashboards/charts/UtilizationChart.vue';
import MaintenanceChart from 'components/transportCompany/dashboards/charts/MaintenanceChart.vue';
import EnvironmentalSustainabilityChart from 'components/transportCompany/dashboards/charts/EnvironmentalSustainabilityChart.vue';
import NotificationChart from 'components/transportCompany/dashboards/charts/NotificationChart.vue';
import { ref } from 'vue';
const showAllCards = ref(false);
</script>

<template>
  <q-page class="bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div
      class="title-container row bg-white q-py-md flex justify-between items-center"
      style="border-bottom: 1px solid #e0e0e0"
    >
      <div class="col-6 q-pl-md">
        <h6 class="text-grey-9 text-weight-bold">Executive Dashboard</h6>
        <span class="text-grey-7 text-caption">Today,Tuesday 11 Feb 2025</span>
      </div>
      <div class="col-6 text-right q-pr-md q-gutter-x-md">
        <q-btn
          class="kpi-toggle-btn"
          filled
          color="primary"
          @click="showAllCards = !showAllCards"
          :label="showAllCards ? 'Show Less KPIs' : 'View All KPIs'"
        >
          <q-icon
            :name="showAllCards ? 'expand_less' : 'expand_more'"
            class="q-ml-sm transition-transform"
          />
        </q-btn>
        <q-btn outline color="secondary" class="gt-sm">
          <q-icon left>
            <IconifyIcon
              icon="hugeicons:preference-horizontal"
              width="24px"
              height="24px"
            />
          </q-icon>
          Filter
        </q-btn>
        <q-btn outline color="secondary" class="gt-sm">
          <q-icon left>
            <IconifyIcon icon="hugeicons:share-08" width="24px" height="24px" />
          </q-icon>
          Share
        </q-btn>
      </div>
    </div>

    <div class="q-pa-md q-col-gutter-md">
      <ExecutiveKpis :show-all-cards="showAllCards" />
      <div class="row wrap q-col-gutter-md">
        <div class="col-md-6 col-xs-12">
          <UtilizationChart />
        </div>
        <div class="col-md-6 col-xs-12">
          <ExpensesChart />
        </div>
        <div class="col-md-6 col-xs-12">
          <MaintenanceChart />
        </div>
        <div class="col-md-6 col-xs-12">
          <EnvironmentalSustainabilityChart />
        </div>
        <div class="col-md-6 col-xs-12">
          <NotificationChart />
        </div>
      </div>
    </div>
  </q-page>
</template>
<style scoped>
.gradient-btn {
  background: linear-gradient(45deg, #2196f3, #1976d2);
  color: white;
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  background: linear-gradient(45deg, #1976d2, #2196f3);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.kpi-toggle-btn {
  font-weight: 600;
  padding: 8px 16px;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, var(--q-primary), #1976d2);
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);
}

.kpi-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
}

.kpi-toggle-btn:active {
  transform: translateY(0);
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>
