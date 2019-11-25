import puppeteer from 'puppeteer'
import samples from '@/samples'
import { IStorySample } from '@/models/StorySample'

const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Welcome', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
  })

  beforeEach(async () => {
    await page.goto(`${TEST_URL}/welcome`)
    await page.waitForSelector('#welcome')
  })

  afterAll(() => {
    browser.close()
  })

  it('should display', async () => {
    expect.assertions(1)
    expect(await page.$('#welcome')).toBeTruthy()
  })

  it('should display the good amount of cards', async () => {
    const count = Object.keys(samples).length
    const cards = await page.$$('.sample-card')

    expect.assertions(1)
    expect(cards.length).toEqual(count)
  })

  describe('the card contents', () => {
    for (const sample of Object.values(samples)) {
      const base: IStorySample = sample as IStorySample

      it(`should display the ${base.name} example content in a card`, async () => {
        const title = await page.$eval(`#sample-card-${base.id} .title`, (e: Element) => e.innerHTML.trim())
        const description = await page.$eval(`#sample-card-${base.id} .description`, (e: Element) => e.innerHTML.trim())

        expect.assertions(2)
        expect(title).toEqual(`${base.name}`)
        expect(description).toEqual(base.description)
      })

      it(`should redirect to the ${base.name} story`, async () => {
        expect.assertions(1)
        await page.click(`#explore-${base.id}`)
        await page.waitForSelector('#studio')
        expect(page.url()).toEqual(`${TEST_URL}/example/${base.id}`)
      })
    }
  })

  it('navbar logo should redirect to the welcome page', async () => {
    expect.assertions(1)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
    await page.waitForSelector('#home-btn-logo')
    await page.click('#home-btn-logo')
    await page.waitForSelector('#welcome')
    expect(await page.url()).toEqual(`${TEST_URL}/welcome`)
  })
})
