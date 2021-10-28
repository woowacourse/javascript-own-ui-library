module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "airbnb-base",
    "prettier",
  ],
  plugins: ["import"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/extensions": "off",
    "no-restricted-syntax": "off",
  },
};
