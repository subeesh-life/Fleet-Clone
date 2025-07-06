<script setup lang="ts">
import { ref } from 'vue';
import VehiclePlate from 'components/shared/card/VehiclePlate.vue';

interface EventData {
  id: number;
  title: string;
  subtitle: string;
  side: 'left' | 'right';
  icon?: string;
  color?: string;
  avatar?: string;
  isHeading?: boolean;
  content?: string;
  vehiclePlate?: {
    plateColor: string;
    seriesCode: string;
    seriesNumber: string;
    uniqueNumber: string;
  };
  vehicleDetails?: {
    year: string;
    type: string;
    make: string;
    model: string;
  };
  driverDetails?: {
    name: string;
    license: string;
    phone: string;
    email: string;
    image?: string;
  };
  assistantDetails?: {
    name: string;
    phone: string;
    email: string;
    image?: string;
  };
  passengerStats?: {
    total: number;
    male: number;
    female: number;
  };
  passengers?: Array<{
    id: number;
    name: string;
    grade: string;
    class: string;
    image: string;
    gender: 'male' | 'female';
  }>;
  cardDetailsTitle?: string;
  distance?: string;
  duration?: string;
  waitingTime?: string;
}

const tripData = ref<EventData[]>([
  {
    id: 1,
    title: 'Abu Dhabi, Central Bus Station - 01, Abu Dhabi',
    subtitle: '7:45 am, Jun 16, 2025',
    side: 'left',
    icon: 'flag',

    vehiclePlate: {
      plateColor: '#21BA45',
      seriesCode: 'AD',
      seriesNumber: '10',
      uniqueNumber: '49695',
    },
    vehicleDetails: {
      year: '2025',
      type: 'Medium Bus',
      make: 'Mercedes',
      model: 'Sprinter',
    },
    passengerStats: {
      total: 3,
      male: 2,
      female: 1,
    },
    passengers: [
      {
        id: 1,
        name: 'Ahmed Al Mansouri',
        grade: 'Grade 10',
        class: '10A',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 2,
        name: 'Fatima Al Zaabi',
        grade: 'Grade 9',
        class: '9B',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
      {
        id: 3,
        name: 'Omar Al Falasi',
        grade: 'Grade 11',
        class: '11C',
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
    ],
    cardDetailsTitle: 'Vehicle Details',
    driverDetails: {
      name: 'Ahmed Al Mansouri',
      license: 'AD-123456',
      phone: '+971 50 123 4567',
      email: 'ahmed.mansouri@fleet.com',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    },
    assistantDetails: {
      name: 'Fatima Al Zaabi',
      phone: '+971 55 987 1234',
      email: 'fatima.zaabi@fleet.com',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    distance: '0.0 km',
    duration: '0 min',
    waitingTime: '5 min',
  },

  {
    id: 2,
    title: 'Sultan Bin Zayed St / Mohamed Bin Khalifa St',
    subtitle: '7:51 am, Jun 16, 2025',
    side: 'right',
    icon: 'looks_one',

    passengerStats: {
      total: 3,
      male: 1,
      female: 2,
    },
    passengers: [
      {
        id: 4,
        name: 'Mariam Al Qasimi',
        grade: 'Grade 8',
        class: '8A',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
      {
        id: 5,
        name: 'Khalid Al Suwaidi',
        grade: 'Grade 7',
        class: '7B',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 6,
        name: 'Aisha Al Rumaithi',
        grade: 'Grade 9',
        class: '9A',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
    ],
    cardDetailsTitle: 'Passenger Details',
    assistantDetails: {
      name: 'Mariam Al Qasimi',
      phone: '+971 50 456 7890',
      email: 'mariam.qasimi@fleet.com',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    distance: '2.3 km',
    duration: '6 min',
    waitingTime: '3 min',
  },

  {
    id: 3,
    title: 'Shk Rashid Bin Saeed St / Rosary School',
    subtitle: '8:03 am, Jun 16, 2025',
    side: 'left',
    icon: 'looks_two',

    passengerStats: {
      total: 2,
      male: 1,
      female: 1,
    },
    passengers: [
      {
        id: 7,
        name: 'Yousef Al Dhaheri',
        grade: 'Grade 6',
        class: '6C',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 8,
        name: 'Layla Al Ameri',
        grade: 'Grade 5',
        class: '5A',
        image:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
    ],

    distance: '1.8 km',
    duration: '4 min',
    waitingTime: '2 min',
  },
  {
    id: 5,
    title: 'Shk Rashid Bin Saeed St / Immigration Department',
    subtitle: '8:16 am, Jun 16, 2025',
    side: 'right',
    icon: 'looks_3',

    passengerStats: {
      total: 2,
      male: 1,
      female: 1,
    },
    passengers: [
      {
        id: 9,
        name: 'Abdullah Al Nuaimi',
        grade: 'Grade 12',
        class: '12B',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 10,
        name: 'Noor Al Shamsi',
        grade: 'Grade 11',
        class: '11A',
        image:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
    ],
    cardDetailsTitle: 'Truck Details',
    distance: '3.2 km',
    duration: '8 min',
    waitingTime: '4 min',
  },
  {
    id: 6,
    title: 'Shk Rashid Bin Saeed St / Mushrif Mall',
    subtitle: '8:23 am, Jun 16, 2025  ',
    side: 'left',
    icon: 'looks_4',

    passengerStats: {
      total: 2,
      male: 1,
      female: 1,
    },
    passengers: [
      {
        id: 11,
        name: 'Hassan Al Mazrouei',
        grade: 'Grade 10',
        class: '10B',
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 12,
        name: 'Zara Al Ketbi',
        grade: 'Grade 9',
        class: '9C',
        image:
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
    ],
    cardDetailsTitle: 'Car Details',
    distance: '2.7 km',
    duration: '7 min',
    waitingTime: '3 min',
  },
  {
    id: 7,
    title: 'Rabdan St / Ministry Of Foreign Trade',
    subtitle: '8:29 am, Jun 16, 2025',
    side: 'right',
    icon: 'looks_5',

    passengerStats: {
      total: 3,
      male: 1,
      female: 2,
    },
    passengers: [
      {
        id: 13,
        name: 'Sara Al Hamed',
        grade: 'Grade 8',
        class: '8B',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
      {
        id: 14,
        name: 'Ali Al Rashid',
        grade: 'Grade 7',
        class: '7A',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 15,
        name: 'Reem Al Saadi',
        grade: 'Grade 6',
        class: '6A',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
    ],
    cardDetailsTitle: 'Minibus Details',
    distance: '1.5 km',
    duration: '4 min',
    waitingTime: '2 min',
  },
  {
    id: 8,
    title: 'St 3 / Adnec',
    subtitle: '8:37 am, Jun 16, 2025',
    side: 'left',
    icon: 'check_box_outline_blank',

    passengerStats: {
      total: 3,
      male: 2,
      female: 1,
    },
    passengers: [
      {
        id: 16,
        name: 'Mohammed Al Tayer',
        grade: 'Grade 12',
        class: '12A',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
      {
        id: 17,
        name: 'Amina Al Falahi',
        grade: 'Grade 11',
        class: '11B',
        image:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        gender: 'female',
      },
      {
        id: 18,
        name: 'Khalifa Al Maktoum',
        grade: 'Grade 10',
        class: '10C',
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        gender: 'male',
      },
    ],
    cardDetailsTitle: 'Coach Details',
    distance: '4.1 km',
    duration: '10 min',
    waitingTime: '5 min',
  },
]);
</script>

<template>
  <div class="q-pa-lg" style="height: calc(100vh - 180px)">
    <q-timeline layout="dense" side="right" color="secondary">
      <q-timeline-entry
        v-for="trip in tripData"
        :key="trip.id"
        :title="trip.title"
        :subtitle="trip.subtitle"
        :side="trip.side"
        :icon="trip.icon"
        :color="trip.color"
        :avatar="trip.avatar"
        :heading="trip.isHeading"
      >
        <!-- Regular Content Display -->
        <div v-if="trip.id">
          <q-card flat bordered>
            <q-card-section>
              <div class="row q-col-gutter-y-md">
                <!-- Vehicle Details Section -->
                <div
                  v-if="trip.vehiclePlate || trip.vehicleDetails"
                  class="col-md-4 col-xs-12 col-sm-6"
                >
                  <div class="text-caption text-grey-7">
                    {{ trip.cardDetailsTitle || 'Vehicle Details' }}
                  </div>
                  <div class="flex flex-start">
                    <VehiclePlate
                      v-if="trip.vehiclePlate"
                      :plateColor="trip.vehiclePlate.plateColor"
                      :seriesCode="trip.vehiclePlate.seriesCode"
                      :seriesNumber="trip.vehiclePlate.seriesNumber"
                      :uniqueNumber="trip.vehiclePlate.uniqueNumber"
                    />
                    <div v-if="trip.vehicleDetails" class="q-ml-md">
                      <q-badge
                        transparent
                        rounded
                        class="bg-grey-3 text-grey-7 text-weight-bold text-caption"
                      >
                        {{ trip.vehicleDetails.year }}
                        <q-chip color="primary" text-color="white" size="sm" class="q-ml-sm">
                          {{ trip.vehicleDetails.type }}
                        </q-chip>
                      </q-badge>

                      <div class="text-caption text-weight-medium flex items-center">
                        {{ trip.vehicleDetails.make }}, {{ trip.vehicleDetails.model }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Driver Details Section -->
                <div v-if="trip.driverDetails" class="col-md-4 col-xs-12 col-sm-6">
                  <div class="text-caption text-grey-7">Driver Details</div>
                  <div class="flex items-center">
                    <q-avatar size="40px" class="q-mr-sm">
                      <img
                        v-if="trip.driverDetails.image"
                        :src="trip.driverDetails.image"
                        :alt="trip.driverDetails.name"
                      />
                      <q-icon v-else name="person" size="24px" color="grey-6" />
                    </q-avatar>
                    <div class="flex-grow">
                      <div class="text-body2 text-weight-medium">{{ trip.driverDetails.name }}</div>
                      <div class="row items-center q-mt-xs">
                        <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                          {{ trip.driverDetails.license }}
                        </q-chip>
                        <q-chip
                          dense
                          rounded
                          style="height: 24px; width: 24px; border: 1px solid #0000001f"
                          class="q-mr-sm bg-white"
                        >
                          <IconifyIcon
                            icon="hugeicons:call"
                            width="16px"
                            height="16px"
                            class="text-grey-8"
                          />
                          <q-tooltip>{{ trip.driverDetails.phone }}</q-tooltip>
                        </q-chip>
                        <q-chip
                          dense
                          rounded
                          style="height: 24px; width: 24px; border: 1px solid #0000001f"
                          class="q-mr-sm bg-white"
                        >
                          <IconifyIcon
                            icon="hugeicons:mail-01"
                            width="16px"
                            height="16px"
                            class="text-grey-8"
                          />
                          <q-tooltip>{{ trip.driverDetails.email }}</q-tooltip>
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Assistant Details Section -->
                <div v-if="trip.assistantDetails" class="col-md-4 col-xs-12 col-sm-6">
                  <div class="text-caption text-grey-7">Assistant Details</div>
                  <div class="flex items-center">
                    <q-avatar size="40px" class="q-mr-sm">
                      <img
                        v-if="trip.assistantDetails.image"
                        :src="trip.assistantDetails.image"
                        :alt="trip.assistantDetails.name"
                      />
                      <q-icon v-else name="person" size="24px" color="grey-6" />
                    </q-avatar>
                    <div class="flex-grow">
                      <div class="text-body2 text-weight-medium">
                        {{ trip.assistantDetails.name }}
                      </div>
                      <div class="row items-center q-mt-xs">
                        <q-chip
                          dense
                          rounded
                          style="height: 24px; width: 24px; border: 1px solid #0000001f"
                          class="q-mr-sm bg-white"
                        >
                          <IconifyIcon
                            icon="hugeicons:call"
                            width="16px"
                            height="16px"
                            class="text-grey-8"
                          />
                          <q-tooltip>{{ trip.assistantDetails.phone }}</q-tooltip>
                        </q-chip>
                        <q-chip
                          dense
                          rounded
                          style="height: 24px; width: 24px; border: 1px solid #0000001f"
                          class="q-mr-sm bg-white"
                        >
                          <IconifyIcon
                            icon="hugeicons:mail-01"
                            width="16px"
                            height="16px"
                            class="text-grey-8"
                          />
                          <q-tooltip>{{ trip.assistantDetails.email }}</q-tooltip>
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Passenger Details Section -->
              <div v-if="trip.passengers && trip.passengers.length > 0" class="q-mt-md">
                <div class="text-caption text-grey-7 q-mb-sm">Passenger Details</div>
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="passenger in trip.passengers"
                    :key="passenger.id"
                    class="col-md-6 col-xs-12 col-sm-6"
                  >
                    <q-card flat bordered class="passenger-card">
                      <q-card-section class="q-pa-sm">
                        <div class="flex items-center">
                          <q-avatar size="40px" class="q-mr-sm">
                            <img :src="passenger.image" :alt="passenger.name" />
                          </q-avatar>
                          <div class="flex-grow">
                            <div class="text-weight-medium text-body2">{{ passenger.name }}</div>
                            <div class="text-caption text-grey-7">
                              {{ passenger.grade }} - {{ passenger.class }}
                            </div>
                            <q-chip
                              :color="passenger.gender === 'male' ? 'blue' : 'pink'"
                              text-color="white"
                              size="xs"
                              class="q-mt-xs"
                            >
                              {{ passenger.gender === 'male' ? 'Male' : 'Female' }}
                            </q-chip>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <!-- Route Metrics -->
          <div class="flex items-center justify-between">
            <div
              v-if="trip.distance || trip.duration || trip.waitingTime"
              class="text-left q-pa-xs q-gutter-x-sm"
            >
              <span class="text-body2 text-grey-7">
                <q-icon name="straighten" color="primary" size="16px" />
                {{ trip.distance }}
                <q-tooltip>Distance between stops</q-tooltip>
              </span>
              <span class="text-body2 text-grey-7">
                <q-icon name="schedule" color="primary" size="16px" />
                {{ trip.duration }}
                <q-tooltip>Duration between stops</q-tooltip>
              </span>
              <span class="text-body2 text-grey-7">
                <q-icon name="schedule" color="primary" size="16px" />
                {{ trip.waitingTime }}
                <q-tooltip>Waiting time</q-tooltip>
              </span>
            </div>

            <!-- Passenger Stats -->
            <div
              v-if="trip.passengerStats"
              class="text-left q-pa-xs q-gutter-x-sm flex items-center"
            >
              <span class="text-body2 text-grey-7">
                <q-icon name="people" color="secondary" size="16px" />
                T: {{ trip.passengerStats.total }}
                <q-tooltip>Total passengers</q-tooltip>
              </span>
              <span class="text-body2 text-grey-7">
                <q-icon name="male" color="blue" size="16px" />
                M: {{ trip.passengerStats.male }}
                <q-tooltip>Male passengers</q-tooltip>
              </span>
              <span class="text-body2 text-grey-7">
                <q-icon name="female" color="pink" size="16px" />
                F: {{ trip.passengerStats.female }}
                <q-tooltip>Female passengers</q-tooltip>
              </span>
            </div>
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<style scoped></style>
