<script setup lang="ts">
import VehiclePlate from 'components/shared/card/VehiclePlate.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { L } from 'boot/leaflet';

const intervalId = ref<number | null>(null);
const playbackTime = ref(47);

onMounted(() => {
  setTimeout(() => {
    const map = L.map('map', { zoomControl: false }).setView([24.4539, 54.3773], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    // Path closely following Corniche Road, Abu Dhabi
    const route: [number, number][] = [
      [24.469, 54.341], // Starting point near Corniche, a bit east of Marina Mall
      [24.4695, 54.3425],
      [24.47, 54.344],
      [24.4705, 54.3455],
      [24.471, 54.347],
      [24.4715, 54.3485],
      [24.472, 54.35],
      [24.4725, 54.3515],
      [24.473, 54.353],
      [24.4735, 54.3545], // Ending point a bit further along Corniche
      [24.474, 54.356],
      [24.4745, 54.3575],
    ];
    const polyline = L.polyline(route, { color: '#000', weight: 3 }).addTo(map);

    const carIcon = L.divIcon({
      html: `<div class="vehicle-icon"></div>`,
      iconSize: [24, 24],
      className: 'vehicle-marker',
    });

    let currentIdx = 0;
    const marker = L.marker(route[currentIdx] as L.LatLngExpression, { icon: carIcon }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    map.invalidateSize();

    intervalId.value = window.setInterval(() => {
      if (currentIdx + 1 < route.length) {
        currentIdx++;
        marker.setLatLng(route[currentIdx] as L.LatLngExpression);
      } else {
        window.clearInterval(intervalId.value!);
      }
    }, 10000); // 10 seconds
  }, 100);
});

onBeforeUnmount(() => {
  if (intervalId.value) {
    window.clearInterval(intervalId.value);
  }
});
</script>

<template>
  <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
    <div class="row flex justify-between items-center q-mb-md">
      <div class="col-md-4">
        <q-breadcrumbs active-color="secondary">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
          <q-breadcrumbs-el label="Live Map" color="text-grey-7" />
        </q-breadcrumbs>
      </div>

      <div class="col-md-8 flex justify-end q-gutter-x-md">
        <div class="row q-gutter-x-sm">
          <q-btn push color="white" text-color="grey-9" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:profile-02" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Event Profile</div>
            </q-tooltip>
          </q-btn>
          <q-btn push color="white" text-color="grey-9" round>
            <q-icon>
              <IconifyIcon icon="hugeicons:full-screen" width="16px" height="16px" />
            </q-icon>
            <q-tooltip>
              <div class="text-caption">Full Screen</div>
            </q-tooltip>
          </q-btn>

          <router-link :to="{ name: 'live-map' }">
            <q-btn push color="white" text-color="grey-9" round>
              <q-icon>
                <IconifyIcon icon="hugeicons:cancel-01" width="16px" height="16px" />
              </q-icon>
              <q-tooltip>
                <div class="text-caption">Close</div>
              </q-tooltip>
            </q-btn>
          </router-link>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12">
        <q-card bordered flat>
          <q-card-section class="q-pa-md">
            <div class="text-caption text-weight-medium text-grey-7 q-mb-sm">Current Location</div>
            <div class="row items-center q-gutter-sm">
              <IconifyIcon
                icon="hugeicons:location-08"
                width="24px"
                height="24px"
                class="text-grey-6 q-mt-xs"
              />
              <div>
                <div class="text-body2 text-weight-medium">
                  Fatima Bint Mubarak Street, Al Danah - Zone 1, Abu Dhabi
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">Jun 16, 2025 · 11:30 AM</div>
              </div>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pa-md">
            <div class="text-caption text-weight-medium text-grey-7 q-mb-sm">Vehicle Details</div>

            <div class="row items-center q-gutter-sm">
              <VehiclePlate />

              <div class="column q-ml-sm">
                <q-badge
                  class="bg-grey-2 text-grey-8 text-weight-bold text-caption q-mb-xs"
                  rounded
                  transparent
                >
                  2025 • Mini Bus
                </q-badge>

                <div class="text-caption text-weight-medium">Toyota, Coaster – SL</div>
              </div>
            </div>
            <div class="row q-mt-xs q-gutter-md items-center">
              <div class="col-auto">
                <div class="column q-gutter-xs">
                  <q-badge class="bg-grey-2 text-grey-8 text-weight-medium text-caption" rounded>
                    25 Seats
                  </q-badge>
                  <q-badge class="bg-brown text-white text-weight-medium text-caption" rounded>
                    BOOO7345
                  </q-badge>
                </div>
              </div>

              <div class="col flex justify-end">
                <div class="column q-gutter-xs">
                  <div class="text-body2 text-weight-bold text-right text-positive">Live</div>
                  <div class="text-caption text-grey-7">Since 17 Minutes Ago</div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pa-md">
            <div class="row">
              <div class="row q-gutter-md q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">
                    Odometer Reading
                  </div>
                  <div class="text-body2 text-weight-medium">77,675 km</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">
                    Company Code
                  </div>
                  <div class="text-body2 text-weight-medium">LC8393</div>
                </div>
              </div>

              <!-- Row 2 -->
              <div class="row q-gutter-md q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">
                    Business Domain
                  </div>
                  <div class="text-body2 text-weight-medium">Fire & Safety</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">Event Name</div>
                  <div class="text-body2 text-weight-medium">Safety Training</div>
                </div>
              </div>

              <!-- Row 3 -->
              <div class="row q-gutter-md">
                <div class="col-12">
                  <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">
                    Company Name
                  </div>
                  <div class="text-body2 text-weight-medium">Emirates Fire Systems Co.</div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section class="q-pa-md">
            <div class="text-h6 text-weight-medium text-primary q-mb-sm">Today - Jun 16, 2025</div>
            <div class="row items-center q-pa-sm q-gutter-sm bg-green-1 rounded-borders">
              <q-icon name="expand_more" class="text-black" />
              <q-icon name="shield" color="green" />
              <q-badge class="bg-grey-2 text-black" rounded>6:14:11 pm</q-badge>
              <q-icon name="arrow_forward" class="text-grey-7" />
              <q-icon name="power_settings_new" color="green" />
              <span class="text-weight-medium text-positive">Live</span>
              <q-space />
              <q-icon name="chevron_right" class="text-grey-7" />
            </div>

            <!-- Row 2: Red Shield -->
            <div class="row items-center q-mt-sm q-gutter-sm">
              <q-icon name="block" color="red" />
              <q-badge class="bg-grey-2 text-black" rounded>4:39:23 pm</q-badge>
              <q-icon name="arrow_forward" class="text-grey-7" />
              <q-badge class="bg-grey-2 text-black" rounded>4:56:12 pm</q-badge>
            </div>

            <!-- Row 3: Grey Shield -->
            <div class="row items-center q-mt-sm q-gutter-sm">
              <q-icon name="power_settings_new" color="grey" />
              <q-badge class="bg-grey-2 text-black" rounded>12:00 am</q-badge>
              <q-icon name="arrow_forward" class="text-grey-7" />
              <q-badge class="bg-grey-2 text-black" rounded>4:39:23 pm</q-badge>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-8 col-xs-12">
        <q-card bordered flat class="q-pa-none">
          <q-card-section class="q-pa-xs">
            <div class="row items-center justify-between q-pa-md bg-secondary relative-position">
              <div class="row flex justify-between full-width">
                <div class="flex flex-center">
                  <IconifyIcon
                    icon="hugeicons:steering"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 17 min</span>
                  <q-tooltip>
                    <div class="text-caption text-white">Driving Time</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center">
                  <IconifyIcon
                    icon="hugeicons:temperature"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 20°C</span>
                  <q-tooltip>
                    <div class="text-caption text-white">Temperature</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center">
                  <IconifyIcon
                    icon="hugeicons:dashboard-speed-02"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 79 km/h</span>
                  <q-tooltip>
                    <div class="text-caption text-white">Speed</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center gt-sm">
                  <IconifyIcon
                    icon="hugeicons:dashboard-speed-01"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 1200 rpm</span>
                  <q-tooltip>
                    <div class="text-caption text-white">RPM</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center gt-sm">
                  <IconifyIcon
                    icon="hugeicons:automotive-battery-02"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 12.6 volts</span>
                  <q-tooltip>
                    <div class="text-caption text-white">Battery</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center gt-sm">
                  <IconifyIcon
                    icon="hugeicons:slow-winds"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 0.184 kg CO2</span>
                  <q-tooltip>
                    <div class="text-caption text-white">CO2 emissions</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center">
                  <IconifyIcon
                    icon="hugeicons:route-01"
                    width="24px"
                    height="24px"
                    class="text-white q-mr-sm"
                  />
                  <span class="text-weight-medium text-white"> 12.6 km</span>
                  <q-tooltip>
                    <div class="text-caption text-white">Distance</div>
                  </q-tooltip>
                </div>
                <div class="flex flex-center cursor-pointer">
                  <q-badge class="bg-white text-primary">
                    <div class="text-caption text-weight-bold">+3 More</div>
                  </q-badge>
                </div>
              </div>
            </div>

            <!-- Vehicle Satus -->
            <div class="absolute-top text-center gentle-heartbeat" style="top: 80px; z-index: 2">
              <q-badge color="positive" text-color="white" class="text-subtitle2" rounded>
                <IconifyIcon icon="hugeicons:live-streaming-02" width="20px" height="20px" />
                <span class="text-weight-medium text-white q-px-xs">Moving</span>
              </q-badge>
            </div>

            <!-- Timeline Slider Section -->
            <div class="q-pa-sm glass-bg absolute-bottom z-top">
              <div class="row flex items-center">
                <q-list class="full-width">
                  <q-item class="full-width q-pa-none">
                    <q-item-section side>
                      <div class="text-caption text-weight-medium text-grey-8">7:30 am</div>
                    </q-item-section>
                    <q-item-section>
                      <q-slider v-model="playbackTime" :min="0" :max="47" label />
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-caption text-weight-medium text-grey-8 flex justify-end">
                        8:17 am
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <!-- Playback Control Buttons -->
              <div class="row justify-center q-pa-sm q-gutter-x-sm q-ml-none border-bottom">
                <q-btn round bordered>
                  <IconifyIcon
                    icon="hugeicons:backward-02"
                    width="24px"
                    height="24px"
                    class="text-grey-7"
                  />
                  <q-tooltip>
                    <div class="text-caption text-weight-medium text-white">Rewind</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round bordered>
                  <IconifyIcon
                    icon="hugeicons:live-streaming-02"
                    width="24px"
                    height="24px"
                    class="text-red-7"
                  />
                  <q-tooltip>
                    <div class="text-caption text-weight-medium text-white">Toggle Live</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round bordered>
                  <IconifyIcon
                    icon="hugeicons:play"
                    width="24px"
                    height="24px"
                    class="text-grey-7"
                  />
                  <q-tooltip>
                    <div class="text-caption text-weight-medium text-white">Play</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round bordered>
                  <IconifyIcon
                    icon="hugeicons:forward-02"
                    width="24px"
                    height="24px"
                    class="text-grey-7"
                  />
                  <q-tooltip>
                    <div class="text-caption text-weight-medium text-white">Forward</div>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>

            <div class="col-12">
              <div class="bg-grey-2">
                <div class="map-container">
                  <div id="map" style="height: 100%; width: 100%"></div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Cards for KPI's -->
  </q-page>
</template>

<style lang="scss" scoped>
#map {
  min-height: calc(100vh - 250px); // Default height for small devices
  z-index: 1;
  filter: grayscale(0.8);

  @media (min-width: 1024px) {
    // Medium devices and larger
    min-height: calc(100vh - 250px);
  }
}

.bg-grey-2 {
  display: block;
  position: relative;
}

.map-container {
  position: relative;
}

.vehicle-marker {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.vehicle-icon {
  background: #1976d2;
  border: 2px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    background: #1565c0;
  }
}

.glass-bg {
  background: rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.3px);
  -webkit-backdrop-filter: blur(2.3px);
  border: 1px solid rgba(255, 255, 255, 0.21);
}
@keyframes gentle-heartbeat {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.08);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.gentle-heartbeat {
  animation: gentle-heartbeat 2.5s ease-in-out infinite;
  transform-origin: center;
}
</style>
