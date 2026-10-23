export const TEST_API_URL = "http://localhost:2000";

type MockResponse = { status?: number; body: unknown };
type Handler = (init?: RequestInit) => MockResponse;

export const jsonResponse = ({ status = 200, body }: MockResponse) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  }) as Response;

/**
 * Replaces global fetch with a route table keyed by "METHOD /path".
 * A handler may be an array to return different responses on successive calls.
 */
export const mockFetch = (routes: Record<string, Handler | Handler[]>) => {
  const calls = new Map<string, number>();
  const fetchMock = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const path = String(input).replace(TEST_API_URL, "");
    const key = `${init?.method ?? "GET"} ${path}`;
    const route = routes[key];
    if (!route) {
      throw new Error(`Unexpected request: ${key}`);
    }
    const count = calls.get(key) ?? 0;
    calls.set(key, count + 1);
    const handler = Array.isArray(route) ? route[Math.min(count, route.length - 1)] : route;
    return jsonResponse(handler(init));
  });
  global.fetch = fetchMock as typeof fetch;
  return fetchMock;
};
