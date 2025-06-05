import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'style/operator-linebreak': ['warn', 'after'],
    'unicorn/prefer-node-protocol': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-console': 'off',
    'jsonc/sort-keys': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'unused-imports/no-unused-imports': 'warn',
    'perfectionist/sort-imports': ['error', {
      groups: [
        'builtin',
        'external',
        ['internal', 'internal-type'],
        ['parent', 'sibling', 'index'],

        'type',
        ['parent-type', 'sibling-type', 'index-type'],

        'side-effect',
        'object',
        'unknown',
      ],
      newlinesBetween: 'ignore',
      order: 'asc',
      type: 'natural',
    }],
  },
  vue: {
    overrides: {
      'vue/block-order': ['warn', {
        order: [['template', 'script'], 'style'],
      }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
    },
  },
  stylistic: {
    overrides: {
      'style/brace-style': ['warn', '1tbs'],
      'style/arrow-parens': 'off',
    },
  },
})
