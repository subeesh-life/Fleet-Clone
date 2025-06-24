<template>
  <div>
    <!-- Table -->
    <q-table
      v-model:selected="selectedRows"
      :rows="rows"
      :columns="processedColumns"
      :row-key="rowKey"
      :pagination="paginationState"
      :loading="loading"
      :filter="search"
      :selection="selection"
      :selected-rows-label="getSelectedString"
      :no-data-label="noDataLabel"
      :rows-per-page-options="rowsPerPageOptions"
      :class="tableClass"
      :flat="flat"
      :bordered="bordered"
      :square="square"
      :separator="separator"
      :height="height"
      :style="{ height: typeof height === 'number' ? `${height}px` : height }"
      binary-state-sort
      @row-click="(evt, row, index) => emit('row-click', evt, row, index)"
      @row-dblclick="(evt, row, index) => emit('row-dblclick', evt, row, index)"
    >
      <slot></slot>

      <!-- Dynamic Column Rendering -->
      <template
        v-for="col in processedColumns"
        :key="col.name"
        v-slot:[`body-cell-${col.name}`]="props"
      >
        <q-td :props="props">
          <!-- Slot Override - Check first -->
          <slot
            v-if="$slots[`cell-${col.name}`]"
            v-bind="props"
            :row="props.row as T"
            :name="`cell-${col.name}`"
            :column="col"
          />

          <!-- Text Column -->
          <template v-else-if="col.type === 'text' || !col.type">
            <span :class="col.textClass">
              {{ formatValue(getFieldValue(props.row, col.field), col) }}
            </span>
          </template>

          <!-- Number Column -->
          <template v-else-if="col.type === 'number'">
            <span :class="[col.textClass, 'text-right']">
              {{ formatNumber(getFieldValue(props.row, col.field), col) }}
            </span>
          </template>

          <!-- Currency Column -->
          <template v-else-if="col.type === 'currency'">
            <span :class="[col.textClass, 'text-right']">
              {{ formatCurrency(getFieldValue(props.row, col.field), col) }}
            </span>
          </template>

          <!-- Date Column -->
          <template v-else-if="col.type === 'date'">
            <span :class="col.textClass">
              {{ formatDate(getFieldValue(props.row, col.field), col) }}
            </span>
          </template>

          <!-- Badge Column -->
          <template v-else-if="col.type === 'badge'">
            <q-badge
              :color="getBadgeColor(getFieldValue(props.row, col.field), col)"
              :label="formatValue(getFieldValue(props.row, col.field), col)"
              :outline="col.badgeOutline"
            />
          </template>

          <!-- Status Column -->
          <template v-else-if="col.type === 'status'">
            <div class="flex items-center">
              <q-icon
                v-if="col.showStatusIcon"
                :name="getStatusIcon(getFieldValue(props.row, col.field), col)"
                :color="getStatusColor(getFieldValue(props.row, col.field), col)"
                size="xs"
                class="q-mr-xs"
              />
              <q-badge
                :color="getStatusColor(getFieldValue(props.row, col.field), col)"
                :label="formatValue(getFieldValue(props.row, col.field), col)"
                :outline="col.statusOutline"
              />
            </div>
          </template>

          <!-- Progress Column -->
          <template v-else-if="col.type === 'progress'">
            <div class="flex items-center">
              <q-linear-progress
                :value="getFieldValue(props.row, col.field) / (col.maxValue || 100)"
                :color="getProgressColor(getFieldValue(props.row, col.field), col)"
                :stripe="col.progressStripe"
                :rounded="col.progressRounded"
                class="q-mr-sm"
                style="width: 100px"
              />
              <span class="text-caption"
                >{{ getFieldValue(props.row, col.field) }}{{ col.progressSuffix || '%' }}</span
              >
            </div>
          </template>

          <!-- Avatar Column -->
          <template v-else-if="col.type === 'avatar'">
            <q-avatar :size="col.avatarSize || '32px'">
              <img
                v-if="getFieldValue(props.row, col.field)"
                :src="getFieldValue(props.row, col.field)"
              />
              <q-icon v-else :name="col.avatarIcon || 'person'" />
            </q-avatar>
          </template>

          <!-- Chip Column -->
          <template v-else-if="col.type === 'chip'">
            <q-chip
              :color="getChipColor(getFieldValue(props.row, col.field), col)"
              :text-color="col.chipTextColor || 'white'"
              :icon="getChipIcon(getFieldValue(props.row, col.field), col)"
              :dense="col.chipDense !== false"
              :outline="col.chipOutline"
              :square="col.chipSquare"
            >
              {{ formatValue(getFieldValue(props.row, col.field), col) }}
            </q-chip>
          </template>

          <!-- Link Column -->
          <template v-else-if="col.type === 'link'">
            <a
              :href="getLinkHref(props.row, col)"
              :target="col.linkTarget || '_blank'"
              :class="['text-primary', col.linkClass]"
              @click="col.linkHandler && col.linkHandler(props.row, $event)"
            >
              {{ formatValue(getFieldValue(props.row, col.field), col) }}
            </a>
          </template>

          <!-- Button Column -->
          <template v-else-if="col.type === 'button'">
            <q-btn
              :label="getButtonLabel(props.row, col)"
              :color="getButtonColor(props.row, col)"
              :size="col.buttonSize || 'sm'"
              :flat="col.buttonFlat"
              :outline="col.buttonOutline"
              :rounded="col.buttonRounded"
              :dense="col.buttonDense !== false"
              :disable="col.buttonDisabled || isRowDisabled(props.row)"
              @click="col.buttonHandler && col.buttonHandler(props.row)"
            />
          </template>

          <!-- Custom Column -->
          <template v-else-if="col.type === 'custom'">
            <component
              v-if="col.component"
              :is="col.component"
              :row="props.row"
              :value="getFieldValue(props.row, col.field)"
              :column="col"
            />
            <span v-else-if="col.formatter">
              {{ col.formatter(getFieldValue(props.row, col.field), props.row, col) }}
            </span>
          </template>
        </q-td>
      </template>

      <!-- Loading Slot -->
      <template v-slot:loading>
        <q-inner-loading :showing="loading" color="primary" />
      </template>

      <!-- No Data Slot -->
      <template v-slot:no-data="{ message }">
        <div
          v-if="!loading && rows?.length === 0"
          class="full-width row flex-center text-grey-6 q-gutter-sm"
        >
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>{{ message }}</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, watch } from 'vue';
import { date } from 'quasar';
import type { Component } from 'vue';
import type { QTableColumn } from 'quasar';

