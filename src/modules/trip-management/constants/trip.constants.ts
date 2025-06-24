import type { TripMode, TripStatusConfig } from '../types/trip-config.types';
import { TripStatus } from '../types/trip-config.types';

export const LISTING_BREADCRUMBS = [
  { label: 'Home', to: { name: 'executive-dashboard' } },
  { label: 'Mobility', to: { name: 'mobility-link' } },
  { label: 'Dispatch', to: { name: 'dispatch-link' } },
  { label: 'Listing', color: 'text-grey-7' },
];

/* Trip Modes */
export const TRIP_MODE_OPTIONS: { name: TripMode; label: string }[] = [
  { name: 'standardoneway', label: 'One Way' },
  { name: 'standardroundtrip', label: 'Round Trip' },
];

export const TRIP_MODE_CONFIG = TRIP_MODE_OPTIONS.reduce(
  (acc, option) => {
    acc[option.name] = option;
    return acc;
  },
  {} as Record<TripMode, { label: string; name: TripMode }>
);

/* Trip Status Types */
export const TRIP_STATUS_CONFIG: TripStatusConfig[] = [
  {
    name: TripStatus.ALL,
    label: 'All',
    color: 'green-10',
  },
  {
    name: TripStatus.UPCOMING,
    label: 'Upcoming',
    color: 'purple',
  },
  {
    name: TripStatus.CONFIRMED,
    label: 'Confirmed',
    color: 'blue-9',
  },
  {
    name: TripStatus.COMPLETED,
    label: 'Completed',
    color: 'green',
  },
  {
    name: TripStatus.ABSENT,
    label: 'Absent',
    color: 'orange-10',
  },
  {
    name: TripStatus.APPROVAL_PENDING,
    label: 'Approval Pending',
    color: 'negative',
  },
  {
    name: TripStatus.CANCELED,
    label: 'Canceled',
    color: 'grey',
  },
  {
    name: TripStatus.DELAYED,
    label: 'Delayed',
    color: 'amber-9',
  },
  {
    name: TripStatus.DELETED,
    label: 'Deleted',
    color: 'red',
  },
  {
    name: TripStatus.LIVE,
    label: 'Live',
    color: 'cyan-9',
  },
  {
    name: TripStatus.MISSED,
    label: 'Missed',
    color: 'brown',
  },
];
