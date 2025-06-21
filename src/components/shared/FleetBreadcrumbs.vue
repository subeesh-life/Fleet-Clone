<template>
  <q-breadcrumbs active-color="secondary">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>
    <q-breadcrumbs-el
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :to="item.to"
      :color="item.color"
    />
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array as () => Array<{
      label: string;
      to?: string | { name: string; params?: Record<string, any> };
      color?: string;
    }>,
    required: true,
  },
});
</script>
