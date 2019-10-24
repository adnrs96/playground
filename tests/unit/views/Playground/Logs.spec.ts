import { shallowMount, Wrapper } from '@vue/test-utils'
import Logs from '@/views/Playground/Logs.vue'

describe('Sample Logs', () => {
  let logs: Wrapper<Logs>
  let vm: any

  beforeEach(() => {
    logs = shallowMount(Logs, {
      propsData: {
        logs: 'toto'
      }
    })
    vm = logs.vm as any
  })

  afterEach(() => {
    logs.destroy()
  })

  it('should mount with the required props', () => {
    expect.assertions(2)
    expect(logs.html()).toBeDefined()
    expect(vm).toHaveProperty('logs', 'toto')
  })
})
