import puppeteer from 'puppeteer'
import { percySnapshot } from '@percy/puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Logs', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/example/counter?skipIntro=true`)
    await page.waitForSelector('#register-interest')
  })

  afterAll(() => {
    browser.close()
  })

  /**
   * Given I navigate to the studio,
   * Then I see a “Register Interest” button
   */
  it('should display the button in the navbar', async () => {
    expect.assertions(1)
    expect(await page.$('#new-from-tpl-btn')).toBeTruthy()
  })

  /**
   * And When I click the button
   * Then I am taken to a form where I can provide my name and email
   */
  it('should display a form in a modal when I click the button', async () => {
    expect.assertions(6)
    await page.click('#new-from-tpl-btn')
    const tip = await page.$eval('#new-from-tpl-btn>.content>div>p', (e: Element) => e.innerHTML)
    expect(tip.trim()).toEqual('Write a new Story starting from this template.')
    await new Promise(resolve => setTimeout(resolve, 500))
    expect((await page.$$('#new-from-tpl-btn>.content')).length).toEqual(0)
    expect(await page.$('#register-interest-form')).toBeTruthy()

    expect((await page.$$('#register-interest input')).length).toEqual(3)
    expect((await page.$$eval('#register-interest input', (nodes: any) => nodes.map((n: any) => n.type)))).toEqual(['text', 'email', 'text'])
    expect((await page.$$eval('#register-interest input', (nodes: any) => nodes.map((n: any) => n.name)))).toEqual(['form-name', 'email', 'comment'])
    await percySnapshot(page, 'Studio NewFromTemplate RegisterInterest Modal')
  })

  it('should display a some errors when I enter wrong info', async () => {
    expect.assertions(2)
    await page.waitFor(250)
    await page.type('[name="comment"]', 'x')
    await page.type('[name="email"]', 'x')

    expect((await page.$$('#register-interest .text-red-70')).length).toEqual(1)
    expect((await page.$$eval('#register-interest .text-red-70', (nodes: any) => nodes.map((n: any) => n.textContent.trim())))).toEqual(['Email is invalid.'])
  })

  /**
   * And When I submit the form
   * Then I receive an email from Storyscript thanking me etc
   */
  it('should close the modal and clear the inputs when submitted', async () => {
    expect.assertions(1)
    if (page.url().indexOf('localhost') === -1) {
      await page.click('[name="email"]', { clickCount: 3 })
      await page.type('[name="email"]', 'storyscript.e2e@gmail.com')
      await page.click('[name="comment"]', { clickCount: 3 })
      await page.type('[name="comment"]', 'storyscript-e2e')
      await page.click('#register-interest-submit-btn')
      await page.waitFor(2000)
      expect((await page.waitForSelector('#register-interest-blur', { hidden: true }))).toBeTruthy()
    } else {
      expect(true).toBeTruthy()
    }
  })
})
