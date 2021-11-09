module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "airbnb-typescript",
    "plugin:eslint-comments/recommended",
    "plugin:compat/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
      generators: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // let prettier do the indenting, turn off other conflicting rules
    "react/jsx-indent": "off",
    "@typescript-eslint/indent": "off",

    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",

    // Specify double quotes, turn off base and override.
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],

    // Allow react class based components for now
    "react/prefer-stateless-function": "off",
  },
};
