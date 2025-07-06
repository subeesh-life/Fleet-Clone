<template>
  <q-dialog
    v-model="isOpen"
    position="right"
    :full-height="true"
    persistent
    backdrop-filter="blur(2px)"
    class="filter-drawer"
  >
    <q-card class="filter-card column">
      <q-card-section class="q-pb-none">
        <div class="row items-start justify-between">
          <div>
            <div class="text-h6 text-weight-bold">{{ title || 'Filters' }}</div>
            <div class="text-caption text-grey-7">
              Select the filters applicable
            </div>
          </div>
          <div class="row items-center q-gutter-x-xs">
            <q-btn 
              color="primary" 
              :label="applyButtonText || 'Apply Filters'" 
              @click="applyFilters" 
            />
            <q-btn flat round dense @click="clearFilters">
              <IconifyIcon
                icon="hugeicons:refresh"
                width="20px"
                height="20px"
                class="text-grey-7"
              />
              <q-tooltip>{{ clearButtonText || 'Clear All' }}</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="closeDrawer"
              class="text-grey-7"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
      </q-card-section>

      <q-card-section class="q-pt-none col" style="overflow-y: auto;">
        <div class="row q-col-gutter-lg">
          <!-- Dynamic Filter Groups -->
          <template v-for="group in filterGroups" :key="group.id">
            <div class="col-12" v-if="group.title && shouldShowGroup(group)">
              <div class="text-subtitle1 text-weight-medium">{{ group.title }}</div>
            </div>
            
            <template v-for="filter in group.filters" :key="filter.key">
              <div class="col-12" v-if="shouldShowFilter(filter)">
                <div class="q-mt-sm q-gutter-y-xs">
                  <div class="text-subtitle2 text-grey-7">{{ filter.label }}</div>
                  
                  <!-- Select Filter -->
                  <q-select
                    v-if="filter.type === 'select'"
                    :model-value="currentFilters[filter.key]"
                    :options="getFilterOptions(filter)"
                    :placeholder="filter.placeholder || `Select ${filter.label}`"
                    :multiple="filter.multiple"
                    :use-chips="filter.multiple"
                    :option-label="filter.optionLabel || 'label'"
                    :option-value="filter.optionValue || 'value'"
                    dense
                    outlined
                    clearable
                    @update:model-value="onFilterChange(filter.key, $event)"
                  />

                  <!-- Text Input Filter -->
                  <q-input
                    v-else-if="filter.type === 'text'"
                    :model-value="currentFilters[filter.key]"
                    :placeholder="filter.placeholder || `Enter ${filter.label}`"
                    dense
                    outlined
                    clearable
                    @update:model-value="onFilterChange(filter.key, $event)"
                  />

                  <!-- Number Input Filter -->
                  <q-input
                    v-else-if="filter.type === 'number'"
                    :model-value="currentFilters[filter.key]"
                    :placeholder="filter.placeholder || `Enter ${filter.label}`"
                    type="number"
                    dense
                    outlined
                    clearable
                    @update:model-value="onFilterChange(filter.key, $event)"
                  />

                  <!-- Date Range Filter -->
                  <div v-else-if="filter.type === 'date-range'" class="row q-gutter-sm">
                    <q-input
                      :model-value="currentFilters[filter.key]?.from"
                      placeholder="From"
                      type="date"
                      dense
                      outlined
                      class="col"
                      @update:model-value="onDateRangeChange(filter.key, 'from', $event)"
                    />
                    <q-input
                      :model-value="currentFilters[filter.key]?.to"
                      placeholder="To"
                      type="date"
                      dense
                      outlined
                      class="col"
                      @update:model-value="onDateRangeChange(filter.key, 'to', $event)"
                    />
                  </div>

                  <!-- DateTime Range Filter -->
                  <div v-else-if="filter.type === 'datetime-range'" class="datetime-range-filter">
                    <div class="text-body2 q-mb-sm">{{ filter.label }}</div>
                    <div class="row q-gutter-sm">
                      <q-input
                        :model-value="currentFilters[filter.key]?.from"
                        :label="filter.fromLabel || 'From'"
                        type="datetime-local"
                        outlined
                        class="col"
                        @update:model-value="onDateRangeChange(filter.key, 'from', $event)"
                      />
                      <q-input
                        :model-value="currentFilters[filter.key]?.to"
                        :label="filter.toLabel || 'To'"
                        type="datetime-local"
                        outlined
                        class="col"
                        @update:model-value="onDateRangeChange(filter.key, 'to', $event)"
                      />
                    </div>
                  </div>

                  <!-- Toggle/Switch Filter -->
                  <q-toggle
                    v-else-if="filter.type === 'toggle'"
                    :model-value="currentFilters[filter.key]"
                    :label="filter.label"
                    @update:model-value="onFilterChange(filter.key, $event)"
                  />

                  <!-- Radio Filter -->
                  <div v-else-if="filter.type === 'radio'" class="radio-filter">
                    <div class="text-body2 q-mb-sm">{{ filter.label }}</div>
                    <q-option-group
                      :model-value="currentFilters[filter.key]"
                      :options="getFilterOptions(filter)"
                      type="radio"
                      @update:model-value="onFilterChange(filter.key, $event)"
                    />
                  </div>

                  <!-- Checkbox Filter -->
                  <div v-else-if="filter.type === 'checkbox'" class="checkbox-filter">
                    <div class="text-body2 q-mb-sm">{{ filter.label }}</div>
                    <q-option-group
                      :model-value="currentFilters[filter.key]"
                      :options="getFilterOptions(filter)"
                      type="checkbox"
                      @update:model-value="onFilterChange(filter.key, $event)"
                    />
                  </div>

                  <!-- Range Slider Filter -->
                  <div v-else-if="filter.type === 'range'" class="range-filter">
                    <div class="text-body2 q-mb-sm">{{ filter.label }}</div>
                    <q-range
                      :model-value="currentFilters[filter.key]"
                      :min="filter.min || 0"
                      :max="filter.max || 100"
                      :step="filter.step || 1"
                      :label-always="filter.labelAlways || false"
                      @update:model-value="onFilterChange(filter.key, $event)"
                    />
                  </div>

                </div>
              </div>
            </template>
          </template>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { httpService } from 'src/helpers/httpService'

