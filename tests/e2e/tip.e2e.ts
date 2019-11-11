import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Tip', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/?skipIntro=true`)
  })

  afterAll(() => {
    browser.close()
  })

  it('should display text in tip', async () => {
    expect.assertions(1)
    await page.waitForSelector('#new-from-scratch-tip')
    await page.click('#new-from-scratch-tip')
    const tip = await page.$eval('#new-from-scratch-tip>.content>div>p', (e: Element) => e.innerHTML)
    expect(tip).toEqual('Studio for creating your own apps is under development.')
    await percySnapshot(page, 'Studio NewFromScratch Tip')
  })
})
