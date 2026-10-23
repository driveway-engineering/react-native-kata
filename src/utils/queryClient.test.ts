import { ApiError } from "./apiClient";
import { createQueryClient } from "./queryClient";

describe("createQueryClient", () => {
  const retry = createQueryClient().getDefaultOptions().queries?.retry as (
    failureCount: number,
    error: Error,
  ) => boolean;

  it("retries server and network failures a limited number of times", () => {
    const error = new ApiError("Unable to load appointments.", 500);
    expect(retry(0, error)).toBe(true);
    expect(retry(1, error)).toBe(true);
    expect(retry(2, error)).toBe(false);
    expect(retry(0, new ApiError("Network failed"))).toBe(true);
  });

  it("does not retry requests the server rejected", () => {
    expect(retry(0, new ApiError("invalid serviceId", 400))).toBe(false);
  });

  it("never retries bookings automatically", () => {
    expect(createQueryClient().getDefaultOptions().mutations?.retry).toBe(false);
  });
});
