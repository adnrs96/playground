import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Percy screenshots', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
  })

  afterAll(() => {
    browser.close()
  })

  it('should take a screenshot of the studio page', async () => {
    expect.assertions(1)
    await page.waitForSelector('#publish-btn')
    await page.click('#publish-btn')
    await page.waitFor(10000)
    await percySnapshot(page, 'Studio page')
    expect(true).toBeTruthy()
  })

  it('should take a screenshot of the welcome page', async () => {
    expect.assertions(1)
    await page.goto(`${TEST_URL}/welcome`)
    await page.waitForSelector('#welcome')
    await percySnapshot(page, 'Welcome page')
    expect(true).toBeTruthy()
  })
})
