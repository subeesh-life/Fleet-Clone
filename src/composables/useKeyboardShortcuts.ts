import { onMounted, onUnmounted } from 'vue';
import type { Router } from 'vue-router';
import { Notify } from 'quasar';

export function useKeyboardShortcuts(router: Router) {
  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    // Command/Meta + Shift + D for Dispatch
    if (event.metaKey && event.shiftKey && event.key.toLowerCase() === 'd') {
      event.preventDefault(); // Prevent default browser behavior
      void router
        .push({ name: 'dispatch' })
        .then(() => {
          Notify.create({
            message: 'Navigating to Dispatch',
            color: 'primary',
            position: 'top',
            timeout: 1000,
          });
        })
        .catch(error => {
          console.error('Navigation failed:', error);
          Notify.create({
            message: 'Navigation failed',
            color: 'negative',
            position: 'top',
            timeout: 1000,
          });
        });
    }

    //Command/Meta + Shift + L for Live Map
    if (event.metaKey && event.key.toLowerCase() === 'h') {
      event.preventDefault(); // Prevent default browser behavior
      void router
        .push({ name: 'executive-dashboard' })
        .then(() => {
          Notify.create({
            message: 'Navigating to Home',
            color: 'primary',
            position: 'top',
            timeout: 1000,
          });
        })
        .catch(error => {
          console.error('Navigation failed:', error);
          Notify.create({
            message: 'Navigation failed',
            color: 'negative',
            position: 'top',
            timeout: 1000,
          });
        });
    }

    // //Command/Meta + Shift + L for Live Map
    // if (event.metaKey && event.shiftKey && event.key.toLowerCase() === 'l') {
    //   event.preventDefault() // Prevent default browser behavior
    //   void router
    //     .push({ name: 'live-map' })
    //     .then(() => {
    //       Notify.create({
    //         message: 'Navigating to Live Map',
    //         color: 'primary',
    //         position: 'top',
    //         timeout: 2000,
    //       })
    //     })
    //     .catch((error) => {
    //       console.error('Navigation failed:', error)
    //       Notify.create({
    //         message: 'Navigation failed',
    //         color: 'negative',
    //         position: 'top',
    //         timeout: 2000,
    //       })
    //     })
    // }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyboardShortcuts);
  });

  return {
    handleKeyboardShortcuts,
  };
}
