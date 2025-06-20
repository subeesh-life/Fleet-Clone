<template>
  <q-layout view="hHh LpR fff">
    <!-- Header -->
    <q-header class="bg-white" style="color: var(--fleet-color-text-primary)">
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer">
          <iconify-icon icon="hugeicons:menu-02" width="24px" height="24px" class="text-grey-9" />
        </q-btn>
        <div class="flex items-center q-ml-sm">
          <q-img src="assets/logos/AD_Mobility.png" style="width: 80px; height: 30px" />
          <q-toolbar-title class="gt-xs"> Abu Dhabi Mobility </q-toolbar-title>
        </div>

        <q-space />

        <div class="row flex items-center">
          <div>
            <q-btn flat round>
              <q-tooltip>Add New</q-tooltip>
              <iconify-icon
                icon="hugeicons:add-circle-half-dot"
                width="24px"
                height="24px"
                class="text-grey-9"
              />
              <q-menu
                v-model="addNewMenu"
                transition-show="jump-down"
                transition-hide="jump-up"
                anchor="bottom right"
                self="top right"
                :offset="[0, 10]"
                class="animated-menu"
              >
                <q-list style="min-width: 300px" padding>
                  <!-- User Info Section -->

                  <q-item clickable v-ripple :to="{ name: 'create-event' }">
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:route-02"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Event</q-item-label>
                      <q-item-label caption>Schedule and manage an upcoming event</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:ai-user"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Client</q-item-label>
                      <q-item-label caption>Register a new customer profiles</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:user-account"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Staff</q-item-label>
                      <q-item-label caption>Register a team member or employee</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:bus-03"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Vehicle</q-item-label>
                      <q-item-label caption>Add details for a new fleet vehicle</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="healthicons:truck-driver-outline"
                        width="30px"
                        height="30px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Driver</q-item-label>
                      <q-item-label caption
                        >Assign a licensed driver to your operations</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:user-square"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>New Assistant</q-item-label>
                      <q-item-label caption>Register a support staff or helper</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div>
            <q-btn flat round>
              <q-tooltip>Settings</q-tooltip>
              <iconify-icon
                icon="hugeicons:settings-01"
                width="24px"
                height="24px"
                class="text-grey-9"
              />
            </q-btn>
          </div>
          <div>
            <q-btn flat round>
              <q-tooltip>Chats</q-tooltip>
              <iconify-icon
                icon="hugeicons:message-01"
                width="24px"
                height="24px"
                class="text-grey-9"
              />
            </q-btn>
          </div>
          <div>
            <q-btn flat round>
              <q-badge color="red" rounded class="absolute-top-right q-mr-xs q-mt-xs" />
              <q-tooltip>Notifications</q-tooltip>
              <iconify-icon
                icon="hugeicons:notification-01"
                width="24px"
                height="24px"
                class="text-grey-9"
              />
            </q-btn>
          </div>
          <div>
            <q-separator vertical class="q-mx-sm" style="height: 30px" />
          </div>
          <div>
            <q-btn flat class="logged-user flex items-center">
              <div class="q-mr-sm gt-sm">
                <div class="text-subtitle2 text-weight-bold text-right">John</div>
                <div class="text-caption text-right text-grey-7">Transport Manager</div>
              </div>
              <div>
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
              </div>
              <div class="q-ml-sm q-mt-sm">
                <iconify-icon
                  icon="hugeicons:arrow-down-01"
                  width="24px"
                  height="24px"
                  class="text-grey-9"
                />
              </div>
              <q-menu
                v-model="profileMenu"
                transition-show="jump-down"
                transition-hide="jump-up"
                anchor="bottom right"
                self="top right"
                :offset="[0, 10]"
                class="animated-menu"
              >
                <q-list style="min-width: 300px" padding>
                  <!-- User Info Section -->
                  <q-item class="q-px-md">
                    <q-item-section>
                      <div>
                        <span class="text-grey-7 text-caption">Level: </span>
                        <span class="text-weight-bold text-subtitle2">Senior </span>
                      </div>
                      <div class="row items-center">
                        <div class="text-grey-7 text-caption">john.doe@email.com</div>
                        <q-btn flat dense padding="xs" class="q-ml-xs" @click="copyEmail">
                          <q-tooltip>Copy email</q-tooltip>
                          <iconify-icon
                            icon="hugeicons:copy-02"
                            width="16px"
                            height="16px"
                            class="text-grey-7"
                          />
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>

                  <q-separator class="q-my-sm" />

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <IconifyIcon
                        icon="hugeicons:user-account"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>My Profile</q-item-label>
                      <q-item-label caption>Manage Personal Details</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:building-03"
                        width="20px"
                        height="20px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Company Profile</q-item-label>
                      <q-item-label caption>Manage Company Details</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <iconify-icon
                        icon="hugeicons:language-square"
                        width="20px"
                        height="20px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Language</q-item-label>
                      <q-item-label caption>Choose Preferred Language</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator class="q-my-sm" />

                  <div class="q-px-md q-py-sm">
                    <q-btn
                      outline
                      class="full-width border-grey-7"
                      color="text-grey-7"
                      label="Logout"
                      v-ripple
                    />
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <!-- Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
    >
      <div class="full-height column justify-between">
        <div>
          <q-list>
            <!-- Main Menu -->
            <template v-if="currentMenu === 'main'">
              <template v-for="item in menuItems" :key="item.label">
                <!-- For items with sub-menu -->
                <q-expansion-item
                  v-if="item.children"
                  expand-separator
                  class="cursor-pointer"
                  :label="item.label"
                  group="somegroup"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <iconify-icon
                        :icon="item.icon"
                        width="24px"
                        height="24px"
                        class="text-grey-7"
                      />
                    </q-item-section>
                    <q-item-section> {{ item.label }} </q-item-section>
                  </template>
                  <q-list class="q-ml-sm q-pl-xl">
                    <q-item
                      v-for="child in item.children"
                      :key="child.label"
                      clickable
                      v-ripple
                      @click="child.action && child.action()"
                    >
                      <q-item-section class="text-caption">{{ child.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>

                <!-- For items without sub-menu -->
                <q-item v-else clickable v-ripple>
                  <q-item-section avatar>
                    <iconify-icon
                      :icon="item.icon"
                      width="24px"
                      height="24px"
                      class="text-grey-7"
                    />
                  </q-item-section>
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </template>
            </template>

            <!-- Dispatch Menu -->
            <template v-else-if="currentMenu === 'dispatch'">
              <q-item
                v-for="item in dispatchMenu"
                :key="item.label"
                clickable
                v-ripple
                @click="item.action && item.action()"
              >
                <q-item-section avatar>
                  <iconify-icon :icon="item.icon" width="24px" height="24px" class="text-grey-7" />
                </q-item-section>
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer bordered class="bg-white text-black">
      <q-toolbar class="q-py-xs">
        <q-toolbar-title class="text-center text-caption">
          © 2025 Sunshine Transports
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts';

const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(false);
const miniState = ref(true);
const currentMenu = ref('main');
const profileMenu = ref(false);
const addNewMenu = ref(false);

// Initialize keyboard shortcuts
useKeyboardShortcuts(router);

// Add dispatch submenu items
const dispatchMenu = [
  {
    label: 'Back to Main Menu',
    icon: 'hugeicons:arrow-left-02',
    action: () => (currentMenu.value = 'main'),
  },
  {
    label: 'Listing Dispatch',
    icon: 'hugeicons:route-02',
    action: () => router.push({ name: 'dispatch' }),
  },
  {
    label: 'Draft Events',
    icon: 'hugeicons:floppy-disk',
  },
  {
    label: 'Deleted Events',
    icon: 'hugeicons:delete-02',
  },
  {
    label: 'Conflicted Events',
    icon: 'hugeicons:alert-02',
  },
];

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'hugeicons:dashboard-square-03',
    children: [
      {
        label: 'Executive Dashboard',
        action: () => router.push({ name: 'executive-dashboard' }),
      },
      { label: 'Management Dashboard' },
      { label: 'Operation Dashboard' },
      { label: 'Energy Dashboard' },
      { label: 'Maintenance Dashboard' },
    ],
  },
  {
    label: 'Mobility',
    icon: 'hugeicons:bus-03',
    children: [
      {
        label: 'Dispatches',
        action: () => {
          currentMenu.value = 'dispatch';
        },
      },
      { label: 'Live Map' },
    ],
  },
  {
    label: 'Assets Management',
    icon: 'hugeicons:building-03',
    children: [
      { label: 'Vehicles' },
      { label: 'Drivers' },
      { label: 'Assistants' },
      { label: 'Staffs' },
    ],
  },
  {
    label: 'Client Management',
    icon: 'hugeicons:user-group',
    children: [{ label: 'Groups' }, { label: 'Entities' }, { label: 'Individuals' }],
  },
  {
    label: 'Asset Care',
    icon: 'hugeicons:wrench-01',
    children: [{ label: 'Maintenances' }, { label: 'Workshops' }, { label: 'Warehouses' }],
  },
  {
    label: 'Places',
    icon: 'hugeicons:location-03',
    children: [{ label: 'Saved Places' }, { label: 'Geo Fence' }],
  },
  {
    label: 'Suppliers Management',
    icon: 'hugeicons:shield-user',
  },
  {
    label: 'Hardware Management',
    icon: 'hugeicons:chip',
  },
  {
    label: 'Legals',
    icon: 'hugeicons:auction',
  },
  {
    label: 'Fines',
    icon: 'hugeicons:dollar-send-01',
  },
  {
    label: 'Reports',
    icon: 'hugeicons:chart-bar-line',
    children: [
      { label: 'Utilization Reports' },
      { label: 'Event Reports' },
      { label: 'Fuel Reports' },
      { label: 'Idling Reports' },
      { label: 'CO₂ Reports' },
    ],
  },
  {
    label: 'Rentals Management',
    icon: 'hugeicons:car-01',
  },
  {
    label: 'Notifications',
    icon: 'hugeicons:notification-01',
  },
  {
    label: 'WioT Support',
    icon: 'hugeicons:customer-support',
  },
  {
    label: 'Settings',
    icon: 'hugeicons:settings-01',
  },
  {
    label: 'Logout',
    icon: 'hugeicons:logout-01',
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('john.doe@email.com');
    $q.notify({
      message: 'Email copied to clipboard',
      color: 'positive',
      icon: 'check',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('Failed to copy email:', error);
    $q.notify({
      message: 'Failed to copy email',
      color: 'negative',
      icon: 'error',
      position: 'top',
      timeout: 2000,
    });
  }
};
</script>

<style scoped>
.q-drawer--mini .q-input {
  display: none;
}

.q-toolbar {
  min-height: 36px;
}

.animated-menu .q-menu {
  transform-origin: top right;
  animation: menuIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animated-menu .q-item {
  opacity: 0;
  animation: itemIn 0.3s ease-out forwards;
}

.animated-menu .q-item:nth-child(1) {
  animation-delay: 0.05s;
}

.animated-menu .q-item:nth-child(2) {
  animation-delay: 0.1s;
}

.animated-menu .q-item:nth-child(3) {
  animation-delay: 0.15s;
}

.animated-menu .q-item:nth-child(4) {
  animation-delay: 0.2s;
}

.animated-menu .q-item:nth-child(5) {
  animation-delay: 0.25s;
}

.animated-menu .q-item:nth-child(6) {
  animation-delay: 0.3s;
}

.animated-menu .q-item:nth-child(7) {
  animation-delay: 0.35s;
}

.animated-menu .q-item:nth-child(8) {
  animation-delay: 0.4s;
}

@keyframes menuIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes itemIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
