<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useNetworkStatus } from '../composables/useNetworkStatus';

// Initialize network status monitoring
useNetworkStatus();
</script>
