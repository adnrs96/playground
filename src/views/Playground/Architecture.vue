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
      Architecture
    </s-text>
    <perfect-scrollbar class="bg-gray-10 p-8 max-h-xs">
      <!-- zoom-in-enter-active zoom-in-leave-active zoom-in-enter zoom-in-leave-to -->
      <transition-group
        tag="div"
        name="zoom-in"
        class="flex flex-wrap-reverse"
      >
        <div
          v-for="(c, idx) in services"
          v-show="showServices >= idx"
          :key="`card-${idx}`"
          class="card flex items-center bg-white rounded-md w-1/2-gutter-1 mb-2"
          :class="{'mr-2': idx % 2 === 0}"
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
        </div>
      </transition-group>

      <div class="base-card flex items-center w-full mb-2 bg-white rounded-md">
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <s-icon
            icon="cloud-f"
            color="text-indigo-30"
            width="24"
            height="24"
          />
        </div>
        <div class="flex items-center w-full justify-center">
          <s-icon
            icon="story"
            height="18"
            width="18"
          />
          <s-icon
            icon="storyscript"
            color="text-indigo-logo"
            height="14"
            width="82"
            class="ml-2 mt-1"
          />
        </div>
      </div>
      <div class="base-card flex items-center w-full mb-2 bg-white rounded-md">
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <s-icon
            icon="cloud-f"
            color="text-indigo-30"
            width="24"
            height="24"
          />
        </div>
        <div class="flex items-center w-full justify-center">
          <img
            src="/img/services/kubernetes.png"
            srcset="/img/services/kubernetes@2x.png 2x, /img/services/kubernetes@3x.png 3x"
            alt="kubernetes logo"
          >
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
  @Prop({ type: Number, default: 3700 }) readonly startAfter!: number
  @Prop({ type: Number, default: -1 }) readonly serviceDelay!: number

  private showServices: number = -1

  private sleep (time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  mounted () {
    event.$on('publish', async () => {
      this.showServices = -1
      await this.sleep(this.startAfter)
      for (const i in this.services) {
        await this.sleep(this.serviceDelay >= 0 ? this.serviceDelay : 1000)
        this.showServices++
      }
    })
  }
}
</script>
