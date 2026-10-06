import { getApiBaseUrl } from "./api";

describe("getApiBaseUrl", () => {
  const original = process.env.EXPO_PUBLIC_API_URL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.EXPO_PUBLIC_API_URL;
    } else {
      process.env.EXPO_PUBLIC_API_URL = original;
    }
  });

  it("explains missing configuration", () => {
    delete process.env.EXPO_PUBLIC_API_URL;
    expect(getApiBaseUrl).toThrow("EXPO_PUBLIC_API_URL");
  });

  it.each(["", "localhost:2000", "not a URL", "ftp://example.com", "https://user:password@example.com", "http://localhost:2000?token=secret"])(
    "rejects invalid configuration: %s",
    (value) => {
      process.env.EXPO_PUBLIC_API_URL = value;
      expect(getApiBaseUrl).toThrow("EXPO_PUBLIC_API_URL");
    },
  );

  it.each(["http://localhost:2000", "http://10.0.2.2:2000", "https://example.com/api"])(
    "returns a valid API base URL: %s",
    (value) => {
      process.env.EXPO_PUBLIC_API_URL = ` ${value}/ `;
      expect(getApiBaseUrl()).toBe(value);
    },
  );
});
