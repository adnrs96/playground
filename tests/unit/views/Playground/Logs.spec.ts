import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import Logs from '@/views/Playground/Logs.vue'
import StoreLogs from '@/store/modules/Logs'
import counter from '@/samples/counter'
import Vuex, { Store } from 'vuex'
import event from '@/event'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Plaground::Logs', () => {
  let logs: Wrapper<Logs>
  let vm: any
    let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(StoreLogs)
    logs = shallowMount(Logs, {
      propsData: {
        logs: counter.logs,
        name: counter.name
      },
      store,
      localVue
    })
    vm = logs.vm as any
  })

  afterEach(() => {
    logs.destroy()
  })

  it('should mount with the required props', () => {
    expect.assertions(2)
    expect(logs.html()).toBeDefined()
    expect(vm).toHaveProperty('logs', counter.logs)
  })

  describe('.writeLogs()', () => {
    it('should append the logs to the output', async () => {
      expect.assertions(11)
      await vm.writeLogs()
      expect(/Compiling Stories\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Compiled [\d]+ story/.test(vm.output)).toBeTruthy()
      expect(/Deploying app [\w]{1,25}\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Version [\d]+ of your app has been queued for deployment\./.test(vm.output)).toBeTruthy()
      expect(/Waiting for deployment to complete\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Configured [\d]+ story/.test(vm.output)).toBeTruthy()
      expect(/✔ Deployed [\d]+ services/.test(vm.output)).toBeTruthy()
      expect(/✔ Created ingress route/.test(vm.output)).toBeTruthy()
      expect(/✔ Configured logging/.test(vm.output)).toBeTruthy()
      expect(/✔ Configured health checks/.test(vm.output)).toBeTruthy()
      expect(/✔ Deployment successful!/.test(vm.output)).toBeTruthy()
    })

    it('should use a custom timer', async () => {
      expect.assertions(14)
      await vm.writeLogs(25)
      expect(/Compiling Stories\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Compiled 1 story/.test(vm.output)).toBeTruthy()
      expect(/Deploying app [\w]{1,25}\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Version [\d]+ of your app has been queued for deployment\./.test(vm.output)).toBeTruthy()
      expect(/Waiting for deployment to complete\.\.\./.test(vm.output)).toBeTruthy()
      expect(/✔ Configured 1 story/.test(vm.output)).toBeTruthy()
      expect(/- counter/.test(vm.output)).toBeTruthy()
      expect(/✔ Deployed 2 services/.test(vm.output)).toBeTruthy()
      expect(/- http/.test(vm.output)).toBeTruthy()
      expect(/- redis/.test(vm.output)).toBeTruthy()
      expect(/✔ Created ingress route/.test(vm.output)).toBeTruthy()
      expect(/✔ Configured logging/.test(vm.output)).toBeTruthy()
      expect(/✔ Configured health checks/.test(vm.output)).toBeTruthy()
      expect(/✔ Deployment successful!/.test(vm.output)).toBeTruthy()
    })

    it('should not print the files when none was provided', async () => {
      expect.assertions(2)
      vm.logs.files = []
      await vm.writeLogs()
      expect(/✔ Compiled 0 story/.test(vm.output)).toBeTruthy()
      expect(/- counter/.test(vm.output)).toBeFalsy()
    })

    it('should not print the services when none was provided', async () => {
      expect.assertions(3)
      vm.logs.services = []
      await vm.writeLogs()
      expect(/✔ Deployed 0 services/.test(vm.output)).toBeTruthy()
      expect(/- http/.test(vm.output)).toBeFalsy()
      expect(/- redis/.test(vm.output)).toBeFalsy()
    })
  })

  describe(`event.$on('deploy')`, () => {
    it('should append all the logs', async () => {
      jest.setTimeout(15000)
      expect.assertions(2)
      const fakeCb = jest.fn()
      vm.writeLogs = jest.fn()
      event.$emit('deploy', fakeCb)
      await new Promise(resolve => setTimeout(resolve, 10000))
      expect(vm.writeLogs).toHaveBeenCalled()
      expect(fakeCb).toHaveBeenCalled()
    })
  })
})
