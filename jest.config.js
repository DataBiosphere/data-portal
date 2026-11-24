// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS config file
const nextJest = require("next/jest");

// Loads next.config.mjs and .env files into the test environment, and lets
// its `transpilePackages` (findable-ui ships ESM) through the SWC transform.
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  // SWC rewrites `@/` in imports from tsconfig `paths`, but not the module
  // names passed to `jest.mock`, so Jest needs the alias too.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
