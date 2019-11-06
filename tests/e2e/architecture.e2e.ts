import puppeteer from 'puppeteer'
import { emit } from 'cluster'
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
    expect.assertions(2)

    await page.click('#deploy-btn')
    await page.waitFor(10000)

    const icons = await page.evaluate(() => {
      const images = document.querySelectorAll('.card img')
      const urls = Array.from(images).map((v: any) => v.src)
      return urls
    })
    const texts = await page.evaluate(() => {
      const images = document.querySelectorAll('.card .text-xs')
      const texts = Array.from(images).map((v: any) => v.textContent.trim())
      return texts
    })

    expect(icons).toEqual([
      'http://localhost:8080/img/services/http.svg',
      'http://localhost:8080/img/services/redis.svg'
    ])
    expect(texts).toEqual([ 'Healthy', 'Healthy' ])
  })
})
