describe('router.ts', () => {
  it('should have routes', () => {
    const router = require('@app/router')
    expect(router.default.options.routes).toBeDefined()
  })
})
