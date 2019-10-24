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
    await page.goto(TEST_URL)
  })

  afterAll(() => {
    browser.close()
  })

  it('should take a screenshot of the playground page', async () => {
    expect.assertions(1)
    await page.waitFor(2000)
    await percySnapshot(page, 'Playground page')
    expect(true).toBeTruthy()
  })
})
