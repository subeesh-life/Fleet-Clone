<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const modelValue = defineModel<boolean>('modelValue', { required: true });

const props = withDefaults(defineProps<{
    title?: string;
    message?: string;
    type?: 'success' | 'warning' | 'error';
    confirmText?: string;
    cancelText?: string;
}>(), {
    title: 'Confirmation',
    message: 'Are you sure you want to proceed?',
    type: 'warning',
    confirmText: 'Deactivate',
    cancelText: 'Cancel'
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const closeModal = () => {
    emit('update:modelValue', false);
    emit('cancel');
};

const handleConfirm = () => {
    modelValue.value = false;
    emit('confirm');
};

const getIconByType = () => {
    switch (props.type) {
        case 'success':
            return 'hugeicons:tick-01';
        case 'error':
            return 'hugeicons:alert-diamond';
        case 'warning':
        default:
            return 'hugeicons:alert-02';
    }
};

const getColorByType = () => {
    switch (props.type) {
        case 'success':
            return 'var(--fleet-color-success-600)';
        case 'error':
            return 'var(--fleet-color-error-600)';
        case 'warning':
        default:
            return 'var(--fleet-color-warning-600)';
    }
};

const getBackgroundColorByType = () => {
    switch (props.type) {
        case 'success':
            return 'var(--fleet-color-success-50)';
        case 'error':
            return 'var(--fleet-color-error-50)';
        case 'warning':
        default:
            return 'var(--fleet-color-warning-50)';
    }
};

const getButtonColorByType = () => {
    switch (props.type) {
        case 'success':
            return 'var(--fleet-color-success-600)';
        case 'error':
            return 'var(--fleet-color-error-600)';
        case 'warning':
        default:
            return 'var(--fleet-color-warning-600)';
    }
};
</script>

<template>
    <q-dialog v-model="modelValue" persistent backdrop-filter="blur(2px)">
        <q-card class="confirmation-modal" style="min-width: 400px">
            <q-card-section class="row items-center q-pb-none">
                <div class="row items-center justify-center"
                    :style="{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: getBackgroundColorByType() }">
                    <IconifyIcon :icon="getIconByType()" :color="getColorByType()" width="24px" height="24px" />
                </div>
            </q-card-section>
            <q-card-section class="row items-center q-pb-none">
                <div class="row items-center full-width">
                    <div class="text-h6">{{ title }}</div>
                </div>
            </q-card-section>

            <q-card-section class="q-pt-sm">
                <p class="text-body2 text-grey-7">{{ message }}</p>
            </q-card-section>

            <q-card-actions align="right" class="q-pa-md">
                <q-btn :label="cancelText" color="grey-6" flat v-close-popup @click="closeModal" />
                <q-btn :label="confirmText" :style="{
                    backgroundColor: getButtonColorByType(),
                    color: 'white'
                }" @click="handleConfirm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.confirmation-modal {
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>ch