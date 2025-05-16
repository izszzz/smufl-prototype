module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json", // 型情報の参照
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // custom rurles
    "no-useless-rename": ["error"],
    "no-void": ["error"],
    "@typescript-eslint/no-unnecessary-condition": ["error"],
  },
};
