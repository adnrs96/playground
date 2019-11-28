import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Toolbar', () => {
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

  it('clicking storyscript logo should redirect to the welcome page', async () => {
    expect.assertions(1)
    await page.waitForSelector('#toolbar-ss-logo')
    await page.click('#toolbar-ss-logo')
    await page.waitForSelector('#welcome')
    expect(await page.url()).toEqual(`${TEST_URL}/welcome`)
  })

  it('should display text on hover on hub nav button', async () => {
    expect.assertions(1)
    await page.waitForSelector('#toolbar-nav')
    await page.hover('#toolbar-nav')
    const tip = await page.$eval('#toolbar-nav-drop>div:nth-child(2)>div>p', (e: Element) => e.innerHTML)
    expect(tip.trim()).toEqual('Discover services in the Storyscript Hub')
    await percySnapshot(page, 'Studio Toolbar NavHub Tip')
  })

  it('clicking hub nav in toolbar should open hub in new tab', async () => {
    expect.assertions(1)
    await page.waitForSelector('#toolbar-nav')
    const newTargetPromise = new Promise(resolve =>
      browser.on('targetcreated', (target: puppeteer.Target) => {
        if (target.opener() === page.target()) { resolve(target) }
      }))
    await page.click('#toolbar-nav')
    const newTarget = await newTargetPromise as puppeteer.Target
    expect(newTarget.url()).toEqual('https://hub.storyscript.io/')
  })
})
