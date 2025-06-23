<script setup lang="ts">
// Remove the local ref and define prop instead
defineProps<{
  showAllCards: boolean;
}>();
</script>

<template>
  <div class="kpi-cards row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="col">
              <div class="text-caption text-grey-9">All vehicles</div>
              <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-blue-500)">
                1247
              </div>
            </div>
            <div class="col flex justify-end">
              <q-avatar
                style="
                  background-color: var(--fleet-color-blue-50);
                  color: var(--fleet-color-blue-500);
                  border: 1px solid var(--fleet-color-blue-200);
                "
              >
                <IconifyIcon icon="hugeicons:bus-03" width="24px" height="24px" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="col">
              <div class="text-caption text-grey-9">Moving Vehicles</div>
              <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-success-500)">
                759
              </div>
            </div>
            <div class="col flex justify-end">
              <q-avatar
                style="
                  background-color: var(--fleet-color-success-25);
                  color: var(--fleet-color-success-500);
                  border: 1px solid var(--fleet-color-success-200);
                "
              >
                <IconifyIcon icon="hugeicons:truck-delivery" width="24px" height="24px" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="col">
              <div class="text-caption text-grey-9">Idling Vehicles</div>
              <div
                class="text-h6 text-weight-bold"
                style="color: var(--fleet-color-gray-light-500)"
              >
                63
              </div>
            </div>
            <div class="col flex justify-end">
              <q-avatar
                style="
                  background-color: var(--fleet-color-gray-light-25);
                  color: var(--fleet-color-gray-light-500);
                  border: 1px solid var(--fleet-color-gray-light-200);
                "
              >
                <IconifyIcon icon="hugeicons:container-truck" width="24px" height="24px" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="col-8">
              <div class="text-caption text-grey-9">2+ Hrs disconnected vehicle</div>
              <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-warning-500)">
                31
              </div>
            </div>
            <div class="col-4 flex justify-end">
              <q-avatar
                style="
                  background-color: var(--fleet-color-warning-25);
                  color: var(--fleet-color-warning-500);
                  border: 1px solid var(--fleet-color-warning-200);
                "
              >
                <IconifyIcon icon="hugeicons:connect" width="24px" height="24px" />
              </q-avatar>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Additional cards that show/hide -->
    <template v-if="showAllCards">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col-10">
                <div class="text-caption text-grey-9">24+ Hrs disconnected vehicle</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-warning-500)">
                  7
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-warning-25);
                    color: var(--fleet-color-warning-500);
                    border: 1px solid var(--fleet-color-warning-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:connect" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col-10">
                <div class="text-caption text-grey-9">Driving with valid permit</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-success-500)">
                  423
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-success-25);
                    color: var(--fleet-color-success-500);
                    border: 1px solid var(--fleet-color-success-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:file-validation" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col">
                <div class="text-caption text-grey-9">Driving without valid permit</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-warning-500)">
                  37
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-warning-25);
                    color: var(--fleet-color-warning-500);
                    border: 1px solid var(--fleet-color-warning-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:file-remove" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col-10">
                <div class="text-caption text-grey-9">Driving with rejected permit</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-error-500)">
                  5
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-error-25);
                    color: var(--fleet-color-error-500);
                    border: 1px solid var(--fleet-color-error-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:file-block" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col-10">
                <div class="text-caption text-grey-9">Driving with in process permit</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-purple-500)">
                  11
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-purple-25);
                    color: var(--fleet-color-purple-500);
                    border: 1px solid var(--fleet-color-purple-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:file-sync" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card bordered flat class="bg-white">
          <q-card-section class="q-gutter-y-xs">
            <div class="row items-center">
              <div class="col-10">
                <div class="text-caption text-grey-9">Vehicle with expired document</div>
                <div class="text-h6 text-weight-bold" style="color: var(--fleet-color-error-500)">
                  3
                </div>
              </div>
              <div class="col-2 flex justify-end">
                <q-avatar
                  style="
                    background-color: var(--fleet-color-error-25);
                    color: var(--fleet-color-error-500);
                    border: 1px solid var(--fleet-color-error-200);
                  "
                >
                  <IconifyIcon icon="hugeicons:file-corrupt" width="24px" height="24px" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>
</template>
