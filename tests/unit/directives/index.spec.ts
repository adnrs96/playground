import { directives } from '@/directives'

describe('Directives index.spec.ts', () => {
  it('should return directives', () => {
    for (const d in directives) {
      expect(d).toBeTruthy()
    }
  })
})
