import { ref, type Ref } from 'vue';

interface UseApiOptions<T> {
  initialValue?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  immediate?: boolean;
}

interface UseApiReturn<T> {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: any[]) => Promise<T | undefined>;
  reset: () => void;
}

/**
 * A composable for handling API requests with loading states and error handling
 * @param apiFunction - The API function to execute
 * @param options - Configuration options
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const { initialValue, onSuccess, onError, immediate = false } = options;

  // Reactive state
  const data = ref<T | undefined>(initialValue) as Ref<T | undefined>;
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // Execute the API function
  const execute = async (...args: any[]): Promise<T | undefined> => {
    try {
      loading.value = true;
      error.value = null;

      const result = await apiFunction(...args);
      data.value = result;

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error('An unknown error occurred');
      error.value = apiError;

      // Call error callback if provided
      if (onError) {
        onError(apiError);
      } else {
        // Default error logging
        console.error('API Error:', apiError.message);
      }

      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Reset state
  const reset = (): void => {
    data.value = initialValue;
    loading.value = false;
    error.value = null;
  };

  // Execute immediately if requested
  if (immediate) {
    void execute();
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

/**
 * A specialized version of useApi for handling lists/collections
 */
export function useApiList<T>(
  apiFunction: (...args: any[]) => Promise<{ list: T[]; total: number }>,
  options: UseApiOptions<{ list: T[]; total: number }> = {}
) {
  const initialValue = { list: [] as T[], total: 0 };
  
  return useApi(apiFunction, {
    initialValue,
    ...options,
  });
}

/**
 * A specialized version of useApi for mutations (POST, PUT, DELETE)
 */
export function useApiMutation<T, P = any>(
  apiFunction: (params: P) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const mutation = useApi(apiFunction, options);

  // For mutations, we typically don't want immediate execution
  return {
    ...mutation,
    mutate: mutation.execute,
  };
}