interface ExtendedColumn extends Partial<QTableColumn> {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  type?:
    | 'text'
    | 'number'
    | 'currency'
    | 'date'
    | 'boolean'
    | 'checkbox'
    | 'toggle'
    | 'badge'
    | 'status'
    | 'progress'
    | 'rating'
    | 'image'
    | 'avatar'
    | 'chip'
    | 'link'
    | 'button'
    | 'select'
    | 'input'
    | 'custom';
  format?: (val: any, row: any) => any;

  // Type-specific options
  textClass?: string;

  // Number/Currency options
  precision?: number;
  currency?: string;
  locale?: string;

  // Date options
  dateFormat?: string;

  // Boolean options
  trueIcon?: string;
  falseIcon?: string;
  trueColor?: string;
  falseColor?: string;

  // Toggle options
  toggleColor?: string;

  // Badge options
  badgeColors?: Record<string, string>;
  badgeOutline?: boolean;

  // Status options
  statusColors?: Record<string, string>;
  statusIcons?: Record<string, string>;
  showStatusIcon?: boolean;
  statusOutline?: boolean;

  // Progress options
  maxValue?: number;
  progressColors?: { low: string; medium: string; high: string };
  progressThresholds?: { medium: number; high: number };
  progressStripe?: boolean;
  progressRounded?: boolean;
  progressSuffix?: string;

  // Rating options
  maxRating?: number;
  ratingSize?: string;
  ratingColor?: string;
  ratingIcon?: string;

