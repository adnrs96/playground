import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('EditorErrors', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
    await page.waitForSelector('#editor-pane')
  })

  afterAll(() => {
    browser.close()
  })

  /**
       * Given I navigate to the studio,
       * Then I see a info metadata in InfosPane
       * head.
       */
  it('should display the sugguestion/error count', async () => {
    expect.assertions(1)
    expect(await page.$('#infos-counter')).toBeTruthy()
  })

  /**
       * And When I edit the code and SLS reports a error
       * I see a error card.
       */
  it('should display a error card on error', async () => {
    expect.assertions(2)
    const context = await page.mainFrame().executionContext()
    await context.evaluateHandle('monaco.editor.getModels()[0].setValue("http")')
    // Long wait here since API call involved.
    await page.waitFor(2500)
    expect(await page.$eval('#infos-counter', (e: Element) => e.textContent?.trim())).toEqual('0 Suggestions, 1 Error')
    expect((await page.$$('#infos-pane [name^="error-brick"]')).length).toEqual(1)
    await percySnapshot(page, 'Studio Editor Error')
  })
})
