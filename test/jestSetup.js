jest.mock(
  "react-native-safe-area-context",
  () => jest.requireActual("react-native-safe-area-context/jest/mock").default,
);

// Reanimated runs on the JS thread in tests; worklets have no native module.
jest.mock("react-native-worklets", () => require("react-native-worklets/src/mock"));
require("react-native-reanimated").setUpTests();

process.env.EXPO_PUBLIC_API_URL = "http://localhost:2000";

const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
});
