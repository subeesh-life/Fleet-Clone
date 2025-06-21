export enum TripStatus {
  ALL = 'all',
  UPCOMING = 'upcoming',
  MISSED = 'missed',
  LIVE = 'live',
  DELAYED = 'delayed',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export type TripColor = 'success' | 'purple' | 'error' | 'warning' | 'grey';

export interface TripStatusConfig {
  name: TripStatus;
  color: TripColor;
  label: string;
  count: number;
}
