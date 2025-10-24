// eslint.config.js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

export default [
  // 1. Базові правила ESLint для JS
  js.configs.recommended,

  // 2. Правила для TypeScript + React
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React правила
      'react/react-in-jsx-scope': 'off', // не потрібно в React 17+
      'react/prop-types': 'off',         // ми використовуємо TypeScript
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React Refresh (Vite Fast Refresh)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // 3. Prettier - вимикає конфліктуючі ESLint правила
  prettier,
]
