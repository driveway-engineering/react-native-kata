import { apiRequest } from "./apiClient";
import type { Service } from "./types";

/** Service definitions only; availability comes from the appointment endpoints. */
export const getServices = (signal?: AbortSignal) =>
  apiRequest<Service[]>("/services", { signal });
