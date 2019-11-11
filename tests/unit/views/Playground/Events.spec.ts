import Events from '@/views/Playground/Events.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'
import event from '@/event'

describe('Events.vue', () => {
  let events: Wrapper<Events>
  let vm: any
  const eventFn = (idx: number) => `toto ${idx}`

  beforeEach(() => {
    events = shallowMount(Events, {
      propsData: {
        event: eventFn,
        startAfter: 0,
        eventDelay: 0
      }
    })
    vm = events.vm as any
  })

  afterEach(() => {
    events.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(events.html()).toBeTruthy()
  })

  describe('.triggerEvent(fn, idx)', () => {
    it('should add event to the event array', () => {
      expect.assertions(1)
      vm.triggerEvent(eventFn, 2)
      expect(vm).toHaveProperty('events', [{ icon: 'http', title: 'http', open: false, more: 'toto 2', idx: 2 }])
    })
  })

  describe('.toggle(idx)', () => {
    it('should add open to the 2nd event', () => {
      expect.assertions(1)
      vm.events = [
        { icon: 'http', title: 'http', open: false, more: 'toto 1', idx: 1 },
        { icon: 'http', title: 'http', open: false, more: 'toto 2', idx: 2 },
        { icon: 'http', title: 'http', open: false, more: 'toto 3', idx: 3 }
      ]

      vm.toggle(2)
      expect(vm).toHaveProperty('events', [
        { icon: 'http', title: 'http', open: false, more: 'toto 1', idx: 1 },
        { icon: 'http', title: 'http', open: true, more: 'toto 2', idx: 2 },
        { icon: 'http', title: 'http', open: false, more: 'toto 3', idx: 3 }
      ])
    })
  })

  describe('event.$on(publish)', () => {
    it('should add 5 events then call the callback', async () => {
      expect.assertions(2)
      const fakeCb = jest.fn()

      event.$emit('publish', fakeCb)
      await new Promise(resolve => setTimeout(resolve, 1000))
      expect(fakeCb).toHaveBeenCalled()
      expect(vm).toHaveProperty('events', [
        {
          icon: 'http',
          title: 'http',
          open: false,
          more: 'toto 5',
          idx: 5
        },
        {
          icon: 'http',
          title: 'http',
          open: false,
          more: 'toto 4',
          idx: 4
        },
        {
          icon: 'http',
          title: 'http',
          open: false,
          more: 'toto 3',
          idx: 3
        },
        {
          icon: 'http',
          title: 'http',
          open: false,
          more: 'toto 2',
          idx: 2
        },
        {
          icon: 'http',
          title: 'http',
          open: false,
          more: 'toto 1',
          idx: 1
        }
      ])
    })
  })
})
