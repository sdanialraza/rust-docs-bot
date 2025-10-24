import common from "eslint-config-neon/common";
import node from "eslint-config-neon/node";
import prettier from "eslint-config-neon/prettier";
import typescript from "eslint-config-neon/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  {
    ignores: ["eslint.config.js", "node_modules/**", "dist/**"],
  },
  ...common,
  ...node,
  ...typescript,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {},
  },
  ...prettier,
  prettierRecommended,
];

export default config;
