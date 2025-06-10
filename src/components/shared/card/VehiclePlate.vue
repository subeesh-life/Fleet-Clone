<template>
    <div class="row items-center justify-center"
        style="width: 80px; height: auto; border-radius: 8px; border: 1px solid #0000001F;">
        <div class="row justify-between full-width q-px-sm text-white" :style="{ backgroundColor: plateColor }" style="border-top-left-radius: 8px;
  border-top-right-radius: 8px;">
            <div class="seriesCode text-caption">{{ seriesCode }}</div>
            <div class="seriesNumber text-caption">{{ seriesNumber }}</div>
        </div>
        <div class="row items-center justify-center q-py-xs">
            <div class="uniqueNumber text-body2 text-weight-medium">{{ uniqueNumber }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    plateColor: {
        type: String,
        default: '#21BA45' // Default Quasar positive color
    },
    seriesCode: {
        type: String,
        default: 'AD'
    },
    seriesNumber: {
        type: String,
        default: '10'
    },
    uniqueNumber: {
        type: String,
        default: '49695'
    }
})
</script>

<style scoped></style>