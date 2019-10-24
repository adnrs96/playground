import { IStorySample } from '@/models/StorySample'
import counter from '@/samples/counter'

describe('Counter sample', () => {
  it('should export logs', () => {
    expect.assertions(2)
    const sample: IStorySample = counter
    expect(sample).toBeDefined()
    expect(sample.logs).toBeDefined()
  })
})
