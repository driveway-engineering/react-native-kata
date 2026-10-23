import { jsonResponse, mockFetch } from "../../test/mockFetch";
import { ApiError, apiErrorMessages, apiRequest } from "./apiClient";
import { bookAppointment } from "./appointments";
import { getServices } from "./services";

describe("apiRequest", () => {
  it("prefixes the configured base URL and decodes JSON", async () => {
    const fetchMock = mockFetch({ "GET /services": () => ({ body: [{ id: 1 }] }) });
    await expect(apiRequest("/services")).resolves.toEqual([{ id: 1 }]);
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:2000/services", expect.anything());
  });

  it("surfaces the API's plain-text error with its status", async () => {
    mockFetch({
      "GET /appointments/1": () => ({
        status: 500,
        body: "Unable to load appointments. Please try again.",
      }),
    });
    const error = await apiRequest("/appointments/1").then(
      () => null,
      (caught: ApiError) => caught,
    );
    expect(error).toBeInstanceOf(ApiError);
    expect(error?.message).toBe("Unable to load appointments. Please try again.");
    expect(error?.status).toBe(500);
    expect(error?.isClientError).toBe(false);
  });

  it("falls back to a generic message for empty error bodies", async () => {
    mockFetch({ "GET /x": () => ({ status: 502, body: "" }) });
    await expect(apiRequest("/x")).rejects.toThrow(apiErrorMessages.unexpected);
  });

  it("reports network failures in user-facing terms", async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError("Network request failed"));
    await expect(apiRequest("/services")).rejects.toThrow(apiErrorMessages.network);
  });

  it("reports invalid JSON on a successful response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ...jsonResponse({ body: null }),
      json: async () => {
        throw new SyntaxError("Unexpected token");
      },
    });
    await expect(apiRequest("/services")).rejects.toThrow(apiErrorMessages.invalidResponse);
  });

  it("explains missing API configuration instead of making a request", async () => {
    const original = process.env.EXPO_PUBLIC_API_URL;
    delete process.env.EXPO_PUBLIC_API_URL;
    global.fetch = jest.fn();
    try {
      await expect(apiRequest("/services")).rejects.toThrow("EXPO_PUBLIC_API_URL");
      expect(global.fetch).not.toHaveBeenCalled();
    } finally {
      process.env.EXPO_PUBLIC_API_URL = original;
    }
  });
});

describe("endpoints", () => {
  it("getServices requests /services", async () => {
    mockFetch({ "GET /services": () => ({ body: [] }) });
    await expect(getServices()).resolves.toEqual([]);
  });

  it("bookAppointment sends a JSON PATCH to the slot", async () => {
    const booking = {
      customerName: "Jane Doe",
      email: "jane@example.com",
      modelYear: 2020,
      make: "Mazda",
      model: "Miata",
    };
    const fetchMock = mockFetch({
      "PATCH /appointments/book/abc": () => ({ body: { id: "abc", booked: true, ...booking } }),
    });
    await bookAppointment("abc", booking);

    const [, init] = fetchMock.mock.calls[0];
    expect(init?.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(String(init?.body))).toEqual(booking);
  });
});
