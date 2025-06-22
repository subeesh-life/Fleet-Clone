import type { TripStatusConfig } from './types/trips.options';
import { TripStatus } from './types/trips.options';

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
    color: 'cyan',
  },
  {
    name: TripStatus.MISSED,
    label: 'Missed',
    color: 'brown',
  },
];
