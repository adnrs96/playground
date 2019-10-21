import puppeteer from 'puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Temporary', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(TEST_URL)
  })

  afterAll(() => {
    browser.close()
  })

  it('should display', async () => {
    expect(page.$('#playground')).toBeTruthy()
  })
})
