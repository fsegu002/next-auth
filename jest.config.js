module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./{pages,src}/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageReporters: ['text-summary', 'html', 'text'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  }
};
