import {
  SInput,
  SLabeledInput
} from '@/components/Inputs'

describe('Inputs index.spec.ts', () => {
  it('should return Inputs components', () => {
    expect(SInput).toBeDefined()
    expect(SLabeledInput).toBeDefined()
  })
})
