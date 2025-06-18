<script setup lang="ts">
// Remove the local ref and define prop instead
defineProps<{
  showAllCards: boolean;
}>();
</script>

<template>
  <div class="kpi-cards row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="col">
              <div class="text-caption text-grey-9">All vehicles</div>
              <div class="text-h6 text-weight-bold">1247</div>
            </div>
            <div class="col flex justify-end">
              <q-avatar color="red" text-color="white">
                <IconifyIcon
                  icon="hugeicons:bus-03"
                  width="32px"
                  height="32px"
                  class="text-grey-7"
                />
              </q-avatar>
              <!-- <IconifyIcon icon="hugeicons:bus-03" width="32px" height="32px" class="text-grey-7" /> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">Moving vehicles</div>
          <div class="text-h6 text-weight-bold">759</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">Idling vehicles</div>
          <div class="text-h6 text-weight-bold">63</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="text-caption text-grey-9">2+ Hrs disconnected vehicle</div>
          <div class="text-h6 text-weight-bold">31</div>
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
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="text-caption text-grey-9">Driver Performance</div>
            <div class="text-h6 text-weight-bold">4.8/5.0</div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>
</template>
