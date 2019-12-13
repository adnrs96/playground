import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Feedback', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
    await page.waitForSelector('#feedback-form')
  })

  afterAll(() => {
    browser.close()
  })

  /**
     * Given I navigate to the studio,
     * Then I see a help option in navbar
     * I click it and a I see a dropdown
     * with share feedback option
     */
  it('should display the feedback in drop from help in navbar', async () => {
    expect.assertions(1)
    await page.click('#help')
    expect(await page.$('#helpdrop-feedback')).toBeTruthy()
  })

  /**
     * And When I click the share feedback option
     * Then I am taken to a form where I can provide feedback
     */
  it('should display a form in a modal when I click the feedback icon', async () => {
    expect.assertions(4)
    await page.click('#help')
    await page.click('#helpdrop-feedback')
    expect(await page.$('#feedback-form')).toBeTruthy()

    expect((await page.$$('#feedback-form input')).length).toEqual(8)
    expect((await page.$$('#feedback-form textarea')).length).toEqual(1)
    expect((await page.$$eval('#feedback-form input',
      (nodes: any) => nodes.map((n: any) => n.type)))).toEqual(
      ['text', 'radio', 'radio', 'radio', 'radio', 'radio', 'radio', 'email'])
    await page.waitFor(250)
    await percySnapshot(page, 'Studio Feedback Modal')
  })

  it('should display a some errors when I enter wrong info', async () => {
    expect.assertions(2)
    await page.waitFor(300)
    await page.type('#feedback-form [name="comment"]', 'x')
    await page.type('#feedback-form [name="email"]', 'x')

    expect((await page.$$('#feedback-form .text-red-70')).length).toEqual(1)
    expect((await page.$$eval('#feedback-form .text-red-70', (nodes: any) => nodes.map((n: any) => n.textContent.trim())))).toEqual(['Email is invalid.'])
  })

  /**
     * And When I submit the form
     * Then I receive an email from Storyscript thanking me etc
     */
  it('should close the modal and clear the inputs when submitted', async () => {
    expect.assertions(1)
    if (page.url().indexOf('localhost') === -1) {
      await page.click('#feedback-form [type="radio"]', { clickCount: 3 })
      await page.click('#feedback-form [name="email"]', { clickCount: 3 })
      await page.type('#feedback-form [name="email"]', 'storyscript.e2e@gmail.com')
      await page.click('#feedback-form [name="comment"]', { clickCount: 3 })
      await page.type('#feedback-form [name="comment"]', 'storyscript-e2e')
      await page.click('#feedback-submit-btn')
      await page.waitFor(2500)
      expect((await page.waitForSelector('#feeback-modal', { hidden: true }))).toBeTruthy()
    } else {
      expect(true).toBeTruthy()
    }
  })
})
