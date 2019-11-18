import Events from '@/views/Studio/Events.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'
import event from '@/event'

describe('Events.vue', () => {
  let events: Wrapper<Events>
  let vm: any
  const testEvents = [
    {
      icon: 'foo-0',
      title: 'bar',
      text: 'baz'
    },
    {
      icon: 'foo-1',
      title: 'bar',
      text: 'baz'
    },
    {
      icon: 'foo-2',
      title: 'bar',
      text: 'baz'
    },
    {
      icon: 'foo-3',
      title: 'bar',
      text: 'baz'
    },
    {
      icon: 'foo-4',
      title: 'bar',
      text: 'baz'
    }
  ]

  beforeEach(() => {
    events = shallowMount(Events, {
      propsData: {
        events: testEvents,
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
      vm.triggerEvent(testEvents[0], 0)
      expect(vm).toHaveProperty('firedEvents', [{ icon: 'foo-0', title: 'bar', open: false, text: 'baz', idx: 0 }])
    })
  })

  describe('.toggle(idx)', () => {
    it('should add open to the 2nd event', () => {
      expect.assertions(1)
      vm.firedEvents = [
        { icon: 'http', title: 'http', open: false, more: 'toto 1', idx: 1 },
        { icon: 'http', title: 'http', open: false, more: 'toto 2', idx: 2 },
        { icon: 'http', title: 'http', open: false, more: 'toto 3', idx: 3 }
      ]

      vm.toggle(2)
      expect(vm).toHaveProperty('firedEvents', [
        { icon: 'http', title: 'http', open: false, more: 'toto 1', idx: 1 },
        { icon: 'http', title: 'http', open: true, more: 'toto 2', idx: 2 },
        { icon: 'http', title: 'http', open: false, more: 'toto 3', idx: 3 }
      ])
    })
  })

  describe('event.$on(publish)', () => {
    it('should add 5 events as a stack', async () => {
      expect.assertions(1)
      const fakeCb = jest.fn()

      event.$emit('published', fakeCb)
      await new Promise(resolve => setTimeout(resolve, 1000))
      expect(vm).toHaveProperty('firedEvents', [
        {
          icon: 'foo-4',
          title: 'bar',
          text: 'baz',
          open: false,
          idx: 4
        },
        {
          icon: 'foo-3',
          title: 'bar',
          text: 'baz',
          open: false,
          idx: 3
        },
        {
          icon: 'foo-2',
          title: 'bar',
          text: 'baz',
          open: false,
          idx: 2
        },
        {
          icon: 'foo-1',
          title: 'bar',
          text: 'baz',
          open: false,
          idx: 1
        },
        {
          icon: 'foo-0',
          title: 'bar',
          text: 'baz',
          open: false,
          idx: 0
        }
      ])
    })
  })
})
