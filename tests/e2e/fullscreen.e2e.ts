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
    await page.waitForSelector('#enter-fullscreen')
    expect(await page.$('#enter-fullscreen')).toBeTruthy()
  })

  it('should handle fullscreen', async () => {
    expect.assertions(15)
    // INITIAL STATE
    let leftColClasses = await page.$eval('#left-col', (d: Element) => d.classList)
    let rightColClasses = await page.$eval('#right-col', (d: Element) => d.classList)
    let bottomContainerClasses = await page.$eval('#bottom-container', (d: Element) => d.classList)
    expect(Object.values(leftColClasses)).toContain('w-2/3')
    expect(Object.values(rightColClasses)).toContain('w-1/3')
    expect(Object.values(bottomContainerClasses)).not.toContain('h-0')

    // GOING FULLSCREEN
    await page.click('#enter-fullscreen')
    leftColClasses = await page.$eval('#left-col', (d: Element) => d.classList)
    rightColClasses = await page.$eval('#right-col', (d: Element) => d.classList)
    bottomContainerClasses = await page.$eval('#bottom-container', (d: Element) => d.classList)
    expect(Object.values(leftColClasses)).toContain('w-full')
    expect(Object.values(rightColClasses)).toContain('w-0')
    expect(Object.values(bottomContainerClasses)).toContain('h-0')

    // EXITING FULLSCREEN WITH BUTTON
    await page.click('#exit-fullscreen')
    leftColClasses = await page.$eval('#left-col', (d: Element) => d.classList)
    rightColClasses = await page.$eval('#right-col', (d: Element) => d.classList)
    bottomContainerClasses = await page.$eval('#bottom-container', (d: Element) => d.classList)
    expect(Object.values(leftColClasses)).toContain('w-2/3')
    expect(Object.values(rightColClasses)).toContain('w-1/3')
    expect(Object.values(bottomContainerClasses)).not.toContain('h-0')

    // GOING FULLSCREEN AGAIN
    await page.click('#enter-fullscreen')
    leftColClasses = await page.$eval('#left-col', (d: Element) => d.classList)
    rightColClasses = await page.$eval('#right-col', (d: Element) => d.classList)
    bottomContainerClasses = await page.$eval('#bottom-container', (d: Element) => d.classList)
    expect(Object.values(leftColClasses)).toContain('w-full')
    expect(Object.values(rightColClasses)).toContain('w-0')
    expect(Object.values(bottomContainerClasses)).toContain('h-0')

    // EXITING FULLSCREEN WITH ESC KEY
    await page.keyboard.up('Escape')
    leftColClasses = await page.$eval('#left-col', (d: Element) => d.classList)
    rightColClasses = await page.$eval('#right-col', (d: Element) => d.classList)
    bottomContainerClasses = await page.$eval('#bottom-container', (d: Element) => d.classList)
    expect(Object.values(leftColClasses)).toContain('w-2/3')
    expect(Object.values(rightColClasses)).toContain('w-1/3')
    expect(Object.values(bottomContainerClasses)).not.toContain('h-0')
  })
})
