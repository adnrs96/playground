import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Intercom', () => {
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

  it('should display the intercom dialog', async () => {
    expect.assertions(1)
    await page.waitForSelector('#help-drop-btn') // click on help dropdown
    await page.click('#help-drop-btn')
    await page.waitForSelector('#chat-with-us-btn') // click on chat button
    await page.click('#chat-with-us-btn')
    await page.waitForSelector('#intercom-container>div>div>iframe')
    const frame = await page.$eval('#intercom-container>div>div>iframe', (e: Element) => e.tagName)
    expect(frame).toEqual('IFRAME')
    await percySnapshot(page, 'Studio intercom dialog')
  })
})
