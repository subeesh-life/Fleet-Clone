<script setup lang="ts">
import { ref } from 'vue'
import DateRange from 'src/components/shared/date_range/DateRange.vue'
import TimeRange from 'src/components/shared/time_range/TimeRange.vue'
import FleetChips from 'src/components/shared/chips/FleetChips.vue'

const eventStatus = ref('all')
const selectedEvents = ref<number[]>([])
const selectAll = ref(false)

const rows = [
    {
        eventDetails: {
            id: 1,
            eventDate: {
                date: '2025-06-10',
                displayDate: 'Today Tue - Jun 10, 2025',
                events: [{
                    schedule: {
                        startSchedule: '7:30 AM',
                        endSchedule: '8:15 AM',
                        startActual: '7:45 AM',
                        endActual: '8:30 AM',
                    },
                    eventStatus: 'Upcoming',
                    activity: 'Gas Delivery',
                    route: 'Yas Island - Zone 1 - C67-04 - Saadiyat Island - District 2 - D8',
                    assetsStatus: 'Available',
                    client: 'B',
                    status: 'Ready',
                }]
            }
        }
    }
]

const handleSelectAll = (val: boolean) => {
    selectAll.value = val
    if (val) {
        selectedEvents.value = rows.map(row => row.eventDetails.id)
    } else {
        selectedEvents.value = []
    }
}
</script>
<template>
    <q-page class="q-pa-md bg-grey-1" style="border-top: 1px solid #e0e0e0">
        <div class="row flex justify-between items-center q-mb-md">
            <div class="col-md-4">
                <q-breadcrumbs>
                    <template v-slot:separator>
                        <q-icon size="1.5em" name="chevron_right" color="primary" />
                    </template>
                    <q-breadcrumbs-el label="Home" :to="{ name: 'executive-dashboard' }" />
                    <q-breadcrumbs-el label="Mobility" />
                    <q-breadcrumbs-el label="Dispatch" />
                </q-breadcrumbs>
            </div>

            <div class="col-md-8 flex justify-end q-gutter-x-md">
                <DateRange class="gt-sm" />
                <TimeRange class="gt-sm" />

                <div class="row q-gutter-x-sm">
                    <q-btn push color="white" text-color="grey-9" round class="gt-sm">
                        <q-icon>
                            <IconifyIcon icon="hugeicons:search-02" width="16px" height="16px" />
                        </q-icon>
                        <q-tooltip>
                            <div class="text-caption">Search Events</div>
                        </q-tooltip>
                    </q-btn>
                    <q-btn push color="white" text-color="grey-9" round>
                        <q-icon>
                            <IconifyIcon icon="hugeicons:filter" width="16px" height="16px" />
                        </q-icon>
                        <q-tooltip>
                            <div class="text-caption">Filter</div>
                        </q-tooltip>
                    </q-btn>
                    <q-btn push color="white" text-color="grey-9" round class="gt-sm">
                        <q-icon>
                            <IconifyIcon icon="hugeicons:chart-bar-line" width="16px" height="16px" />
                        </q-icon>
                        <q-tooltip>
                            <div class="text-caption">Statistics</div>
                        </q-tooltip>
                    </q-btn>
                    <q-btn push color="white" text-color="grey-9" round :to="{ name: 'create-event' }">
                        <q-icon>
                            <IconifyIcon icon="hugeicons:add-01" width="16px" height="16px" />
                        </q-icon>
                        <q-tooltip>
                            <div class="text-caption">Add New</div>
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </div>

        <!--Tabs & Table Data-->

        <div class="row">
            <div class="col-12 bg-white rounded-borders q-pa-md">
                <q-tabs v-model="eventStatus" dense class="text-grey" active-color="primary" indicator-color="primary"
                    align="justify" narrow-indicator style="border-bottom: 1px solid #e0e0e0">
                    <q-tab name="all" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                All
                                <FleetChips text="32" color="success" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="upcoming" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Upcoming
                                <FleetChips text="219" color="purple" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="missed" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Missed
                                <FleetChips text="17" color="error" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="live" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Live
                                <FleetChips text="173" color="success" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="delayed" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Delayed
                                <FleetChips text="35" color="warning" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="completed" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Completed
                                <FleetChips text="651" color="grey" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>

                    <q-tab name="canceled" class="flex">
                        <template v-slot:default>
                            <div class="row items-center">
                                Canceled
                                <FleetChips text="19" color="error" :iconVisibility="false" class="q-ml-sm" />
                            </div>
                        </template>
                    </q-tab>
                </q-tabs>
            </div>

            <div class="col-12">
                <q-tab-panels v-model="eventStatus" animated>
                    <q-tab-panel name="all">

                        <q-table flat outline bordered :rows="rows" :columns="[
                            {
                                name: 'select',
                                label: '',
                                field: 'select',
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'scheduleActual',
                                label: 'Schedule / Actual',
                                field: 'scheduleActual',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'eventStatus',
                                label: 'Event Status',
                                field: 'eventStatus',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'activity',
                                label: 'Activity',
                                field: 'activity',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'route',
                                label: 'Route',
                                field: 'route',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'assetsStatus',
                                label: 'Assets Status',
                                field: 'assetsStatus',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'clients',
                                label: 'Client',
                                field: 'client',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },

                            {
                                name: 'status',
                                label: 'Status',
                                field: 'status',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                            {
                                name: 'actions',
                                label: 'Actions',
                                field: 'actions',
                                sortable: true,
                                align: 'left',
                                headerClasses: 'bg-grey-2',
                            },
                        ]" row-key="client" :pagination="{ rowsPerPage: 7 }" :rows-per-page-options="[5, 7, 10]">

                            <template v-slot:header-cell-select>
                                <q-th class="text-left bg-grey-2">
                                    <q-checkbox v-model="selectAll" @update:model-value="handleSelectAll" dense
                                        class="no-outline" />
                                </q-th>
                            </template>

                            <template v-slot:body-cell-select="props">
                                <q-td>
                                    <q-checkbox v-model="selectedEvents" :val="props.row.eventDetails.id" dense
                                        class="no-outline" />
                                </q-td>
                            </template>

                        </q-table>

                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </q-page>
</template>
<style scoped></style>