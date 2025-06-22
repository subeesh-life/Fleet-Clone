import type { BrandColor, Color, DetailedColor } from 'quasar';

export type TripMode = 'standardoneway' | 'standardroundtrip';

export enum TripStatus {
  ALL = 'all',
  UPCOMING = 'upcoming',
  ABSENT = 'absent',
  APPROVAL_PENDING = 'approvalpending',
  CANCELED = 'cancelled',
  COMPLETED = 'completed',
  CONFIRMED = 'confirmed',
  DELAYED = 'delayed',
  DELETED = 'deleted',
  LIVE = 'live',
  MISSED = 'missed',
}

export interface TripStatusConfig {
  name: TripStatus;
  color: BrandColor | Color | DetailedColor;
  label: string;
}
