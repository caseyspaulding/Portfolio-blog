/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals', // Includes react-hooks/recommended
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-script-component-in-head': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
