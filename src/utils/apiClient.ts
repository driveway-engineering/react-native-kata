import { getApiBaseUrl } from "@utils/api";

export const REQUEST_TIMEOUT_MS = 15_000;

export const apiErrorMessages = {
  network: "We couldn't reach the server. Check your connection and try again.",
  timeout: "The server took too long to respond. Please try again.",
  unexpected: "Something went wrong. Please try again.",
  invalidResponse: "The server sent an unexpected response. Please try again.",
};

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  /** 4xx responses describe a problem with the request, so retrying won't help. */
  get isClientError(): boolean {
    return this.status !== undefined && this.status >= 400 && this.status < 500;
  }
}

/**
 * Thin fetch wrapper: resolves the configured base URL, applies a timeout,
 * checks the status before decoding JSON, and normalises every failure into
 * an ApiError with a message that is safe to show to the user.
 */
export const apiRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  let baseUrl: string;
  try {
    baseUrl = getApiBaseUrl();
  } catch (error) {
    throw new ApiError((error as Error).message);
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const callerSignal = init.signal;
  const forwardAbort = () => controller.abort();
  callerSignal?.addEventListener("abort", forwardAbort);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...init.headers },
      signal: controller.signal,
    });
  } catch (error) {
    if (callerSignal?.aborted) {
      // Cancelled by the caller (e.g. React Query); let it propagate untouched.
      throw error;
    }
    throw new ApiError(timedOut ? apiErrorMessages.timeout : apiErrorMessages.network);
  } finally {
    clearTimeout(timeout);
    callerSignal?.removeEventListener("abort", forwardAbort);
  }

  if (!response.ok) {
    // The API returns plain-text error bodies.
    const body = await response.text().catch(() => "");
    throw new ApiError(body.trim() || apiErrorMessages.unexpected, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(apiErrorMessages.invalidResponse, response.status);
  }
};
