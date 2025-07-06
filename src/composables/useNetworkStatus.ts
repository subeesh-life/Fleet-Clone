import { ref, onMounted, onUnmounted } from 'vue';
import { Notify } from 'quasar';

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);
  const lastNotificationTime = ref(0);
  const NOTIFICATION_COOLDOWN = 3000; // 3 seconds cooldown between notifications
  const connectionType = ref<string>('unknown');
  const effectiveType = ref<string>('unknown');

  const showNetworkNotification = (online: boolean) => {
    const now = Date.now();

    // Prevent spam notifications with cooldown
    if (now - lastNotificationTime.value < NOTIFICATION_COOLDOWN) {
      return;
    }

    lastNotificationTime.value = now;

    if (online) {
      Notify.create({
        message: 'Network connection restored',
        color: 'positive',
        icon: 'wifi',
        position: 'top',
        timeout: 3000,
      });
    } else {
      Notify.create({
        message: 'No internet connection. Displayed data may be stale or outdated.',
        color: 'negative',
        icon: 'wifi_off',
        position: 'top',
        timeout: 0, // Don't auto-dismiss offline notifications
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
              // Dismiss notification
            },
          },
        ],
      });
    }
  };

  const handleOnline = () => {
    isOnline.value = true;
    showNetworkNotification(true);
  };

  const handleOffline = () => {
    isOnline.value = false;
    showNetworkNotification(false);
  };

  const updateConnectionInfo = () => {
    // Check if Network Information API is available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connectionType.value = connection.type || 'unknown';
      effectiveType.value = connection.effectiveType || 'unknown';
    }
  };

  onMounted(() => {
    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Add event listener for connection changes (if supported)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionInfo);
    }

    // Initialize connection info
    updateConnectionInfo();

    // Show initial status if offline
    if (!navigator.onLine) {
      isOnline.value = false;
      showNetworkNotification(false);
    }
  });

  onUnmounted(() => {
    // Clean up event listeners
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);

    // Clean up connection event listener
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.removeEventListener('change', updateConnectionInfo);
    }
  });

  return {
    isOnline,
    connectionType,
    effectiveType,
    showNetworkNotification,
  };
}
