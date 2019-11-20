import puppeteer from 'puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Navbar', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
  })

  beforeEach(async () => {
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
  })

  afterAll(() => {
    browser.close()
  })

  describe('the storyscript logo', () => {
    it('should redirect to the welcome page', async () => {
      expect.assertions(1)
      await page.waitForSelector('#home-btn-logo')
      await page.click('#home-btn-logo')
      await page.waitForSelector('#welcome')
      expect(await page.url()).toEqual(`${TEST_URL}/welcome`)
    })
  })

  describe('the See More Examples button', () => {
    it('should redirect to the welcome page', async () => {
      expect.assertions(1)
      await page.waitForSelector('#see-more-examples-btn')
      await page.click('#see-more-examples-btn')
      await page.waitForSelector('#welcome')
      expect(await page.url()).toEqual(`${TEST_URL}/welcome`)
    })
  })
})
