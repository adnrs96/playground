const os = require('os')

const PORT = process.env.PORT || 8080
const platform = os.platform()
const TEST_URL = `http://localhost:${PORT}`
const SEED = Date.now()

const puppeteerConfig = () => {
  const args = ['-–no-sandbox’, ‘-–disable-setuid-sandbox']
  return {
    headless: process.env.TEST_MODE === 'integration',
    timeout: 10000,
    defaultViewport: {
      width: 1440,
      height: 1024
    },
    args: /^win/.test(platform) ? [...args] : [...args, '--single-process']
  }
}

module.exports = {
  PORT,
  TEST_URL,
  SEED,
  puppeteerConfig
}
