import { IStorySample } from '@/models/StorySample'
import counter from '@/samples/counter'

describe('Counter sample', () => {
  it('should export logs', () => {
    expect.assertions(5)
    const sample: IStorySample = counter
    expect(sample).toBeDefined()
    expect(sample.logs).toBeDefined()
    expect(sample.logs.name).toBeDefined()
    expect(sample.logs.files).toBeDefined()
    expect(sample.logs.services).toBeDefined()
  })
})