  // Image options
  imageWidth?: string;
  imageHeight?: string;
  imageRatio?: number;
  imageClass?: string;
  imageStyle?: string;
  imageAlt?: string;

  // Avatar options
  avatarSize?: string;
  avatarIcon?: string;

  // Chip options
  chipColors?: Record<string, string>;
  chipIcons?: Record<string, string>;
  chipTextColor?: string;
  chipDense?: boolean;
  chipOutline?: boolean;
  chipSquare?: boolean;

  // Link options
  linkHref?: string | ((row: any) => string);
  linkTarget?: string;
  linkClass?: string;
  linkHandler?: (row: any, event: Event) => void;

  // Button options
  buttonLabel?: string | ((row: any) => string);
  buttonColor?: string | ((row: any) => string);
  buttonSize?: string;
  buttonFlat?: boolean;
  buttonOutline?: boolean;
  buttonRounded?: boolean;
  buttonDense?: boolean;
  buttonDisabled?: boolean;
  buttonHandler?: (row: any) => void;

  // Select options
  selectOptions?: any[] | ((row: any) => any[]);

  // Input options
  inputType?: string;

  // Custom options
  component?: Component;
  formatter?: (val: any, row: any, col: any) => string;

  // Common options
  readonly?: boolean;
}

interface TableAction {
  name: string;
  icon: string;
  handler: (row: any) => void;
  color?: string;
  tooltip?: string;
  size?: string;
  flat?: boolean;
  round?: boolean;
  dense?: boolean;
  disabled?: boolean | ((row: any) => boolean);
  visible?: boolean | ((row: any) => boolean);
}

interface PaginationState {
  sortBy: string | null;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

interface TableProps {
  rows: T[];
  columns: ExtendedColumn[];
  rowKey?: string;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  selection?: 'none' | 'single' | 'multiple';
  pagination?: PaginationState;
  rowsPerPageOptions?: number[];
  flat?: boolean;
  bordered?: boolean;
  square?: boolean;
  separator?: 'horizontal' | 'vertical' | 'cell' | 'none';
  tableClass?: string;
  actions?: TableAction[];
  noDataLabel?: string;
  serverSide?: boolean;
  height?: string | number;
  disableRow?: (row: any) => boolean;
}

// Props
const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'id',
  searchable: true,
  searchPlaceholder: 'Search...',
  selection: 'none',
  separator: 'horizontal',
  tableClass: '',
  noDataLabel: 'No data available',
  actions: () => [],
  rowsPerPageOptions: () => [5, 10, 15, 20, 25, 50, 100],
  pagination: () => ({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  }),
});

// Emits
const emit = defineEmits<{
  'update:selected': [value: any[]];
  'update:pagination': [value: PaginationState];
  request: [params: { pagination: PaginationState; filter: string }];
  'row-click': [evt: Event, row: any, index: number];
  'row-dblclick': [evt: Event, row: any, index: number];
  'cell-update': [row: any, field: string, value: any];
}>();

// State
const search = ref('');
const selectedRows = ref<any[]>([]);
const paginationState = ref<PaginationState>({
  sortBy: props.pagination.sortBy,
  descending: props.pagination.descending,
  page: props.pagination.page,
  rowsPerPage: props.pagination.rowsPerPage,
  rowsNumber: props.pagination.rowsNumber || props.rows.length,
});

// Computed
const hasActions = computed(() => props.actions.length > 0);

const processedColumns = computed(() => {
  const cols = [...props.columns];
  if (hasActions.value) {
    cols.push({
      name: 'actions',
      label: 'Actions',
      field: 'actions',
      align: 'center',
      sortable: false,
    });
  }
  return cols;
});

// Methods
const getSelectedString = () => {
  return selectedRows.value.length === 0
    ? ''
    : `${selectedRows.value.length} record${selectedRows.value.length > 1 ? 's' : ''} selected`;
};

const onRequest = (params: { pagination: PaginationState; filter: string }) => {
  if (props.serverSide) {
    emit('request', params);
  }
  paginationState.value = params.pagination;
  emit('update:pagination', params.pagination);
};

const isRowDisabled = (row: any): boolean => {
  return props.disableRow ? props.disableRow(row) : false;
};

