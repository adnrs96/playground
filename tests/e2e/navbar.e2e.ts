import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
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

  it('should display text under button', async () => {
    expect.assertions(1)
    await page.waitForSelector('#new-from-tpl-btn')
    await page.click('#new-from-tpl-btn')
    const tip = await page.$eval('#new-from-tpl-btn>.content>div>p', (e: Element) => e.innerHTML)
    expect(tip.trim()).toEqual('Studio for creating your own apps is under active development.')
    await percySnapshot(page, 'Studio NewFromTemplate Tip')
  })
})
