<script setup lang="ts"></script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon
                  icon="hugeicons:arrow-data-transfer-horizontal"
                  width="20px"
                  height="20px"
                />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Distance</div>
              <div class="text-h6 text-weight-bold">29.3 KM</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:time-03" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Duration</div>
              <div class="text-h6 text-weight-bold">45 mins</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:fast-wind" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Idling Time & Cost</div>
              <div class="text-h6 text-weight-bold">
                2 mins <span class="text-grey-7">•</span> AED 0.45
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:fuel-station" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Fuel Consumption</div>
              <div class="text-h6 text-weight-bold">2.7 L - AED 6.75</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:invoice-02" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Trip Expense</div>
              <div class="text-h6 text-weight-bold">AED 14.50</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:dollar-01" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Trip Cost</div>
              <div class="text-h6 text-weight-bold">AED 77.10</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:dashboard-speed-02" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Max Speed</div>
              <div class="text-h6 text-weight-bold">89 km/h</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:notification-01" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Trip Notifications</div>
              <div class="text-h6 text-weight-bold">3</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:stop" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Total Stops</div>
              <div class="text-h6 text-weight-bold">7</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-card bordered flat class="bg-white">
        <q-card-section class="q-gutter-y-xs">
          <div class="row items-center">
            <div class="q-mr-md">
              <q-avatar size="40px" color="grey-2" text-color="grey-7">
                <IconifyIcon icon="hugeicons:user-group-03" width="20px" height="20px" />
              </q-avatar>
            </div>
            <div>
              <div class="text-caption text-grey-9">Total Passengers</div>
              <div class="text-h6 text-weight-bold">29</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
