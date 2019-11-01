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
    await page.goto(`${TEST_URL}/?skipIntro=true`)
  })

  afterAll(() => {
    browser.close()
  })

  it('should take a screenshot of the playground page', async () => {
    expect.assertions(1)
    await page.waitForSelector('#deploy-btn')
    await page.click('#deploy-btn')
    await page.waitFor(10000)
    await percySnapshot(page, 'Playground page')
    expect(true).toBeTruthy()
  })

  it('should take a screenshot of the login modal', async () => {
    expect.assertions(1)
    await page.waitForSelector('#login')
    await page.click('#login-btn')
    await page.waitFor(500)
    await percySnapshot(page, 'Login Modal')
    expect(true).toBeTruthy()
  })
})
