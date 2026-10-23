module.exports = {
  preset: "jest-expo",
  globalSetup: "<rootDir>/test/globalSetup.js",
  setupFilesAfterEnv: ["<rootDir>/test/jestSetup.js"],
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
  testPathIgnorePatterns: ["/src/server/"],
  moduleNameMapper: {
    // Must come before the aliases: Jest uses the first matching pattern.
    "\\.svg$": "<rootDir>/test/svgMock.js",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@copy/(.*)$": "<rootDir>/src/copy/$1",
    "^@core-components/(.*)$": "<rootDir>/src/core-components/$1",
    "^@global-components/(.*)$": "<rootDir>/src/global-components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
};
