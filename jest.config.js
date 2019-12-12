const { defaults } = require('jest-config')
const puppeteerModes = ['integration', 'integration-local']
const { TEST_MODE, TEST_FILE } = process.env
const PUPPETEER_MODE = puppeteerModes.includes(TEST_MODE)
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: PUPPETEER_MODE ? 'jest-puppeteer' : defaults.preset,
  verbose: process.env.NODE_ENV !== 'production',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.story$': 'jest-raw-loader'
  },
  transformIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '^@app/Studio.vue$': '<rootDir>/src/app/Studio.vue',
    '^@app/store(.*)$': '<rootDir>/src/app/store$1',
    '^@app/router(.*)$': '<rootDir>/src/app/router$1',
    '^@app/event(.*)$': '<rootDir>/src/app/event$1',
    '^&/(editor(.d)?|monaco)$': '<rootDir>/src/editor/core/types/$1',
    '^&/(.*)$': '<rootDir>/src/**/types/$1',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^vscode$': 'monaco-languageclient/lib/vscode-compatibility'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch:
    TEST_FILE &&
    (TEST_MODE === 'integration' || TEST_MODE === 'integration-local')
      ? [`**/tests/e2e/**/${TEST_FILE}.e2e.(js|jsx|ts|tsx)`]
      : TEST_FILE &&
        TEST_MODE !== 'integration' &&
        TEST_MODE !== 'integration-local'
        ? [`**/tests/unit/**/${TEST_FILE}.spec.(js|jsx|ts|tsx)`]
        : TEST_MODE === 'integration' || TEST_MODE === 'integration-local'
          ? ['**/tests/e2e/**/*.e2e.(js|jsx|ts|tsx)']
          : ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  collectCoverage:
    TEST_MODE !== 'integration' && TEST_MODE !== 'integration-local',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/app/(main|router|registerServiceWorker|service-worker).{ts,js}',
    '!src/app/store/index.ts',
    '!src/app/store/modules/index.ts',
    '!src/samples/**/*.ts',
    '!src/internal/directives/*.ts',
    '!src/internal/plugins/**/*.{js,ts,vue}',
    '!src/editor/core/plugins/*.{js,ts,vue}'
  ]
}
