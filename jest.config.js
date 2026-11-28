/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS config file */
const fs = require("fs");
const nextJest = require("next/jest");
const path = require("path");
const ts = require("typescript");
/* eslint-enable @typescript-eslint/no-require-imports -- CommonJS config file */

// Loads next.config.mjs and .env files into the test environment, and lets
// its `transpilePackages` (findable-ui ships ESM) through the SWC transform.
const createJestConfig = nextJest({ dir: "./" });

// Production code. Left out: tests (`__tests__`, `testing`), `content` (page
// data), `scripts`, and the values and types in `constants` and `types`.
const COVERAGE_DIRS = [
  "apis",
  "common",
  "components",
  "config",
  "contexts",
  "docs",
  "hooks",
  "pages",
  "routes",
  "site-config",
  "theme",
  "utils",
  "viewModelBuilders",
  "views",
];

/* eslint-disable @typescript-eslint/explicit-function-return-type -- JavaScript file; the JSDoc gives the types */

/**
 * Whether a TypeScript file compiles to no JavaScript (only types, interfaces
 * or type re-exports).
 * @param file - Path relative to the repo root.
 * @returns True when the compiled output holds no code.
 */
function emitsNoJavaScript(file) {
  const { outputText } = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, file), "utf8"),
    {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        removeComments: true,
      },
      fileName: file,
    }
  );
  // A types-only module compiles to `export {};`, after any "use client".
  const code = outputText.replace(/^["']use client["'];/, "").trim();
  return code === "" || code === "export {};";
}

/**
 * Coverage ignore patterns for the coverage candidates that compile to no
 * JavaScript. Jest substitutes `<rootDir>` unescaped, so each pattern is the
 * escaped absolute path instead.
 * @returns One exact-path pattern per such file.
 */
function typesOnlyFilePatterns() {
  return COVERAGE_DIRS.flatMap((dir) =>
    fs
      .readdirSync(path.join(__dirname, dir), { recursive: true })
      .map((file) => path.join(dir, file))
  )
    .filter((file) => /\.tsx?$/.test(file) && emitsNoJavaScript(file))
    .map(
      (file) =>
        `^${path.join(__dirname, file).replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}$`
    );
}

/* eslint-enable @typescript-eslint/explicit-function-return-type -- JavaScript file; the JSDoc gives the types */

/** @type {import('jest').Config} */
const customJestConfig = {
  collectCoverageFrom: [
    ...COVERAGE_DIRS.map((dir) => `${dir}/**/*.{ts,tsx}`),
    "mdx-components.tsx",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    // Jest manual mocks.
    "/__mocks__/",
    // Style declarations only, no logic to test.
    "\\.styles\\.ts$",
    // Settings only, no logic to test.
    "/constants\\.ts$",
    // v8 coverage reports an untested types-only file as uncovered lines
    // (jestjs/jest#14422).
    ...typesOnlyFilePatterns(),
  ],
  coverageProvider: "v8",
  // The table goes to the log; maxCols keeps file names from being cut short.
  // The totals file feeds the CI step summary, the XML feeds diff-cover.
  coverageReporters: [
    ["text", { maxCols: 120 }],
    ["text-summary", { file: "coverage-summary.txt" }],
    "cobertura",
  ],
  // Each floor is the measured coverage, rounded down, minus 1.
  coverageThreshold: {
    global: {
      branches: 1,
      lines: 3,
    },
  },
  // SWC rewrites `@/` in imports from tsconfig `paths`, but not the module
  // names passed to `jest.mock`, so Jest needs the alias too.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
