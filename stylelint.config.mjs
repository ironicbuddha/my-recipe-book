export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'coverage/**/*',
    '.next/**/*',
    'out/**/*',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'config',
          'theme',
          'utility',
          'variant',
          'responsive',
          'screen',
        ],
      },
    ],
    'alpha-value-notation': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
  },
};
