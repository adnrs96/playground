<template>
  <div
    id="fired-events"
    class="p-2 bg-gray-10 flex-1"
  >
    <s-text
      v-if="firedEvents.length === 0"
      p="3"
      weight="medium"
      color="text-gray-50"
    >
      {{ `${events.length !== 0 ? 'Events will appear after a story is published...' : 'This story does not handle events...'}` }}
    </s-text>
    <div
      v-for="(e, idx) in firedEvents"
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
        <pre class="text-gray-70">{{ e.text }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IStoryEvent } from '@/models/StorySample.ts'
import SText from '@/components/Text.vue'
import event from '@/event'

@Component({
  name: 'Events',
  components: {
    SText
  }
})
export default class Events extends Vue {
  @Prop({ type: Array, default: () => ([]) }) readonly events!: Array<IStoryEvent> | []
  @Prop({ type: Number, default: 1000 }) readonly eventDelay!: number

  private firedEvents: any[] = []
  private interval: any
  private stopPublishCb: Function | null = null

  mounted () {
    event.$on('published', async (cb: Function) => {
      this.stopPublishCb = cb
      this.firedEvents = []
      let i = 0
      this.interval = setInterval(() => {
        if (this.events.length === 0 || i === this.events.length) {
          cb()
          clearInterval(this.interval)
          return
        }

        this.triggerEvent(this.events[i], i++)
      }, this.eventDelay)
    })
  }

  beforeDestroy () {
    if (this.stopPublishCb !== null) {
      this.stopPublishCb()
    }
    clearInterval(this.interval)
    event.$off('published')
  }

  private triggerEvent (event: IEvent, idx: number) {
    this.firedEvents.unshift({ ...event, open: false, idx })
  }

  private toggle (idx: number) {
    this.firedEvents.map((e: any) => {
      if (e.idx === idx) {
        e.open = !e.open
      }
    })
  }
}
</script>
