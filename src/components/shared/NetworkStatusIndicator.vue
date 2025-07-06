<template>
  <div class="network-status-indicator">
    <q-btn flat round dense>
      <q-tooltip>
        <div class="text-center">
          <div class="text-weight-bold">
            {{ isOnline ? 'Online' : 'Offline' }}
          </div>
          <div v-if="isOnline && connectionType !== 'unknown'" class="text-caption">
            {{ connectionType }} - {{ effectiveType }}
          </div>
          <div v-else-if="!isOnline" class="text-caption">No internet connection</div>
        </div>
      </q-tooltip>
      <iconify-icon
        :icon="isOnline ? 'hugeicons:wifi' : 'hugeicons:wifi-off'"
        :class="isOnline ? 'text-positive' : 'text-negative'"
        width="20px"
        height="20px"
      />
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useNetworkStatus } from '../../composables/useNetworkStatus';

const { isOnline, connectionType, effectiveType } = useNetworkStatus();
</script>

<style scoped>
.network-status-indicator {
  display: inline-flex;
  align-items: center;
}
</style>
