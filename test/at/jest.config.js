module.exports = {
  globalSetup: '../env/setup.js',
  globalTeardown: '../env/teardown.js',
  testEnvironment: '../env/puppeteer_environment.js',
  testMatch: ["./**/__tests__/**/*.js"]
}
