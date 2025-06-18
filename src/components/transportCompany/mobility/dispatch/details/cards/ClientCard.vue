<script setup lang="ts"></script>
<template>
  <q-card flat bordered class="q-pa-xs q-mb-md full-width">
    <q-card-section class="q-pa-xs">
      <div class="row flex items-center">
        <div class="col-2">
          <div class="text-body1 text-weight-medium">Clients:</div>
        </div>
        <div class="col-10">
          <div class="row flex items-center justify-end cursor-pointer">
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white"
                >2</q-avatar
              >Group
            </q-chip>
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white"
                >1</q-avatar
              >Entity
            </q-chip>
            <q-chip>
              <q-avatar size="24px" color="primary" text-color="white"
                >12</q-avatar
              >Individual
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style scoped lang="scss">
#map {
  min-height: 300px; // Default height for small devices
  z-index: 1;
  filter: grayscale(0.8);
}

.bg-grey-2 {
  display: block;
  position: relative;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2; // Increased z-index
  pointer-events: auto;
}

// Separate container for the map to apply grayscale
</style>
