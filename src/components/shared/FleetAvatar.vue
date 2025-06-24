<template>
  <q-avatar :class="getClasses" :size="size">
    <img
      v-if="img && !imageError"
      :src="processedImage"
      draggable="false"
      @error="handleImageError"
      style="width: 100%; height: 100%; object-fit: cover"
    />
    <span v-else style="color: inherit">{{ text }}</span>
  </q-avatar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  size?: string;
  title?: string;
  img?: string;
  border?: boolean;
  shadow?: boolean;
  bg?: boolean;
  color?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: '40px',
  title: '',
  img: '',
  border: false,
  shadow: false,
  bg: true,
  color: 'grey-3',
  textColor: 'grey-7',
});

const imageError = ref(false);

const text = computed(() => {
  const name = (props.title || '').trim();
  if (!name) return '';

  const words = name.split(' ').filter(word => word.length > 0);
  if (words.length === 1) {
    return words?.[0]?.charAt(0).toUpperCase();
  } else if (words.length >= 2) {
    const firstChar = words[0] ? words[0].charAt(0) : '';
    const secondChar = words[1] ? words[1].charAt(0) : '';
    return (firstChar + secondChar).toUpperCase();
  }
  return '';
});

const processedImage = computed(() => {
  if (!props.img) return '';
  // You can add any image URL processing here if needed
  return props.img;
});

const getClasses = computed(() => {
  const classes = [
    'app-avatar',
    props.border ? 'has-border' : '',
    props.shadow ? 'shadow-5' : '',
    props.bg ? `bg-${props.color} text-${props.textColor}` : '',
  ];
  return classes.filter(Boolean).join(' ');
});

const handleImageError = () => {
  imageError.value = true;
};

// Reset image error when img prop changes
import { watch } from 'vue';
watch(
  () => props.img,
  () => {
    imageError.value = false;
  }
);
</script>

<style lang="scss" scoped>
.app-avatar {
  border-radius: 50%;

  &.has-border {
    border: 1px solid #ffffff;
  }
}
</style>
