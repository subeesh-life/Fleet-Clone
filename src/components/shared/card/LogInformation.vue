<script setup lang="ts">

</script>
<template>
  <q-card flat bordered class="q-pa-xs full-width">
    <q-card-section class="q-pa-xs q-gutter-xs">
      <div class="text-body1 text-weight-medium">Log Information</div>
      <div class="row">
        <div class="col-12 q-mt-sm">
          <div class="text-body2 text-grey-7">Last updated by</div>
        </div>
        <div class="col-6 q-mt-xs  flex items-center">
          <q-avatar size="40px" color="primary" text-color="white">
            <img src="https://i.pravatar.cc/150?img=59" />
          </q-avatar>
          <div class="column">
            <div class="text-body2 text-weight-medium q-pl-sm">
              John Doe
            </div>
            <div class="row items-center q-pl-sm text-grey-7 text-caption">
              Jun 16, 2025 10:00 AM
            </div>
          </div>
        </div>
        <div class="col-6 flex justify-end items-center">
          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f" class="q-mr-sm bg-white">
            <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
            <q-tooltip>+971 50 123 4567</q-tooltip>
          </q-chip>
          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f" class="q-mr-sm bg-white">
            <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px" class="text-grey-8" />
            <q-tooltip>john.doe@example.com</q-tooltip>
          </q-chip>

        </div>
      </div>

      <div class="row ">
        <div class="col-12 q-mt-sm">
          <div class="text-body2 text-grey-7">Created by</div>
        </div>
        <div class="col-6 q-mt-xs  flex items-center">
          <q-avatar size="40px" color="primary" text-color="white">
            <img src="https://i.pravatar.cc/150?img=59" />
          </q-avatar>
          <div class="column">
            <div class="text-body2 text-weight-medium q-pl-sm">
              John Doe
            </div>

            <div class="row items-center q-pl-sm text-grey-7 text-caption">
              Jun 16, 2025 9:00 AM
            </div>

          </div>
        </div>
        <div class="col-6 flex justify-end items-center">
          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f" class="q-mr-sm bg-white">
            <IconifyIcon icon="hugeicons:call" width="16px" height="16px" class="text-grey-8" />
            <q-tooltip>+971 50 123 4567</q-tooltip>
          </q-chip>
          <q-chip dense rounded style="height: 24px; width: 24px; border: 1px solid #0000001f" class="q-mr-sm bg-white">
            <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px" class="text-grey-8" />
            <q-tooltip>john.doe@example.com</q-tooltip>
          </q-chip>

        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style scoped lang="scss"></style>