import puppeteer from 'puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Architecture', () => {
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

  it('should display', async () => {
    expect.assertions(1)
    await page.waitForSelector('#fired-events')
    expect(await page.$('#fired-events')).toBeTruthy()
  })

  it('should display events cards', async () => {
    expect.assertions(1)

    await page.click('#publish-btn')
    await page.waitFor(10000)

    const cardsCount = await page.$$eval('#fired-events .event', (c: Element[]) => c.length)
    expect(cardsCount).toEqual(5)
  })
})
