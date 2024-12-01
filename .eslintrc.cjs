/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals'
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-script-component-in-head': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'prefer-const': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
