import { register, directives } from '@/directives'

describe('Directives index.spec.ts', () => {
  it('should return directives', () => {
    for (let d in directives) {
      expect(d).toBeTruthy()
    }
  })
})
