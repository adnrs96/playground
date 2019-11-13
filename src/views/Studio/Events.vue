<template>
  <div
    id="events"
    class="p-2 bg-gray-10 flex-1"
  >
    <s-text
      v-if="events.length === 0"
      p="3"
      weight="medium"
      color="text-gray-50"
    >
      {{ `${event ? 'Events will appear after a story is published...' : 'This story does not handle events...'}` }}
    </s-text>
    <div
      v-for="(e, idx) in events"
      :key="`event-${idx}`"
      class="event base-card w-full bg-white hover:bg-indigo-10 mb-2 shadow-md rounded-md cursor-pointer"
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
  @Prop({ type: Function, default: undefined }) readonly event!: Function | undefined
  @Prop({ type: Number, default: 1000 }) readonly eventDelay!: number

  private events: any[] = []
  private interval: any

  mounted () {
    event.$on('published', async (cb: Function) => {
      this.events = []
      let i = 1
      this.interval = setInterval(() => {
        if (this.event !== undefined) {
          this.triggerEvent(this.event, i)
          i++
        } else {
          i = 6
        }
        if (i === 6) {
          cb()
          clearInterval(this.interval)
        }
      }, this.eventDelay)
    })
  }

  beforeDestroy () {
    clearInterval(this.interval)
    event.$off('published')
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
