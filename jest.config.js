module.exports = {
  preset: "jest-expo",
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
  testPathIgnorePatterns: ["/src/server/"],
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@copy/(.*)$": "<rootDir>/src/copy/$1",
    "^@core-components/(.*)$": "<rootDir>/src/core-components/$1",
    "^@global-components/(.*)$": "<rootDir>/src/global-components/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "\\.svg$": "<rootDir>/test/svgMock.js",
  },
};
