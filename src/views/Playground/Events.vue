<template>
  <div
    id="events"
    class="p-2"
  >
    <s-text
      v-if="events.length === 0"
      p="3"
      weight="medium"
      color="text-gray-50"
    >
      Click publish to see events appear...
    </s-text>
    <div
      v-for="(e, idx) in events"
      :key="`event-${idx}`"
      class="event base-card w-full mb-2 bg-gray-10 shadow-md hover:shadow-none rounded-md cursor-pointer"
      @click="toggle(e.idx)"
    >
      <div class="flex items-center">
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <div class="w-6 h-6">
            <img
              :src="`/img/services/${e.icon}.svg`"
              :alt="`${e.icon} logo`"
            >
          </div>
        </div>
        <div class="flex items-center justify-start w-full p-4">
          <div
            class="flex items-center"
          >
            <s-text
              p="5"
              weight="bold"
              color="text-gray-70"
            >
              {{ e.title }}
            </s-text>
          </div>
        </div>
      </div>
      <div
        :class="{'hidden': !e.open}"
        class="py-4 border-t border-gray-20"
      >
        <pre class="text-gray-70">{{ e.more }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import event from '@/event'

const BASE_EVENT = { icon: 'http', title: 'http', open: false }

@Component({
  name: 'Events',
  components: {
    SText
  }
})
export default class Events extends Vue {
  @Prop({ type: Function, required: true }) readonly event!: Function
  @Prop({ type: Number, default: 3250 }) readonly startAfter!: number

  private interval: any
  private events: any[] = []

  mounted () {
    event.$on('publish', async () => {
      clearInterval(this.interval)
      this.events = []
      let i = 1
      await new Promise(resolve => setTimeout(resolve, this.startAfter))
      this.interval = setInterval(() => this.triggerEvent(this.event, i++), 1000)
    })
  }

  private triggerEvent (fn: Function, idx: number) {
    this.events.unshift({ ...BASE_EVENT, more: fn(idx), idx })
  }

  private toggle (idx: number) {
    this.events.map((e: any) => {
      if (e.idx === idx) {
        e.open = !e.open
      }
    })
  }
}
</script>