// Helper to get field value
const getFieldValue = (row: any, field: string | ((row: any) => any)): any => {
  if (typeof field === 'function') {
    return field(row);
  }
  return row[field];
};

// Formatting functions
const formatValue = (value: any, col: ExtendedColumn): string => {
  if (col.format) {
    return col.format(value, null);
  }
  return value?.toString() || '';
};

const formatNumber = (value: any, col: ExtendedColumn): string => {
  if (value == null) return '';
  const num = Number(value);
  if (isNaN(num)) return value.toString();

  const precision = col.precision ?? 2;
  return num.toLocaleString(col.locale || 'en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};

const formatCurrency = (value: any, col: ExtendedColumn): string => {
  if (value == null) return '';
  const num = Number(value);
  if (isNaN(num)) return value.toString();

  return num.toLocaleString(col.locale || 'en-US', {
    style: 'currency',
    currency: col.currency || 'USD',
    minimumFractionDigits: col.precision ?? 2,
    maximumFractionDigits: col.precision ?? 2,
  });
};

const formatDate = (value: any, col: ExtendedColumn): string => {
  if (!value) return '';
  const format = col.dateFormat || 'YYYY-MM-DD';
  return date.formatDate(value, format);
};

// Color getters
const getBadgeColor = (value: any, col: ExtendedColumn): string => {
  if (col.badgeColors && col.badgeColors[value]) {
    return col.badgeColors[value];
  }
  return 'primary';
};

const getStatusColor = (value: any, col: ExtendedColumn): string => {
  if (col.statusColors && col.statusColors[value]) {
    return col.statusColors[value];
  }
  return 'grey';
};

const getStatusIcon = (value: any, col: ExtendedColumn): string => {
  if (col.statusIcons && col.statusIcons[value]) {
    return col.statusIcons[value];
  }
  return 'fiber_manual_record';
};

const getProgressColor = (value: number, col: ExtendedColumn): string => {
  if (!col.progressColors || !col.progressThresholds) return 'primary';

  const percentage = (value / (col.maxValue || 100)) * 100;
  if (percentage >= col.progressThresholds.high) return col.progressColors.high;
  if (percentage >= col.progressThresholds.medium) return col.progressColors.medium;
  return col.progressColors.low;
};

const getChipColor = (value: any, col: ExtendedColumn): string => {
  if (col.chipColors && col.chipColors[value]) {
    return col.chipColors[value];
  }
  return 'primary';
};

const getChipIcon = (value: any, col: ExtendedColumn): string | undefined => {
  if (col.chipIcons && col.chipIcons[value]) {
    return col.chipIcons[value];
  }
  return undefined;
};

// Link helpers
const getLinkHref = (row: any, col: ExtendedColumn): string => {
  if (typeof col.linkHref === 'function') {
    return col.linkHref(row);
  }
  return col.linkHref || '#';
};

// Button helpers
const getButtonLabel = (row: any, col: ExtendedColumn): string => {
  if (typeof col.buttonLabel === 'function') {
    return col.buttonLabel(row);
  }
  return col.buttonLabel || 'Action';
};

const getButtonColor = (row: any, col: ExtendedColumn): string => {
  if (typeof col.buttonColor === 'function') {
    return col.buttonColor(row);
  }
  return col.buttonColor || 'primary';
};

// Watchers
watch(selectedRows, newVal => {
  emit('update:selected', newVal);
});

watch(
  () => props.pagination,
  newVal => {
    paginationState.value = { ...newVal };
  },
  { deep: true }
);

watch(
  () => props.rows.length,
  newLength => {
    if (!props.serverSide) {
      paginationState.value.rowsNumber = newLength;
    }
  }
);

// Expose methods
defineExpose({
  refresh: () => {
    if (props.serverSide) {
      onRequest({
        pagination: paginationState.value,
        filter: search.value,
      });
    }
  },
  resetSelection: () => {
    selectedRows.value = [];
  },
  selectAll: () => {
    selectedRows.value = [...props.rows];
  },
});
</script>

<style scoped></style>
