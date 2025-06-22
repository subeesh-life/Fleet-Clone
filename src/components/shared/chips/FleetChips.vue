<script setup lang="ts">
import { computed } from 'vue';
import { colors } from 'quasar';

const props = defineProps({
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
});

const colorAliases: Record<string, string> = {
  success: 'positive',
  error: 'negative',
  danger: 'negative',
  info: 'info',
};

const quasarColor = computed(() => {
  return colorAliases[props.color] || props.color;
});

const lightenColor = (color: string, amount: number = 0.9) => {
  return colors.lighten(color, amount);
};

// Compute styles dynamically based on Quasar colors
const badgeStyle = computed(() => {
  try {
    // Get the base color
    const baseColor =
      colors.getPaletteColor(quasarColor.value) || colors.getPaletteColor(quasarColor.value);

    if (baseColor) {
      const bgColor = lightenColor(baseColor, 92);
      const borderColor = lightenColor(baseColor, 70);
      const textColor = baseColor;

      return {
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        borderRadius: '4px',
      };
    }
  } catch (e) {
    console.error(e);
  }

  const fallbackStyles: Record<string, any> = {
    purple: {
      backgroundColor: '#f9f5ff',
      border: '1px solid #e9d7fe',
      color: '#6941c6',
      borderRadius: '4px',
    },
    positive: {
      backgroundColor: '#ecfdf3',
      border: '1px solid #abefc6',
      color: '#067647',
      borderRadius: '4px',
    },
    warning: {
      backgroundColor: '#fffaeb',
      border: '1px solid #fedf89',
      color: '#b54708',
      borderRadius: '4px',
    },
    negative: {
      backgroundColor: '#fef3f2',
      border: '1px solid #fecdca',
      color: '#b42318',
      borderRadius: '4px',
    },
    grey: {
      backgroundColor: '#f9fafb',
      border: '1px solid #eaecf0',
      color: '#344054',
      borderRadius: '4px',
    },
    primary: {
      backgroundColor: colors.lighten(colors.getPaletteColor('primary') || '#1976d2', 90),
      border: `1px solid ${colors.lighten(colors.getPaletteColor('primary') || '#1976d2', 70)}`,
      color: colors.getPaletteColor('primary') || '#1976d2',
      borderRadius: '4px',
    },
    secondary: {
      backgroundColor: colors.lighten(colors.getPaletteColor('secondary') || '#26a69a', 90),
      border: `1px solid ${colors.lighten(colors.getPaletteColor('secondary') || '#26a69a', 70)}`,
      color: colors.getPaletteColor('secondary') || '#26a69a',
      borderRadius: '4px',
    },
  };

  return fallbackStyles[quasarColor.value] || fallbackStyles.grey;
});
</script>

<template>
  <div :style="badgeStyle">
    <div class="flex items-center justify-center q-px-sm">
      <div v-if="iconVisibility" class="flex items-center">
        <IconifyIcon :icon="iconName" :width="iconSize" :height="iconSize" class="q-mr-xs" />
      </div>
      <div>
        <span class="badge-text">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge-text {
  font-size: 13px;
  line-height: 1.5;
}
</style>
