module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    // It's needed for projects that are in monorepo
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    files: ['*.ts', '*.tsx'],
  },
  plugins: ['@typescript-eslint', 'prettier', 'react-native-globals', 'react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'universe',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'no-redeclare': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],

    'react/jsx-no-bind': ['warn'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',

    'react-native/no-single-element-style-arrays': 'off',
    'react-native/no-raw-text': [
      2,
      {
        skip: [
          'Text.H1',
          'Text.H1Bold',
          'Text.H2',
          'Text.H2Bold',
          'Text.H3',
          'Text.H3Bold',
          'Text.H4',
          'Text.H4Bold',
          'Text.H5',
          'Text.H5Bold',
          'Text.H6',
          'Text.H6Bold',
          'Text.Body',
          'Text.Bold',
          'Text.Caption',
          'Text.CaptionBold',
          'Text.Subtitle',
          'Text.SubtitleBold',
          'Button',
          'Heading',
          'Menu.Item',
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
