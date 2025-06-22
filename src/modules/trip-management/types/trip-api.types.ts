import type { TripStatus } from './trip-config.types';

export interface TripResponse {
  id: string;
  trip_id: string;
  ref_id: string;
  event_association: {
    service: {
      service_id: number;
      service_name: string;
      business_category_id: number;
      business_category_name: string;
    };
    event_type: {
      event_type_id: number;
      event_type_name: string;
      usage_mode_id: number;
      usage_mode_name: string;
    };
    standardshuttle_type: string;
  };
  timing: {
    start_location: {
      type: string;
      address: string;
      lat: number;
      lon: number;
      time_in: string;
      time_out: string;
    };
    end_location: {
      type: string;
      address: string;
      lat: number;
      lon: number;
      distance_from_prev: number;
      duration_from_prev: number;
      time_in: string;
      time_out: string;
    };
    list_view: Array<{
      client: {
        id: number;
        uuid: string;
        logo: string;
        name: string;
        phones: string[];
        emails: string[];
      };
      entities: Array<{
        estimated_pick_up?: {
          address: string;
          lat: number;
          lon: number;
          waiting_time: number;
          time_in: string;
          time_out: string;
        };
        estimated_drop_off?: {
          address: string;
          lat: number;
          lon: number;
          waiting_time: number;
          time_in: string;
          time_out: string;
        };
        first_name: string;
        gender: number;
        id: number;
        image: string;
        is_terminated: string;
        last_name: string;
        phones: string[];
        uuid: string;
      }>;
    }>;
    stops_view: Array<{
      type: string;
      address: string;
      lat: number;
      lon: number;
      is_geo_enabled: boolean;
      geo_radius: number;
      is_geo_notification_enabled: boolean;
      notifications: any;
      distance_from_prev: number;
      duration_from_prev: number;
      waiting_time: number;
      client_tasks: {
        groups?: Array<{
          group: {
            id: number;
            uuid: string;
            logo: string;
            name: string;
            phones: string[];
            emails: string[];
          };
          owner_tasks: Array<{
            type: string;
            uuid: string;
            entity: {
              id: number;
              first_name: string;
              last_name: string;
              uuid: string;
              image: string;
              phones: string[];
              gender: number;
              is_terminated: string;
            };
            description: string;
          }>;
          entities: Array<{
            entity: {
              id: number;
              uuid: string;
              logo: string;
              name: string;
              phones: string[];
              emails: string[];
            };
            individuals: Array<{
              client: {
                id: number;
                uuid: string;
                logo: string;
                name: string;
                phones: string[];
                emails: string[];
              };
              tasks: Array<{
                type: string;
                uuid: string;
                entity: {
                  id: number;
                  first_name: string;
                  last_name: string;
                  uuid: string;
                  image: string;
                  phones: string[];
                  gender: number;
                  is_terminated: string;
                };
                description: string;
              }>;
            }>;
          }>;
        }>;
        entities?: Array<{
          entity: {
            id: number;
            uuid: string;
            logo: string;
            name: string;
            phones: string[];
            emails: string[];
          };
          owner_tasks: Array<{
            type: string;
            uuid: string;
            entity: {
              id: number;
              first_name: string;
              last_name: string;
              uuid: string;
              image: string;
              phones: string[];
              gender: number;
              is_terminated: string;
            };
            description: string;
          }>;
          individuals: Array<{
            client: {
              id: number;
              uuid: string;
              logo: string;
              name: string;
              phones: string[];
              emails: string[];
            };
            tasks: Array<{
              type: string;
              uuid: string;
              entity: {
                id: number;
                first_name: string;
                last_name: string;
                uuid: string;
                image: string;
                phones: string[];
                gender: number;
                is_terminated: string;
              };
              description: string;
            }>;
          }>;
        }>;
      };
      staff_tasks: any;
      driver_note: string;
      general_note: string;
      time_in: string;
      time_out: string;
      day: string;
    }>;
    total_stops: number;
    total_distance: number;
    total_duration: number;
    start_at: string;
    end_at: string;
  };
  actual: {
    activity_id: string;
    total_distance: number;
    total_duration: number;
    odometer: number;
    fuel_percentage: number;
    started_at: string | null;
    ended_at: string | null;
    absent_at: string | null;
  };
  event_names: Array<{
    type: string;
    names: string[];
  }>;
  note: string;
  business_source: string;
  asset: {
    id: number;
    uuid: string;
    color: string;
    asset_type: number;
    asset_type_name: string;
    asset_category: string;
    asset_category_id: number;
    asset_name: string;
    asset_name_id: number;
    vehicle_plate: string;
    make_name: string;
    model_name: string;
    year: number;
    vehicle_plate_color: string;
    seats: number;
  };
  driver: {
    id: number;
    is_primary: boolean;
    first_name: string;
    last_name: string;
    uuid: string;
    email: string[];
    phone: string[];
    gender: number;
    status: boolean;
    is_active_driver: boolean;
  };
  color: string;
  status: string;
  created_by: {
    user_id: number;
    uuid: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string[];
    image: string;
    gender: number;
    portal_id: number;
    portal: string;
    actual_departments: string[];
    timezone: string;
    user_type: string;
  };
  updated_by: {
    user_id: number;
    uuid: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string[];
    image: string;
    gender: number;
    portal_id: number;
    portal: string;
    actual_departments: string[];
    timezone: string;
    user_type: string;
  };
  created_at: string;
  updated_at: string;
  threshold: {
    time_to_start: number;
    time_to_finish: number;
    reminder_to_start: number;
    stops_to_group: number;
    trip_threshold: number;
    min_speed: number;
    max_speed: number;
    allowed_delay_to_start: number;
    allowed_delay_to_finish: number;
    wrong_pick_up_radius: number;
    wrong_drop_off_radius: number;
    route_geo_popup: number;
    vehicle_readiness: number;
    driver_readiness: number;
  };
  is_vip: boolean;
}

export type TripStatsResponse = Partial<Record<TripStatus, number>>;
