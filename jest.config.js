const { defaults } = require('jest-config')
const puppeteerModes = ['integration', 'integration-local']
const { TEST_MODE, TEST_FILE } = process.env
const PUPPETEER_MODE = puppeteerModes.includes(TEST_MODE)

module.exports = {
  preset: PUPPETEER_MODE ? 'jest-puppeteer' : defaults.preset,
  verbose: !process.env.NODE_ENV === 'production',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '\\.story': 'jest-raw-loader'
  },
  transformIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
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
    '!src/(registerServiceWorker|main|router).ts',
    '!src/store/index.ts',
    '!src/store/modules/index.ts',
    '!src/samples/**/*.ts',
    '!src/directives/*.ts',
    '!src/plugins/**/*.{js,ts,vue}',
    'src/views/Login.vue'
  ]
}
