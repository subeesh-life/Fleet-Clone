<script setup lang="ts">
import { computed, ref } from 'vue';

// Define the KPI data interface
interface KpiCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  showInExpanded?: boolean;
  colClass?: string;
}

// Props - only define once
const props = defineProps<{
  showAllCards: boolean;
}>();

// Emits for parent component communication
const emit = defineEmits<{
  cardClick: [cardId: string, card: KpiCard];
}>();

// Reactive state for active card
const activeCardId = ref<string>('all-vehicles'); // Default active card

// KPI data array
const kpiData: KpiCard[] = [
  {
    id: 'all-vehicles',
    title: 'All vehicles',
    value: 1247,
    icon: 'hugeicons:bus-03',
    color: 'var(--fleet-color-blue-500)',
    bgColor: 'var(--fleet-color-blue-50)',
    borderColor: 'var(--fleet-color-blue-200)',
    textColor: 'var(--fleet-color-blue-500)',
    showInExpanded: false,
  },
  {
    id: 'moving-vehicles',
    title: 'Moving Vehicles',
    value: 759,
    icon: 'hugeicons:truck-delivery',
    color: 'var(--fleet-color-success-500)',
    bgColor: 'var(--fleet-color-success-25)',
    borderColor: 'var(--fleet-color-success-200)',
    textColor: 'var(--fleet-color-success-500)',
    showInExpanded: false,
  },
  {
    id: 'idling-vehicles',
    title: 'Idling Vehicles',
    value: 63,
    icon: 'hugeicons:container-truck',
    color: 'var(--fleet-color-gray-light-500)',
    bgColor: 'var(--fleet-color-gray-light-25)',
    borderColor: 'var(--fleet-color-gray-light-200)',
    textColor: 'var(--fleet-color-gray-light-500)',
    showInExpanded: false,
  },
  {
    id: 'disconnected-2hrs',
    title: '2+ Hrs disconnected vehicle',
    value: 31,
    icon: 'hugeicons:connect',
    color: 'var(--fleet-color-warning-500)',
    bgColor: 'var(--fleet-color-warning-25)',
    borderColor: 'var(--fleet-color-warning-200)',
    textColor: 'var(--fleet-color-warning-500)',
    showInExpanded: false,
  },
  {
    id: 'disconnected-24hrs',
    title: '24+ Hrs disconnected vehicle',
    value: 7,
    icon: 'hugeicons:connect',
    color: 'var(--fleet-color-warning-500)',
    bgColor: 'var(--fleet-color-warning-25)',
    borderColor: 'var(--fleet-color-warning-200)',
    textColor: 'var(--fleet-color-warning-500)',
    showInExpanded: true,
  },
  {
    id: 'valid-permit',
    title: 'Driving with valid permit',
    value: 423,
    icon: 'hugeicons:file-validation',
    color: 'var(--fleet-color-success-500)',
    bgColor: 'var(--fleet-color-success-25)',
    borderColor: 'var(--fleet-color-success-200)',
    textColor: 'var(--fleet-color-success-500)',
    showInExpanded: true,
  },
  {
    id: 'no-permit',
    title: 'Driving without valid permit',
    value: 37,
    icon: 'hugeicons:file-remove',
    color: 'var(--fleet-color-warning-500)',
    bgColor: 'var(--fleet-color-warning-25)',
    borderColor: 'var(--fleet-color-warning-200)',
    textColor: 'var(--fleet-color-warning-500)',
    showInExpanded: true,
  },
  {
    id: 'rejected-permit',
    title: 'Driving with rejected permit',
    value: 5,
    icon: 'hugeicons:file-block',
    color: 'var(--fleet-color-error-500)',
    bgColor: 'var(--fleet-color-error-25)',
    borderColor: 'var(--fleet-color-error-200)',
    textColor: 'var(--fleet-color-error-500)',
    showInExpanded: true,
  },
  {
    id: 'in-process-permit',
    title: 'Driving with in process permit',
    value: 11,
    icon: 'hugeicons:file-sync',
    color: 'var(--fleet-color-purple-500)',
    bgColor: 'var(--fleet-color-purple-25)',
    borderColor: 'var(--fleet-color-purple-200)',
    textColor: 'var(--fleet-color-purple-500)',
    showInExpanded: true,
  },
  {
    id: 'expired-document',
    title: 'Vehicle with expired document',
    value: 3,
    icon: 'hugeicons:file-corrupt',
    color: 'var(--fleet-color-error-500)',
    bgColor: 'var(--fleet-color-error-25)',
    borderColor: 'var(--fleet-color-error-200)',
    textColor: 'var(--fleet-color-error-500)',
    showInExpanded: true,
  },
];

// Computed property to filter cards based on showAllCards prop
const visibleCards = computed(() => {
  return kpiData.filter(card => !card.showInExpanded || props.showAllCards);
});

// Function to handle card click
const handleCardClick = (card: KpiCard) => {
  activeCardId.value = card.id;
  emit('cardClick', card.id, card);
};

// Function to check if a card is active
const isCardActive = (cardId: string) => {
  return activeCardId.value === cardId;
};
</script>

<template>
  <div class="kpi-cards row q-col-gutter-md">
    <div v-for="card in visibleCards" :key="card.id" class="col-md-3 col-sm-6 col-xs-12">
      <q-card
        bordered
        flat
        class="bg-white kpi-card"
        :class="{
          'active-card': isCardActive(card.id),
          'inactive-card': !isCardActive(card.id),
        }"
        clickable
        @click="handleCardClick(card)"
      >
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div :class="card.colClass || 'col'">
              <div class="text-caption text-grey-9">{{ card.title }}</div>
              <div class="text-h6 text-weight-bold" :style="{ color: card.textColor }">
                {{ card.value }}
              </div>
            </div>
            <div :class="card.colClass ? 'col' : 'col' + 'flex justify-end'">
              <q-avatar
                :style="{
                  backgroundColor: card.bgColor,
                  color: card.color,
                  border: `1px solid ${card.borderColor}`,
                }"
              >
                <IconifyIcon :icon="card.icon" width="24px" height="24px" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
/* Base card styles */
.kpi-cards .q-card.kpi-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

/* Inactive card styles - default border */
.kpi-cards .q-card.inactive-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
}

/* Active card styles */
.kpi-cards .q-card.active-card {
  border: 1px solid var(--q-secondary);
  border-left: 4px solid var(--q-secondary);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background-color: #ffffff;
}

/* Hover effects for inactive cards */
.kpi-cards .q-card.inactive-card:hover {
  border-color: var(--q-secondary);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Active card hover effect */
.kpi-cards .q-card.active-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

/* Focus styles for accessibility */
.kpi-cards .q-card.kpi-card:focus {
  outline: 2px solid var(--q-secondary);
  outline-offset: 2px;
}

/* Additional styling for better visual hierarchy */
.kpi-cards .q-card.inactive-card {
  opacity: 0.9;
}

.kpi-cards .q-card.active-card {
  opacity: 1;
}

/* Smooth transition for opacity changes */
.kpi-cards .q-card.kpi-card {
  transition:
    all 0.3s ease,
    opacity 0.2s ease;
}
</style>
