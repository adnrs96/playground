import {
  SModal,
  SConfirmationModal
} from '@/components/Modals'

describe('Modals index.spec.ts', () => {
  it('should return Modals components', () => {
    expect(SModal).toBeDefined()
    expect(SConfirmationModal).toBeDefined()
  })
})
