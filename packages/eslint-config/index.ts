// packages/eslint-config/base.js
import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export default [
  eslintConfigPrettier,
  eslintJs.configs.recommended,
  turboPlugin.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
];
