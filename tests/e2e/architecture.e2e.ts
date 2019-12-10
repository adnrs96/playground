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
    await page.waitForSelector('#architecture')
    expect(await page.$('#architecture')).toBeTruthy()
  })

  it('should display service cards', async () => {
    expect.assertions(3)

    await page.click('#publish-btn')
    await page.waitFor(15000)

    const icons = await page.evaluate(() => {
      const images = document.querySelectorAll('#architecture .card img')
      const urls = Array.from(images).map((v: any) => v.src)
      return urls
    })
    const texts = await page.evaluate(() => {
      const images = document.querySelectorAll('#architecture .card .text-xs')
      const texts = Array.from(images).map((v: any) => v.textContent.trim())
      return texts
    })

    expect(icons).toEqual([
      `${TEST_URL}/img/services/redis.svg`,
      `${TEST_URL}/img/services/http.svg`
    ])
    expect(texts).toEqual(['Staged', 'Healthy', 'Staged', 'Healthy'])
    expect((await page.$eval('#publish-btn', (btn: Element) => btn.classList.contains('cursor-pointer')))).toBeTruthy()
  })
})
