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

const PARENT_SEGMENT_REGEX = new RegExp(PARENT_SEGMENT_PATTERN);

const RELATIVE_IMPORT_MESSAGE =
  "Use the @/ root alias for imports outside this file's subtree; relative imports are only for ./ descendants.";

/* eslint-disable @typescript-eslint/explicit-function-return-type -- plain JS can't declare return types; the JSDoc documents them. */

// Stands in for a computed part of an import specifier (a variable, a call).
// Its value is unknown, so it can't form a `..` segment with the text around
// it: only the text written out in the source is checked.
const COMPUTED_PART = "\0";

/**
 * Returns every text an import specifier expression can spell out, joining
 * string literals, template literal chunks and `+` concatenations, with each
 * computed part replaced by `COMPUTED_PART`. Each branch of a `?:`, `||`,
 * `&&` or `??` gives its own texts, TypeScript `as`, `satisfies` and `!`
 * wrappers are looked through, and a tagged template such as `String.raw` is
 * read as its template text.
 * @param node - Import specifier expression.
 * @returns Specifier texts.
 */
function getSpecifierTexts(node) {
  switch (node.type) {
    case "BinaryExpression":
      return node.operator === "+"
        ? joinTexts([
            getSpecifierTexts(node.left),
            getSpecifierTexts(node.right),
          ])
        : [COMPUTED_PART];
    case "ConditionalExpression":
      return [
        ...getSpecifierTexts(node.consequent),
        ...getSpecifierTexts(node.alternate),
      ];
    case "Literal":
      return [typeof node.value === "string" ? node.value : COMPUTED_PART];
    case "LogicalExpression":
      return [
        ...getSpecifierTexts(node.left),
        ...getSpecifierTexts(node.right),
      ];
    case "TaggedTemplateExpression":
      return getSpecifierTexts(node.quasi);
    case "TemplateLiteral":
      return joinTexts(
        node.quasis.flatMap((quasi, i) =>
          node.expressions[i]
            ? [[quasi.value.cooked], getSpecifierTexts(node.expressions[i])]
            : [[quasi.value.cooked]]
        )
      );
    case "TSAsExpression":
    case "TSNonNullExpression":
    case "TSSatisfiesExpression":
      return getSpecifierTexts(node.expression);
    default:
      return [COMPUTED_PART];
  }
}

/**
 * Returns true if a call's callee is `require` or a `require.*` method such
 * as `require.resolve` or `require.context`.
 * @param callee - Call expression callee.
 * @returns True if the call is a require call.
 */
function isRequireCallee(callee) {
  const target = callee.type === "MemberExpression" ? callee.object : callee;
  return target.type === "Identifier" && target.name === "require";
}

/**
 * Returns every text formed by joining one text from each part, in order.
 * @param parts - Possible texts for each consecutive part of a specifier.
 * @returns Joined texts.
 */
function joinTexts(parts) {
  return parts.reduce(
    (texts, part) => texts.flatMap((text) => part.map((next) => text + next)),
    [""]
  );
}

// no-restricted-imports only sees static declarations, so this rule checks
// the specifier of dynamic `import()`, `require()` (including
// `require.resolve` and `require.context`) and `typeof import()` types. Only
// the specifier argument is checked, so strings elsewhere in the call (e.g.
// `require.resolve("x", { paths: [".."] })`) are ignored.
const noParentSpecifierRule = {
  create(context) {
    /**
     * Reports the specifier if it contains a `..` segment.
     * @param specifier - Import specifier expression, if any.
     */
    function check(specifier) {
      if (
        specifier &&
        getSpecifierTexts(specifier).some((text) =>
          PARENT_SEGMENT_REGEX.test(text)
        )
      ) {
        context.report({ messageId: "parentSegment", node: specifier });
      }
    }
    return {
      CallExpression(node) {
        if (isRequireCallee(node.callee)) check(node.arguments[0]);
      },
      ImportExpression(node) {
        check(node.source);
      },
      TSImportType(node) {
        check(node.source);
      },
    };
  },
  meta: {
    docs: {
      description:
        "Disallow `..` segments in dynamic import, require and import type specifiers.",
    },
    messages: { parentSegment: RELATIVE_IMPORT_MESSAGE },
    schema: [],
    type: "problem",
  },
};

/* eslint-enable @typescript-eslint/explicit-function-return-type -- restore for the rest of the file. */

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
    //
    // Keep this block last and unscoped. Flat config replaces a rule's
    // options rather than merging them, so this block's
    // `@typescript-eslint/no-restricted-imports` options silently override
    // any set by an earlier block: add new restrictions for that rule here.
    plugins: {
      "path-alias": { rules: { "no-parent-specifier": noParentSpecifierRule } },
    },
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
      "path-alias/no-parent-specifier": "error",
    },
  },
];

export default config;
