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
  })

  afterAll(() => {
    browser.close()
  })

  it('should display', async () => {
    expect.assertions(1)
    await page.waitForSelector('#logs')
    expect(await page.$('#logs')).toBeTruthy()
  })

  it('should only have a prompt at startup', async () => {
    expect.assertions(1)
    await page.waitForSelector('#logs')
    const logs = await page.$eval('#logs>pre>code', (e: Element) => e.innerHTML)
    expect(logs).toEqual('')
  })

  it('should deplay the good sample after clicking on the deploy button', async () => {
    expect.assertions(11)
    await page.waitForSelector('#deploy-btn')
    await page.click('#deploy-btn')
    await page.waitFor(10000)
    const logs = await page.$eval('#logs>pre>code', (e: Element) => e.innerHTML)
    expect(/Compiling Stories\.\.\./.test(logs)).toBeTruthy()
    expect(/✔ Compiled [\d]+ story/.test(logs)).toBeTruthy()
    expect(/Deploying app [\w]{1,25}\.\.\./.test(logs)).toBeTruthy()
    expect(/✔ Version [\d]+ of your app has been queued for deployment\./.test(logs)).toBeTruthy()
    expect(/Waiting for deployment to complete\.\.\./.test(logs)).toBeTruthy()
    expect(/✔ Configured [\d]+ story/.test(logs)).toBeTruthy()
    expect(/✔ Deployed [\d]+ services/.test(logs)).toBeTruthy()
    expect(/✔ Created ingress route/.test(logs)).toBeTruthy()
    expect(/✔ Configured logging/.test(logs)).toBeTruthy()
    expect(/✔ Configured health checks/.test(logs)).toBeTruthy()
    expect(/✔ Deployment successful!/.test(logs)).toBeTruthy()
  })
})
