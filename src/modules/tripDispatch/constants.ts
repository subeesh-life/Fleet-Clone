import type { TripStatusConfig } from './types';
import { TripStatus } from './types';

export const LISTING_BREADCRUMBS = [
  { label: 'Home', to: { name: 'executive-dashboard' } },
  { label: 'Mobility', to: { name: 'mobility-link' } },
  { label: 'Dispatch', to: { name: 'dispatch-link' } },
  { label: 'Listing', color: 'text-grey-7' },
];

export const TRIP_STATUS_CONFIG: TripStatusConfig[] = [
  {
    name: TripStatus.ALL,
    label: 'All',
    count: 32,
    color: 'success',
  },
  {
    name: TripStatus.UPCOMING,
    label: 'Upcoming',
    count: 219,
    color: 'purple',
  },
  {
    name: TripStatus.MISSED,
    label: 'Missed',
    count: 17,
    color: 'error',
  },
  {
    name: TripStatus.LIVE,
    label: 'Live',
    count: 173,
    color: 'success',
  },
  {
    name: TripStatus.DELAYED,
    label: 'Delayed',
    count: 35,
    color: 'warning',
  },
  {
    name: TripStatus.COMPLETED,
    label: 'Completed',
    count: 651,
    color: 'grey',
  },
  {
    name: TripStatus.CANCELED,
    label: 'Canceled',
    count: 19,
    color: 'error',
  },
];
