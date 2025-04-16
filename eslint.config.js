import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  { files: ["**/*.json"], plugins: { json }, language: "json/json" },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc" },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5" },
  { files: ["**/*.css"], plugins: { css }, language: "css/css" },
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-useless-constructor": "off"
    },
  }
]);