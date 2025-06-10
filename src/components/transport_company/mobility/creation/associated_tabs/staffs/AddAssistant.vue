<script setup lang="ts">
import { ref } from 'vue'

const assistantDrawer = ref(false)
const searchAssistants = ref('')
const maximizedToggle = ref(false)
const selectedAssistants = ref([])
</script>
<template>
    <q-card-section class="q-mt-md q-pa-none">
        <div class="row items-center">
            <div class="col-6">
                <div class="text-subtitle2 text-grey-9">Add Assistant</div>
            </div>
            <div class="col-6 flex justify-end">
                <div class="flex items-center">
                    <q-btn flat dense padding="xs" class="q-ml-xs" @click="assistantDrawer = true">
                        <q-tooltip>Select Assistant</q-tooltip>
                        <iconify-icon icon="hugeicons:add-circle-half-dot" width="24px" height="24px"
                            class="text-secondary" />
                    </q-btn>
                </div>
            </div>
        </div>
    </q-card-section>

    <q-dialog persistent v-model="assistantDrawer" :maximized="maximizedToggle" transition-show="slide-up"
        transition-hide="slide-down">
        <q-card class="window-height window-width" col-md-12 col-xs-12>
            <q-card-section class="q-pb-none">
                <div class="row items-start justify-between">
                    <div>
                        <div class="flex items-center">
                            <div class="text-h6 text-weight-bold q-mr-sm">Add Assistant</div>
                            <FleetChips text="For All Stops" color="success" :iconVisibility="false" />
                        </div>
                        <div class="text-caption text-grey-7">
                            Select the assistant you wish to add to this event.
                        </div>
                    </div>
                    <div class="row items-center q-gutter-x-md">
                        <q-btn color="primary" label="Apply" />
                        <q-btn flat round dense icon="close" @click="assistantDrawer = false" class="text-grey-7">
                            <q-tooltip>Close</q-tooltip>
                        </q-btn>
                    </div>
                </div>
                <q-separator class="q-my-md" />
            </q-card-section>
            <q-card-section class="q-pt-none">
                <div class="row q-py-sm">
                    <div class="col-md-12 col-sm-12 bg-grey-1">
                        <q-card-section>
                            <q-table flat outline bordered :rows="[
                                {
                                    assistantDetails: {
                                        firstName: 'Sara',
                                        lastName: 'Ali',
                                        id: '#5E23B7',
                                        phone: '+971 50 234 5678',
                                        email: 'sara.ali@example.com',
                                        image: 'https://i.pravatar.cc/150?img=47',
                                    },
                                    assistantPositionLevel: {
                                        position: 'Senior',
                                        level: 'Level 3',
                                    },
                                    status: 'Available',
                                },
                                {
                                    assistantDetails: {
                                        firstName: 'Mohammed',
                                        lastName: 'Rashid',
                                        id: '#8H56D2',
                                        phone: '+971 50 345 6789',
                                        email: 'mohammed.rashid@example.com',
                                        image: 'https://i.pravatar.cc/150?img=33',
                                    },
                                    assistantPositionLevel: {
                                        position: 'Junior',
                                        level: 'Level 1',
                                    },
                                    status: 'On Event',
                                },
                                {
                                    assistantDetails: {
                                        firstName: 'Priya',
                                        lastName: 'Menon',
                                        id: '#2K78F8',
                                        phone: '+971 50 456 7890',
                                        email: 'priya.menon@example.com',
                                        image: 'https://i.pravatar.cc/150?img=21',
                                    },
                                    assistantPositionLevel: {
                                        position: 'Senior',
                                        level: 'Level 2',
                                    },
                                    status: 'Available',
                                },
                                {
                                    assistantDetails: {
                                        firstName: 'Alex',
                                        lastName: 'Mathew',
                                        id: '#9J34C5',
                                        phone: '+971 50 567 8901',
                                        email: 'alex.mathew@example.com',
                                        image: 'https://i.pravatar.cc/150?img=41',
                                    },
                                    assistantPositionLevel: {
                                        position: 'Junior',
                                        level: 'Level 1',
                                    },
                                    status: 'On Event',
                                }

                            ]" :columns="[
                                {
                                    name: 'select',
                                    label: '',
                                    field: 'select',
                                    align: 'left',
                                    headerClasses: 'bg-grey-2',
                                },
                                {
                                    name: 'assistantDetails',
                                    label: 'Details',
                                    field: 'assistantDetails',
                                    sortable: true,
                                    align: 'left',
                                    headerClasses: 'bg-grey-2',
                                },
                                {
                                    name: 'assistantPositionLevel',
                                    label: 'Position & Level',
                                    field: 'assistantPositionLevel',
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
                            ]" row-key="client" :pagination="{ rowsPerPage: 7 }" :rows-per-page-options="[5, 7, 10]">
                                <template v-slot:top>
                                    <div class="row items-center full-width">
                                        <div class="col-12">
                                            <q-input v-model="searchAssistants" dense outlined
                                                placeholder="Search by assistant name, ID, or phone number"
                                                class="full-width">
                                                <template v-slot:prepend>
                                                    <IconifyIcon icon="hugeicons:search-02" width="24px" height="24px"
                                                        class="text-grey-8" />
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <q-separator class="q-my-md" />
                                </template>

                                <template v-slot:body-cell-select="props">
                                    <q-td>
                                        <q-radio v-model="selectedAssistants" :val="props.row.assistantDetails.id" dense
                                            class="no-outline" />
                                    </q-td>
                                </template>

                                <template v-slot:body-cell-assistantDetails="props">
                                    <q-td>
                                        <div class="row items-center">
                                            <q-avatar size="40px" color="primary" text-color="white">
                                                <img :src="props.row.assistantDetails.image" />
                                            </q-avatar>
                                            <div class="column">
                                                <div class="text-body2 text-weight-medium q-pl-sm">
                                                    {{ props.row.assistantDetails.firstName }}
                                                    {{ props.row.assistantDetails.lastName }}
                                                </div>
                                                <div class="row items-center q-pl-sm">
                                                    <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                                                        {{ props.row.assistantDetails.id }}
                                                    </q-chip>
                                                    <q-chip dense rounded
                                                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                                                        class="q-mr-sm bg-white">
                                                        <IconifyIcon icon="hugeicons:call" width="16px" height="16px"
                                                            class="text-grey-8" />
                                                        <q-tooltip>{{ props.row.assistantDetails.phone }}</q-tooltip>
                                                    </q-chip>
                                                    <q-chip dense rounded
                                                        style="height: 24px; width: 24px; border: 1px solid #0000001f"
                                                        class="q-mr-sm bg-white">
                                                        <IconifyIcon icon="hugeicons:mail-01" width="16px" height="16px"
                                                            class="text-grey-8" />
                                                        <q-tooltip>{{ props.row.assistantDetails.email }}</q-tooltip>
                                                    </q-chip>
                                                </div>
                                            </div>
                                        </div>
                                    </q-td>
                                </template>


                                <template v-slot:body-cell-assistantPositionLevel="props">
                                    <q-td>
                                        <div class="row items-center">
                                            <div>
                                                {{ props.row.assistantPositionLevel.position }}
                                                <q-chip class="bg-blue-1 text-blue text-caption" dense square>
                                                    {{ props.row.assistantPositionLevel.level }}
                                                </q-chip>
                                            </div>
                                        </div>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-status="props">
                                    <q-td>
                                        <div class="text-body2 text-weight-medium q-pl-sm"
                                            :class="{ 'text-positive': props.row.status === 'Available', 'text-negative': props.row.status === 'On Event' }">
                                            {{ props.row.status }}
                                        </div>
                                    </q-td>
                                </template>
                            </q-table>
                        </q-card-section>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
@media (min-width: 600px) {
    .q-dialog__inner--minimized>div {
        max-width: none;
    }
}
</style>