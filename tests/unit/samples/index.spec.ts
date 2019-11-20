import { IStorySample } from '@/models/StorySample'
import samples from '@/samples'

describe('Counter sample', () => {
  it('should export', () => {
    expect.assertions(Object.keys(samples).length * 6)

    for (const s in samples) {
      const e: IStorySample = samples[s]
      expect(e).toBeDefined()
      expect(e.name).toBeDefined()
      expect(e.stories).toBeDefined()
      expect(e.services).toBeDefined()
      expect(e.code).toBeDefined()
      expect(e.description).toBeDefined()
    }
  })
})
