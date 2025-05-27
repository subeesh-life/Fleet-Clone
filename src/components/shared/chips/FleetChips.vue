<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
    default: 'Default Text',
  },
  color: {
    type: String,
    required: false,
    default: 'purple',
  },
  iconName: {
    type: String,
    required: false,
    default: 'arrow_forward',
  },
  iconSize: {
    type: String,
    required: false,
    default: '16px',
  },
  iconVisibility: {
    type: Boolean,
    required: false,
    default: true,
  },
})
</script>

<template>
  <div :class="['badge', color]">
    <div class="row flex items-center justify-center q-px-sm">
      <div>
        <div v-if="iconVisibility" class="flex items-start">
          <IconifyIcon :icon="iconName" width="16px" height="16px" class="q-mr-xs" />
        </div>
      </div>
      <div>
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  border-radius: 4px;
  cursor: pointer;
}
.purple {
  background-color: #f9f5ff;
  border: 1px solid #e9d7fe;
  color: #6941c6;
}
.success {
  background-color: #ecfdf3;
  border: 1px solid #abefc6;
  color: #067647;
}
.warning {
  background-color: #fffaeb;
  border: 1px solid #fedf89;
  color: #b54708;
}
.error {
  background-color: #fef3f2;
  border: 1px solid #fecdca;
  color: #b42318;
}
.grey {
  background-color: #f9fafb;
  border: 1px solid #eaecf0;
  color: #344054;
}
.text {
  font-size: 12px;
}
</style>
