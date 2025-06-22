import type { TripStatusConfig } from './types';
import { TripStatus } from './types';

export const LISTING_BREADCRUMBS = [
  { label: 'Home', to: { name: 'executive-dashboard' } },
  { label: 'Mobility', to: { name: 'mobility-link' } },
  { label: 'Dispatch', to: { name: 'dispatch-link' } },
  { label: 'Listing', color: 'text-grey-7' },
];

/* Trip Status Types */
export const TRIP_STATUS_CONFIG: TripStatusConfig[] = [
  {
    name: TripStatus.ALL,
    label: 'All',
    count: 32,
    color: 'green',
  },
  {
    name: TripStatus.UPCOMING,
    label: 'Upcoming',
    count: 219,
    color: 'purple',
  },
  {
    name: TripStatus.CONFIRMED,
    label: 'Confirmed',
    count: 145,
    color: 'blue-9',
  },
  {
    name: TripStatus.COMPLETED,
    label: 'Completed',
    count: 651,
    color: 'green-10',
  },
  {
    name: TripStatus.ABSENT,
    label: 'Absent',
    count: 8,
    color: 'orange-10',
  },
  {
    name: TripStatus.APPROVAL_PENDING,
    label: 'Approval Pending',
    count: 12,
    color: 'negative',
  },
  {
    name: TripStatus.CANCELED,
    label: 'Canceled',
    count: 19,
    color: 'grey',
  },
  {
    name: TripStatus.DELAYED,
    label: 'Delayed',
    count: 35,
    color: 'amber-9',
  },
  {
    name: TripStatus.DELETED,
    label: 'Deleted',
    count: 3,
    color: 'red',
  },
  {
    name: TripStatus.LIVE,
    label: 'Live',
    count: 173,
    color: 'cyan',
  },
  {
    name: TripStatus.MISSED,
    label: 'Missed',
    count: 17,
    color: 'brown',
  },
];
