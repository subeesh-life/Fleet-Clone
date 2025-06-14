<script setup lang="ts">

</script>
<template>
    <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
        <div class="row flex justify-between items-center q-mb-md">
            <div class="col-md-4 flex items-center" style="min-height: 42px;">
                <q-breadcrumbs active-color="secondary">
                    <template v-slot:separator>
                        <q-icon size="1.5em" name="chevron_right" color="primary" />
                    </template>
                    <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
                    <q-breadcrumbs-el label="Mobility" :to="{ name: 'mobility-link' }" />
                    <q-breadcrumbs-el label="Dispatch" :to="{ name: 'dispatch-link' }" />
                </q-breadcrumbs>
            </div>
        </div>

        <div class="row">
            <div class="full-width bg-white rounded-borders q-pa-md">
                <div class="row q-col-gutter-x-md q-gutter-y-md">
                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/dispatch.svg" alt="Dispatch"
                                            class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Dispatch</div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            Plan routes, Assign vehicles and drivers, and track events — all in one
                                            place
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>

                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/draft.svg" alt="Dispatch"
                                            class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Draft Events</div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            Find and edit events saved as drafts.
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>

                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/delete.svg" alt="Dispatch"
                                            class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Deleted Events</div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            Browse all events that have been removed from the schedule.
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>

                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/conflict.svg" alt="Dispatch"
                                            class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Conflicted Events</div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            Review events with scheduling conflicts.
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>

                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/driver.svg" alt="Dispatch"
                                            class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Driver Absent</div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            See the list of drivers marked as absent.
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>

                    <router-link :to="{ name: 'dispatch' }" class="col-md-6 col-xs-12" style="text-decoration: none;">
                        <q-card flat bordered class="cursor-pointer card-gradient">
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <q-avatar rounded size="32px" color="white" text-color="white" class="q-mr-md">
                                        <q-img src="/src/assets/bredcrumbs-links/dispatch/pending-event.svg"
                                            alt="Dispatch" class="full-width full-height" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-h6 text-weight-medium text-primary">Pending Events Approval
                                        </div>
                                        <div class="text-caption text-grey-9  ellipsis" style="max-height: 32px;">
                                            Browse all events that are pending approval.
                                        </div>
                                    </div>
                                    <div class="q-ml-sm">
                                        <IconifyIcon icon="hugeicons:arrow-right-01" width="24px" height="24px"
                                            color="primary" />
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </router-link>
                </div>
            </div>
        </div>
    </q-page>
</template>



<style lang="scss" scoped>
.card-gradient {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
    transition: all 0.3s ease;

    &::before,
    &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(45deg, rgba(var(--q-primary), 0.05), rgba(var(--q-primary), 0.02));
        z-index: 0;
    }

    &::before {
        width: 150px;
        height: 150px;
        right: -75px;
        top: -75px;
    }

    &::after {
        width: 100px;
        height: 100px;
        left: -50px;
        bottom: -50px;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);

        &::before,
        &::after {
            transform: scale(1.1);
        }
    }

    .q-card-section {
        position: relative;
        z-index: 1;
    }
}
</style>