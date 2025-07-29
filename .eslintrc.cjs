module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [],
  ignorePatterns: ['dist', 'build', 'lib', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
  globals: {
    vi: true,
  },
};
