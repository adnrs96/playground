import puppeteer from 'puppeteer'
import samples from '@/samples'
import { IStorySampleTip } from '&/StorySample'

const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Welcome', () => {
  let page: any
  let browser: any
  const sample = samples.counter

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter`)
    await page.waitForSelector('#intro-layer')
  })

  afterAll(() => {
    browser.close()
  })

  it('should display', async () => {
    expect.assertions(1)
    expect(await page.$('#intro-layer')).toBeTruthy()
  })

  it('should display give an intro to the user', async () => {
    const tips: IStorySampleTip[] = sample.tips
    expect.assertions(tips.length + 1)
    for (const t of tips) {
      await page.waitForSelector(`#tip-${t.name}`)
      await page.click(`#tip-${t.name}`)
      await page.waitForSelector(`#tip-${t.name} .content`)
      expect(await page.$eval('#tip-content', (e: Element) => e.innerHTML.trim())).toEqual(t.text)
      await page.click('#next-tip')
    }
    await page.waitFor(300)
    expect(await page.$('#intro-layer')).toBeNull()
  })
})
