<script setup lang="ts">
import { ref, computed } from 'vue';

interface SearchType {
  label: string;
  value: string;
}

interface SearchData {
  searchAttribute: string;
  searchTerms: string[];
}

interface Props {
  modelValue?: boolean;
  title?: string;
  subtitle?: string;
  searchTypes?: SearchType[];
  selectedSearchType?: string;
  searchTerms?: string[];
  placeholder?: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:selectedSearchType', value: string): void;
  (e: 'update:searchTerms', value: string[]): void;
  (e: 'search', data: SearchData): void;
  (e: 'clear'): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Search',
  subtitle: 'Find items faster with the filters below.',
  searchTypes: () => [],
  selectedSearchType: '',
  searchTerms: () => [],
  placeholder: 'Search for...',
});

const emit = defineEmits<Emits>();

// Internal state (not synced until save)
const searchText = ref('');
const internalSelectedSearchType = ref('');
const internalSearchTerms = ref<string[]>([]);

// Computed properties
const showDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    if (value) {
      // Reset internal state when dialog opens
      internalSelectedSearchType.value = props.selectedSearchType || '';
      internalSearchTerms.value = [...props.searchTerms];
    }
    emit('update:modelValue', value);
  },
});

const selectedFilter = computed(() => {
  return props.searchTypes.find((type: SearchType) => type.value === internalSelectedSearchType.value) || null;
});

// Methods
const addSearchTerm = (): void => {
  if (searchText.value && internalSelectedSearchType.value) {
    const newTerms = [...internalSearchTerms.value];
    if (!newTerms.includes(searchText.value)) {
      newTerms.push(searchText.value);
      internalSearchTerms.value = newTerms;
    }
    searchText.value = '';
  }
};

const removeSearchTerm = (index: number): void => {
  const newTerms = [...internalSearchTerms.value];
  newTerms.splice(index, 1);
  internalSearchTerms.value = newTerms;
};

const clearSearch = (): void => {
  searchText.value = '';
  internalSelectedSearchType.value = '';
  internalSearchTerms.value = [];
  emit('clear');
};

const handleSearch = (): void => {
  const searchData: SearchData = {
    searchAttribute: internalSelectedSearchType.value,
    searchTerms: internalSearchTerms.value,
  };
  
  // Update the external v-model values
  emit('update:selectedSearchType', internalSelectedSearchType.value);
  emit('update:searchTerms', internalSearchTerms.value);
  
  // Emit search event
  emit('search', searchData);
  showDialog.value = false;
};

const closeDialog = (): void => {
  showDialog.value = false;
};

// Handle input focus - auto-select first attribute if none selected
const handleInputFocus = (): void => {
  if (!internalSelectedSearchType.value && props.searchTypes.length > 0) {
    internalSelectedSearchType.value = props.searchTypes[0]?.value || '';
  }
};

// Helper method to get label from value (kept for potential future use)
// const getFilterLabel = (value: string): string => {
//   const searchType = props.searchTypes.find((type: SearchType) => type.value === value);
//   return searchType?.label || value;
// };
</script>

<template>
  <q-dialog
    v-model="showDialog"
    backdrop-filter="blur(2px)"
    transition-show="jump-down"
    transition-hide="jump-up"
    persistent
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section>
        <div class="row flex items-center">
          <div class="col-10">
            <div class="text-h6">{{ title }}</div>
            <div class="text-body2 text-grey-7">{{ subtitle }}</div>
          </div>
          <div class="col-2 flex justify-end">
            <q-btn flat dense @click="closeDialog">
              <IconifyIcon
                icon="hugeicons:cancel-01"
                width="24px"
                height="24px"
                class="text-grey-7"
              />
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
        
        <div class="row">
          <!-- Search Type Chips -->
          <div class="col-12 q-mr-sm">
            <q-chip
              v-for="searchType in searchTypes"
              :key="searchType.value"
              :selected="internalSelectedSearchType === searchType.value"
              @click="internalSelectedSearchType = internalSelectedSearchType === searchType.value ? '' : searchType.value"
              :outline="internalSelectedSearchType !== searchType.value"
              :color="internalSelectedSearchType === searchType.value ? 'primary' : 'grey-7'"
              :text-color="internalSelectedSearchType === searchType.value ? 'white' : 'grey-7'"
              :icon="internalSelectedSearchType === searchType.value ? 'check' : undefined"
              class="text-caption cursor-pointer"
            >
              {{ searchType.label }}
            </q-chip>
          </div>
          
          <!-- Search Input -->
          <div class="col-12 q-pt-md">
            <q-input 
              autofocus 
              outlined 
              v-model="searchText" 
              :placeholder="placeholder"
              @keyup.enter="addSearchTerm"
              @focus="handleInputFocus"
            >
              <template v-slot:prepend>
                <IconifyIcon
                  icon="hugeicons:search-02"
                  width="24px"
                  height="24px"
                  class="text-grey-7"
                />
              </template>
              <template v-slot:append>
                <q-btn flat dense @click="addSearchTerm" :disable="!searchText || !internalSelectedSearchType">
                  <IconifyIcon
                    icon="hugeicons:add-01"
                    width="24px"
                    height="24px"
                    class="text-grey-7"
                  />
                  <q-tooltip>Add Term</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
          
          <!-- Search Terms -->
          <div class="col-12 q-mt-sm" v-if="internalSearchTerms.length > 0">
            <div class="text-subtitle2 q-mb-sm">{{ selectedFilter?.label || 'Search Terms' }}:</div>
            <div class="row q-gutter-x-sm q-gutter-y-sm">
              <q-chip
                v-for="(term, index) in internalSearchTerms"
                :key="index"
                color="primary"
                text-color="white"
                removable
                @remove="removeSearchTerm(index)"
                class="text-caption"
              >
                {{ term }}
              </q-chip>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col-12 flex justify-end q-gutter-x-sm">
          <q-btn outline label="Clear" color="secondary" @click="clearSearch" />
          <q-btn label="Search" color="primary" @click="handleSearch" :disable="!internalSelectedSearchType || internalSearchTerms.length === 0" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>