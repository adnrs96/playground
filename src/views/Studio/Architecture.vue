<template>
  <div
    id="architecture"
    class="w-full"
  >
    <s-text
      p="3"
      weight="semibold"
      color="text-gray-100"
      class="bg-white pl-8 py-1 flex items-center border-t border-b border-gray-20"
    >
      Services
    </s-text>
    <perfect-scrollbar class="bg-gray-10 p-8 max-h-xs flex flex-wrap">
      <div
        v-for="(c, idx) in services"
        :key="`card-${idx}`"
        class="card flex items-center bg-white rounded-md w-1/3-gutter-1 mb-2 transition-all-faster"
        :class="{
          'mr-2': (idx + 1) % 3 !== 0,
          'bg-white': showServices !== idx || !blink,
          'bg-green-20': showServices === idx && blink
        }"
      >
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <div class="w-6 h-6">
            <img
              :src="`/img/services/${c}.svg`"
              :alt="`${c} logo`"
            >
          </div>
        </div>
        <div class="flex items-center justify-end w-full p-4">
          <div
            v-show="showServices < idx"
            class="flex items-center"
          >
            <s-text
              p="5"
              weight="bold"
              color="text-yellow-60"
            >
              Staged
            </s-text>
            <s-icon
              icon="error-warning-f"
              color="text-yellow-60"
              class="ml-3"
              width="24"
              height="24"
            />
          </div>
          <transition name="zoom-in">
            <div
              v-show="showServices >= idx"
              class="flex items-center"
            >
              <s-text
                p="5"
                weight="bold"
                color="text-green-70"
              >
                Healthy
              </s-text>
              <s-icon
                icon="check"
                color="text-green-50"
                class="bg-green-10 border border-green-30 rounded-full w-6 h-6 flex items-center justify-center ml-3"
              />
            </div>
          </transition>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import PerfectScrollbar from '@/components/PerfectScrollbar.vue'
import event from '@/event'

@Component({
  name: 'Architecture',
  components: {
    PerfectScrollbar,
    SText,
    SIcon
  }
})
export default class Architecture extends Vue {
  @Prop({ type: Array, default: [] }) readonly services!: Array<string>
  @Prop({ type: Number, default: 250 }) readonly startAfter!: number
  @Prop({ type: Number, default: -1 }) readonly serviceDelay!: number

  private showServices = -1
  private blink = false
  private destroyed = false
  private stopPublishCb: Function | null = null

  private sleep (time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  mounted () {
    event.$on('publish', async (cb: Function) => {
      this.stopPublishCb = cb
      const publish = () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
          this.showServices = -1
          await this.sleep(this.startAfter)
          for (let i = 0; i < this.services.length; i++) {
            await this.sleep(this.serviceDelay >= 0 ? this.serviceDelay : 500)
            this.showServices++
            this.blink = true
            setTimeout(() => {
              this.blink = false
            }, 200)
            await this.sleep(this.serviceDelay >= 0 ? this.serviceDelay : 500)
          }
          resolve()
          this.showServices++
        })
      }
      await publish()
      if (!this.destroyed) {
        event.$emit('published', cb)
      }
    })
  }

  beforeDestroy () {
    if (this.stopPublishCb !== null) {
      this.stopPublishCb()
    }
    this.destroyed = true
    event.$off('publish')
  }
}
</script>
