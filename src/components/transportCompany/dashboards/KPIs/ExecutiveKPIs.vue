<script setup lang="ts">
import FleetChips from 'src/components/shared/chips/FleetChips.vue'

// Remove the local ref and define prop instead
defineProps<{
  showAllCards: boolean
}>()
</script>

<template>
  <div class="kpi-cards row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">No Asset & Utilization</div>
          <div class="text-h6 text-weight-bold">113</div>
          <div class="text-caption text-grey-7 flex items-center">
            <FleetChips
              class="q-mr-sm"
              text="5.3%"
              color="success"
              iconName="hugeicons:arrow-up-02"
              iconSize="10px"
              :iconVisibility="true"
            />
            <span class="text-grey-7">Utilized, Compared to yesterday.</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">Assets Usage / Efficiency</div>
          <div class="text-h6 text-weight-bold">4 hrs 17 mins</div>
          <div class="text-caption flex items-center">
            <FleetChips
              class="q-mr-sm"
              text="7.1%"
              color="success"
              iconName="hugeicons:arrow-up-02"
              :iconVisibility="true"
            />
            <span class="text-grey-7">Compared to yesterday.</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">Fuel Consumption</div>
          <div class="text-h6 text-weight-bold">1582.5 L - AED 3,956.25</div>
          <div class="text-caption text-grey-7 flex items-center">
            <FleetChips
              class="q-mr-sm"
              text="8.37 L/100 KM"
              color="purple"
              iconName="hugeicons:arrow-up-02"
              iconSize="10px"
              :iconVisibility="false"
            />
            <span class="text-grey-7">Average</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">Maintenance Cost</div>
          <div class="text-h6 text-weight-bold">AED 11,234.56</div>
          <div class="text-caption text-grey-7 flex items-center">
            <FleetChips
              class="q-mr-sm"
              text="AED 2219.37"
              color="error"
              iconName="hugeicons:arrow-up-02"
              iconSize="10px"
              :iconVisibility="false"
            />
            <span class="text-grey-7">Average per vehicle</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Additional cards that show/hide -->
    <template v-if="showAllCards">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="text-caption text-grey-9">Total Distance</div>
            <div class="text-h6 text-weight-bold">2,345 KM</div>
            <div class="text-caption text-grey-7 flex items-center">
              <FleetChips
                class="q-mr-sm"
                text="12.3%"
                color="success"
                iconName="hugeicons:arrow-up-02"
                iconSize="10px"
                :iconVisibility="true"
              />
              <span class="text-grey-7">Increase from last month</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="text-caption text-grey-9">Driver Performance</div>
            <div class="text-h6 text-weight-bold">4.8/5.0</div>
            <div class="text-caption text-grey-7 flex items-center">
              <FleetChips
                class="q-mr-sm"
                text="0.2"
                color="success"
                iconName="hugeicons:arrow-up-02"
                iconSize="10px"
                :iconVisibility="true"
              />
              <span class="text-grey-7">Above target</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>
</template>
