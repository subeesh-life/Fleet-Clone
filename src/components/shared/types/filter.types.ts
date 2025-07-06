export interface FilterOption {
  label: string
  value: any
  disabled?: boolean
  [key: string]: any
}

export interface FilterConfig {
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

export interface FilterGroup {
  id: string
  title?: string
  filters: FilterConfig[]
  showWhen?: (filters: Record<string, any>) => boolean
}

export interface FilterDrawerProps {
  modelValue: Record<string, any>
  filterGroups: FilterGroup[]
  title?: string
  applyButtonText?: string
  clearButtonText?: string
  autoApply?: boolean
}

export interface FilterDrawerEmits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'apply', filters: Record<string, any>): void
  (e: 'clear'): void
  (e: 'change', key: string, value: any): void
}