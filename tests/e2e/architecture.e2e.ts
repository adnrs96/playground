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

  it('should display the base cards', async () => {
    expect.assertions(2)
    await page.waitForSelector('#architecture')
    const card1 = await page.$eval('.base-card .text-base', (e: Element) =>
      e.innerHTML.trim()
    )
    expect(card1).toEqual('Storyscript Orchestrator')
    expect((await page.$$('.base-card')).length).toEqual(2)
  })

  it('should display service cards', async () => {
    expect.assertions(2)

    const icons = await page.evaluate(() => {
      const images = document.querySelectorAll('.card img')
      const urls = Array.from(images).map((v: any) => v.src)
      return urls
    })
    const texts = await page.evaluate(() => {
      const images = document.querySelectorAll('.card .text-xs')
      const texts = Array.from(images).map((v: any) => v.textContent)
      return texts
    })

    expect(icons).toEqual([
      'http://localhost:8080/img/services/redis.svg',
      'http://localhost:8080/img/services/python.svg',
      'http://localhost:8080/img/services/redis.svg',
      'http://localhost:8080/img/services/python.svg'
    ])
    expect(texts).toEqual([ ' Healthy ', ' Not-working ', ' Healthy ', ' Not-working ' ])
  })
})
