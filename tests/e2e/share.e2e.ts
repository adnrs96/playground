import puppeteer from 'puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Share', () => {
  let page: puppeteer.Page
  let browser: puppeteer.Browser

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    await browser.browserContexts()[0].overridePermissions(`${TEST_URL}`, ['clipboard-write', 'clipboard-read'])
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
  })

  afterAll(() => {
    browser.close()
  })

  it('should display', async () => {
    expect.assertions(1)
    await page.waitForSelector('#share')
    expect(await page.$('#share')).toBeTruthy()
  })

  describe('modal', () => {
    it('should open a modal when clicked', async () => {
      await page.click('#share-btn')
      await page.waitFor(1000)
      expect(await page.$('#share-modal')).toBeTruthy()
    })

    describe('copy to clipboard', () => {
      it('should display a readonly input with the page url', async () => {
        expect(await page.$eval('#share-modal #copy [name="url"]', (e: Element) => e.getAttribute('readonly'))).toEqual('readonly')
        expect(await page.$eval('#share-modal #copy [name="url"]', (e: Element) => e.getAttribute('placeholder'))).toEqual(page.url())
      })
    })
  })
})
