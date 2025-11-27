/**
 * Custom hook for handling async operations
 * Manages loading, error, and data states
 */

import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T = any>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('An error occurred');
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData = useCallback((data: T) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState((prev) => ({ ...prev, error, loading: false }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
}
