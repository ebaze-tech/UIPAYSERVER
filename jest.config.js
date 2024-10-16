module.exports = {
  // Look for test files with .test.js or .spec.js anywhere in the project
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],

  // Specify directories to ignore when looking for tests
  testPathIgnorePatterns: ["/node_modules/", "/build/"],

  // Enable support for ES6 modules
  transform: {
    "^.+\\.js$": "babel-jest",
  },

  transformIgnorePatterns: ["/node_modules/(?!(chai|chai-http)/)"],

  // Automatically clear mock calls, instances, contexts, and results before every test
  clearMocks: true,

  // Coverage settings (optional)
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/*.test.{js,jsx}",
    "!**/node_modules/**",
  ],
};
