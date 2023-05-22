module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["@pagopa/eslint-config/recommended"],
  ignorePatterns: ["**/models/*.ts", "*.yaml", "**/*.spec.ts", ".eslintrc.js"],
  overrides: [
    {
      files: ["**/*.spec.ts"],
      rules: {
        "functional/no-let": "off",
      },
    },
  ],
  rules: {
    "max-classes-per-file": "off",
  },
};
