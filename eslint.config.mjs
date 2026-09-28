import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "eslint-config-next";
import sonarjs from "eslint-plugin-sonarjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Matches a `..` segment anywhere in an import specifier: it escapes the
// importing file's subtree, however it is spelled.
const PARENT_SEGMENT_PATTERN = String.raw`(^|\/)\.\.(\/|$)`;

const RELATIVE_IMPORT_MESSAGE =
  "Use the @/ root alias for imports outside this file's subtree; relative imports are only for ./ descendants.";

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: [
      "**/node_modules/**",
      "**/out/**",
      "**/.next/**",
      "**/build/**",
      "**/analytics/**",
      "next-env.d.ts",
      "next.config.mjs",
    ],
  },
  ...next,
  sonarjs.configs.recommended,
  ...compat.config({
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:@eslint-community/eslint-comments/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint",
      "jsdoc",
      "sort-destructure-keys",
      "perfectionist",
      "react-hooks",
    ],
    rules: {
      "@eslint-community/eslint-comments/require-description": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "jsdoc/check-alignment": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/require-description": "error",
      "jsdoc/require-hyphen-before-param-description": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-param-name": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",
      "perfectionist/sort-enums": "error",
      "perfectionist/sort-interfaces": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/immutability": "error",
      // react-hooks/incompatible-library targets React Compiler users; we
      // don't run the Compiler, so the rule isn't earning its keep yet.
      "react-hooks/incompatible-library": "off",
      "react-hooks/refs": "error",
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/static-components": "error",
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/redundant-type-aliases": "warn",
      "sonarjs/todo-tag": "warn",
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        { caseSensitive: false },
      ],
      "sort-keys": [
        "error",
        "asc",
        { caseSensitive: true, minKeys: 2, natural: false },
      ],
    },
  }),
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: ["**/*.styles.ts", "**/*.styles.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
  {
    // Imports that reach outside a file's own subtree must use the `@/` root
    // alias so file moves don't rewrite unrelated import lines (#3210).
    // `./` stays allowed for same-directory and descendant imports. Bare
    // root paths like `constants/routes` need no rule: without `baseUrl` in
    // tsconfig they fail to compile, unless an installed npm package shares
    // the top-level folder's name, in which case the package wins. No
    // installed package does today, so that case is left unguarded rather
    // than maintaining a list of top-level folders.
    rules: {
      // The typescript-eslint variant also catches `import type`.
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            { message: RELATIVE_IMPORT_MESSAGE, regex: PARENT_SEGMENT_PATTERN },
          ],
        },
      ],
      // no-restricted-imports only sees static declarations, so dynamic
      // `import()`, `require()` (including `require.resolve` and
      // `require.context`) and `typeof import()` types are checked by syntax
      // instead. Any string or template-literal chunk inside them is
      // checked, which also covers concatenated specifiers.
      "no-restricted-syntax": [
        "error",
        ...[
          "ImportExpression",
          "CallExpression:matches([callee.name='require'], [callee.object.name='require'])",
          "TSImportType",
        ].map((node) => ({
          message: RELATIVE_IMPORT_MESSAGE,
          selector: `${node} :matches(Literal[value=/${PARENT_SEGMENT_PATTERN}/], TemplateElement[value.cooked=/${PARENT_SEGMENT_PATTERN}/])`,
        })),
      ],
    },
  },
];

export default config;