// Types
interface FilterOption {
  label: string
  value: any
  disabled?: boolean
}

interface FilterConfig {
  key: string
  type: 'select' | 'text' | 'number' | 'date-range' | 'datetime-range' | 'toggle' | 'radio' | 'checkbox' | 'range'
  label: string
  placeholder?: string
  multiple?: boolean
  options?: FilterOption[] | string // API endpoint or static options
  optionLabel?: string
  optionValue?: string
  fromLabel?: string
  toLabel?: string
  min?: number
  max?: number
  step?: number
  labelAlways?: boolean
  showWhen?: (filters: Record<string, any>) => boolean
  validation?: (value: any) => boolean | string
  transform?: (value: any) => any
  debounce?: number
}

interface FilterGroup {
  id: string
  title?: string
  filters: FilterConfig[]
  showWhen?: (filters: Record<string, any>) => boolean
}

interface Props {
  modelValue: Record<string, any>
  filterGroups: FilterGroup[]
  title?: string
  applyButtonText?: string
  clearButtonText?: string
  autoApply?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'apply', filters: Record<string, any>): void
  (e: 'clear'): void
  (e: 'change', key: string, value: any): void
}

const props = withDefaults(defineProps<Props>(), {
  autoApply: false
})

const emit = defineEmits<Emits>()

// State
const isOpen = ref(false)
const filterOptionsCache = ref<Record<string, FilterOption[]>>({})
const loadingOptions = ref<Record<string, boolean>>({})

// Computed
const currentFilters = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const openDrawer = () => {
  isOpen.value = true
}

const closeDrawer = () => {
  isOpen.value = false
}

