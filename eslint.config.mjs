import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';


export default [
  {
    
    ...js.configs.recommended,
    ...tseslint.configs.recommended[0],
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      ...tseslint.configs.recommended[0].rules
    },
  },
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/index.tsx','src/components/ui/**'],
    settings: {
      react: {
        version: 'detect', 
      },
    },
    ...reactPlugin.configs.flat.recommended,
  },
];

