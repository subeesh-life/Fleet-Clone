import type { BrandColor, Color, DetailedColor } from 'quasar';

export enum TripStatus {
  ALL = 'all',
  UPCOMING = 'upcoming',
  ABSENT = 'absent',
  APPROVAL_PENDING = 'approval_pending',
  CANCELED = 'canceled',
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
  count: number;
}
