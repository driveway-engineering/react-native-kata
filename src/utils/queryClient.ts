import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./apiClient";

const MAX_QUERY_RETRIES = 2;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        // Transparently absorb the API's intermittent 500s, but don't retry
        // requests the server has rejected as invalid.
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.isClientError) && failureCount < MAX_QUERY_RETRIES,
      },
      mutations: {
        // Never silently re-send a booking.
        retry: false,
      },
    },
  });
