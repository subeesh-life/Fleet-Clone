<script setup lang="ts">
import { ref, computed } from 'vue';
import StopTab from './stops/StopTab.vue';
import AssetTab from './assets/AssetTab.vue';
import StaffTab from './staffs/StaffTab.vue';

const activeTab = ref('stops');
const mainTab = ref('stops');
// Add tabs array to manage order
const tabs = ref([
  { name: 'stops', icon: 'hugeicons:stop', label: 'Stops' },
  { name: 'assets', icon: 'hugeicons:bus-03', label: 'Assets' },
  { name: 'staff', icon: 'hugeicons:user-account', label: 'Staff' },
]);

const isMainTab = computed(
  () => (tabName: string) => tabName === mainTab.value
);

interface Tab {
  name: string;
  icon: string;
  label: string;
}

const handleTabClick = (tabName: string) => {
  if (tabName !== mainTab.value) {
    mainTab.value = tabName;
    activeTab.value = tabName;

    // Reorder tabs - move clicked tab to first position
    const tabIndex = tabs.value.findIndex(tab => tab.name === tabName);
    if (tabIndex > 0) {
      const movedTab = tabs.value[tabIndex] as Tab;
      tabs.value.splice(tabIndex, 1);
      tabs.value.unshift(movedTab);
    }
  }
};
</script>

<template>
  <q-card flat outline bordered>
    <q-tabs
      v-model="activeTab"
      dense
      inline-label
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <!-- Replace static tabs with v-for -->
      <template v-for="tab in tabs" :key="tab.name">
        <q-tab
          :name="tab.name"
          @click="handleTabClick(tab.name)"
          :class="{ 'full-tab': isMainTab(tab.name) }"
        >
          <template v-slot:default>
            <q-tooltip>{{ tab.label }}</q-tooltip>
            <IconifyIcon
              :icon="tab.icon"
              width="24px"
              height="24px"
              class="q-mr-sm"
            />
            <span v-if="isMainTab(tab.name)">{{ tab.label }}</span>
          </template>
        </q-tab>
        <q-space v-if="isMainTab(tab.name)" />
      </template>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel name="stops">
        <StopTab />
      </q-tab-panel>

      <q-tab-panel name="assets">
        <AssetTab />
      </q-tab-panel>

      <q-tab-panel name="staff">
        <StaffTab />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<style scoped></style>
