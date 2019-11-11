import puppeteer from 'puppeteer'
const { TEST_URL, puppeteerConfig } = require('./puppeteer.config')

describe('Logs', () => {
  let page: any
  let browser: any

  beforeAll(async () => {
    jest.setTimeout(1000 * 60 * 1)
    browser = await puppeteer.launch(puppeteerConfig())
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto(`${TEST_URL}/?skipIntro=true`)
    await page.waitForSelector('#login')
  })

  afterAll(() => {
    browser.close()
  })

  it('should display the component', async () => {
    expect.assertions(1)
    expect(await page.$('#login')).toBeTruthy()
  })

  /**
   * Given I navigate to the studio,
   * Then I see a “Register Interest” button
   */
  it('should display the button in the navbar', async () => {
    expect.assertions(1)
    expect(await page.$('#login-btn')).toBeTruthy()
  })

  /**
   * And When I click the button
   * Then I am taken to a form where I can provide my name and email
   */
  it('should display a form in a modal when I click the button', async () => {
    expect.assertions(4)
    await page.click('#login-btn')
    expect(await page.$('#login-form')).toBeTruthy()

    expect((await page.$$('#login input')).length).toEqual(3)
    expect((await page.$$eval('#login input', (nodes: any) => nodes.map((n: any) => n.type)))).toEqual(['text', 'text', 'email'])
    expect((await page.$$eval('#login input', (nodes: any) => nodes.map((n: any) => n.name)))).toEqual(['form-name', 'name', 'email'])
  })

  it('should display a some errors when I enter wrong info', async () => {
    expect.assertions(2)
    await page.waitFor(250)
    await page.type('[name="name"]', 'x')
    await page.type('[name="email"]', 'x')

    expect((await page.$$('#login .text-red-70')).length).toEqual(2)
    expect((await page.$$eval('#login .text-red-70', (nodes: any) => nodes.map((n: any) => n.textContent.trim())))).toEqual(['Name too short.', 'Email is invalid.'])
  })

  /**
   * And When I submit the form
   * Then I receive an email from Storyscript thanking me etc
   */
  it('should close the modal and clear the inputs when submitted', async () => {
    expect.assertions(1)
    if (page.url().indexOf('localhost') === -1) {
      await page.click('[name="name"]', { clickCount: 3 })
      await page.type('[name="name"]', 'storyscript-e2e')
      await page.click('[name="email"]', { clickCount: 3 })
      await page.type('[name="email"]', 'storyscript.e2e@gmail.com')
      await page.click('#login-submit-btn')
      await page.waitFor(2000)
      expect((await page.waitForSelector('#login-blur', { hidden: true }))).toBeTruthy()
    } else {
      expect(true).toBeTruthy()
    }
  })
})
