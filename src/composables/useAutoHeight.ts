import type { Ref, ComponentPublicInstance } from 'vue';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

interface UseAutoHeightOptions {
  targetRef: Ref; // ID of the element to adjust
  subtractRefs?: Ref | Ref[]; // IDs of elements to subtract their heights
  minHeight?: number; // Minimum height allowed
  bottomOffset?: number; // Additional pixels to subtract
  topOffset?: number; // Additional pixels to subtract from top
  debounceMs?: number; // Debounce resize calculations
}

export function useAutoHeight({
  targetRef,
  subtractRefs = [],
  minHeight = 200,
  bottomOffset = 50,
  topOffset = 0,
  debounceMs = 100,
}: UseAutoHeightOptions) {
  const height = ref<number>(0);
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  const calculateHeight = async () => {
    await nextTick();

    const getElement = (ref: Ref<HTMLElement | ComponentPublicInstance>): HTMLElement | null => {
      if (!ref.value) return null;

      // If it's a component instance, try to get its root element
      if ('$el' in ref.value) {
        return ref.value.$el;
      }

      // If it's an HTML element, return it directly
      return ref.value;
    };

    const target = getElement(targetRef);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();

    // Normalize subtractRefs to always be an array
    const elementsToSubtract = Array.isArray(subtractRefs)
      ? subtractRefs
      : subtractRefs
        ? [subtractRefs]
        : [];

    const subtractHeight = elementsToSubtract.reduce((total, elementRef) => {
      const element = getElement(elementRef);
      if (element) {
        return total + element.getBoundingClientRect().height;
      }
      return total;
    }, 0);

    const availableHeight =
      window.innerHeight - targetRect.y - subtractHeight - bottomOffset - topOffset;

    height.value = Math.max(availableHeight, minHeight);
  };

  const updateHeight = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      void calculateHeight();
    }, debounceMs);
  };

  onMounted(() => {
    void calculateHeight();
    window.addEventListener('resize', updateHeight);
  });

  onUnmounted(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    window.removeEventListener('resize', updateHeight);
  });

  return {
    height,
    calculateHeight,
    updateHeight,
  };
}
