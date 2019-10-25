import {
  SInput,
  SLabeledInput,
  SKeyValueInput,
  SSelectInput,
  SCheckboxInput
} from '@/components/Inputs'

describe('Inputs index.spec.ts', () => {
  it('should return Inputs components', () => {
    expect(SInput).toBeDefined()
    expect(SLabeledInput).toBeDefined()
    expect(SKeyValueInput).toBeDefined()
    expect(SSelectInput).toBeDefined()
    expect(SCheckboxInput).toBeDefined()
  })
})
