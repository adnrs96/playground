import { IStorySample } from '@/models/StorySample'
import counter from '@/samples/counter'

describe('Counter sample', () => {
  it('should export logs', () => {
    expect.assertions(6)
    const sample: IStorySample = counter
    expect(sample).toBeDefined()
    expect(sample.name).toBeDefined()
    expect(sample.files).toBeDefined()
    expect(sample.services).toBeDefined()
    expect(sample.code).toBeDefined()
    expect(sample.description).toBeDefined()
  })
})
