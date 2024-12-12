import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "block-scoped-var": "error",
      "consistent-return": "off",
      "no-console": "warn",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
    },
  },
];