const shouldShowGroup = (group: FilterGroup): boolean => {
  if (!group.showWhen) return true
  return group.showWhen(currentFilters.value)
}

const shouldShowFilter = (filter: FilterConfig): boolean => {
  if (!filter.showWhen) return true
  return filter.showWhen(currentFilters.value)
}

const getFilterOptions = (filter: FilterConfig): FilterOption[] => {
  if (Array.isArray(filter.options)) {
    return filter.options
  }
  
  if (typeof filter.options === 'string') {
    return filterOptionsCache.value[filter.key] || []
  }
  
  return []
}

const loadOptionsFromAPI = async (filter: FilterConfig) => {
  if (typeof filter.options !== 'string') return
  
  const cacheKey = filter.key
  if (filterOptionsCache.value[cacheKey]) return
  
  try {
    loadingOptions.value[cacheKey] = true
    const response = await httpService.get<FilterOption[]>(filter.options)
    filterOptionsCache.value[cacheKey] = response
  } catch (error) {
    console.error(`Failed to load options for ${filter.key}:`, error)
    filterOptionsCache.value[cacheKey] = []
  } finally {
    loadingOptions.value[cacheKey] = false
  }
}

const onFilterChange = (key: string, value: any) => {
  const newFilters = { ...currentFilters.value }
  
  // Apply transform if provided
  const filter = findFilterByKey(key)
  if (filter?.transform) {
    value = filter.transform(value)
  }
  
  newFilters[key] = value
  emit('update:modelValue', newFilters)
  emit('change', key, value)
  
  if (props.autoApply) {
    applyFilters()
  }
}

const onDateRangeChange = (key: string, type: 'from' | 'to', value: any) => {
  const newFilters = { ...currentFilters.value }
  if (!newFilters[key]) {
    newFilters[key] = {}
  }
  newFilters[key][type] = value
  emit('update:modelValue', newFilters)
  emit('change', key, newFilters[key])
  
  if (props.autoApply) {
    applyFilters()
  }
}

const findFilterByKey = (key: string): FilterConfig | undefined => {
  for (const group of props.filterGroups) {
    const filter = group.filters.find(f => f.key === key)
    if (filter) return filter
  }
  return undefined
}

const applyFilters = () => {
  emit('apply', currentFilters.value)
  closeDrawer()
}

const clearFilters = () => {
  const clearedFilters: Record<string, any> = {}
  
  // Initialize with default values
  for (const group of props.filterGroups) {
    for (const filter of group.filters) {
      if (filter.type === 'date-range' || filter.type === 'datetime-range') {
        clearedFilters[filter.key] = { from: null, to: null }
      } else if (filter.multiple) {
        clearedFilters[filter.key] = []
      } else {
        clearedFilters[filter.key] = null
      }
    }
  }
  
  emit('update:modelValue', clearedFilters)
  emit('clear')
  
  if (props.autoApply) {
    applyFilters()
  }
}

// Load API options on mount
onMounted(() => {
  for (const group of props.filterGroups) {
    for (const filter of group.filters) {
      if (typeof filter.options === 'string') {
        void loadOptionsFromAPI(filter)
      }
    }
  }
})

// Expose methods
defineExpose({
  openDrawer,
  closeDrawer,
  applyFilters,
  clearFilters
})
</script>

<style lang="scss" scoped>
.filter-drawer {
  .filter-card {
    width: 500px;
    max-width: 90vw;
    min-width: 400px;
  }
  
  .filter-group-title {
    color: var(--q-primary);
    border-bottom: 1px solid var(--q-separator-color);
    padding-bottom: 4px;
  }
  
  .filter-item {
    .q-field {
      margin-bottom: 8px;
    }
  }
  
  .date-range-filter,
  .datetime-range-filter {
    .row {
      align-items: end;
    }
  }
  
  .radio-filter,
  .checkbox-filter {
    .q-option-group {
      margin-left: 8px;
    }
  }
  
  .range-filter {
    padding: 16px 8px;
  }
}
</style>