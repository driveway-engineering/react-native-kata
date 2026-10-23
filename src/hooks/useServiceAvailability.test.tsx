import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import type { ReactNode } from "react";
import { mockFetch } from "../../test/mockFetch";
import { useServiceAvailability } from "./useServiceAvailability";

const services = [{ id: 1, name: "Synthetic Oil Change", duration: 1800 }];
const slots = [
  {
    id: "a",
    serviceId: 1,
    serviceName: "Synthetic Oil Change",
    start: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    duration: 1800,
    booked: false,
  },
];

const renderAvailability = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return renderHook(() => useServiceAvailability(), { wrapper });
};

describe("useServiceAvailability", () => {
  it("stays loading until every service's availability has settled", async () => {
    mockFetch({
      "GET /services": () => ({ body: services }),
      "GET /appointments/1": () => ({ body: slots }),
    });
    const { result } = renderAvailability();

    expect(result.current.status).toBe("loading");
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.availableServices).toEqual([{ service: services[0], slots }]);
    expect(result.current.failedServices).toEqual([]);
  });

  it("keeps the cached list when a background refresh fails", async () => {
    mockFetch({
      "GET /services": [() => ({ body: services }), () => ({ status: 500, body: "down" })],
      "GET /appointments/1": () => ({ body: slots }),
    });
    const { result } = renderAvailability();
    await waitFor(() => expect(result.current.status).toBe("success"));

    act(() => result.current.refresh());

    await waitFor(() => expect(result.current.isRefreshing).toBe(false));
    expect(result.current.status).toBe("success");
    expect(result.current.availableServices).toHaveLength(1);
  });
});
