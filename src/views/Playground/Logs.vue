<template>
  <div
    id="logs"
    class="overflow-y-auto pt-3 px-6 border-l border-solid border-gray-30"
  >
    <s-text
      p="3"
      weight="semibold"
      color="text-gray-100"
      class="mb-4"
    >
      Logs
    </s-text>
    <pre class="whitespace-pre-wrap"><code class="text-gray-100 font-body text-sm">{{ output }}</code></pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { IStorySample } from '@/models/StorySample'
import SText from '@/components/Text.vue'
import event from '@/event'

const INITIAL_LOGS = ''

@Component({
  name: 'Logs',
  components: {
    SText
  }
})
export default class Logs extends Vue {
  private output: string = INITIAL_LOGS

  @Prop({ type: Object, required: true }) readonly payload!: IStorySample
  @Prop({ type: Number, default: 250 }) readonly startAfter!: number
  @Prop({ type: Number, default: 500 }) readonly dotDelay!: number

  // to unify line delay. If this has value >= 0, line.delay is skipped
  @Prop({ type: Number, default: -1 }) readonly lineDelay!: number

  @Getter('getReleasesCount')
  private releasesCount!: number

  mounted () {
    event.$on('publish', async (cb: Function) => {
      this.output = INITIAL_LOGS
      await this.sleep(this.startAfter)
      await this.writeLogs()
      cb()
    })
  }

  private sleep (time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  private writeLogs (): Promise<void> {
    const tripleDot = () => {
      return new Promise(async resolve => {
        for (let i in [1, 2, 3]) {
          await this.sleep(this.dotDelay)
          this.output += '.'
        }
        resolve()
      })
    }
    const stories = () => {
      if (this.payload.stories.length > 0) {
        this.payload.stories.forEach((f: string) => {
          this.output += `  - ${f}\n`
        })
      }
    }
    const services = async () => {
      if (this.payload.services.length > 0) {
        for (const s in this.payload.services) {
          if (this.payload.services.hasOwnProperty(s)) {
            const e = this.payload.services[s]
            this.output += `  - ${e}\n`
            await this.sleep(this.dotDelay * 2)
          }
        }
      }
    }
    const lines = [
      { delay: 0, text: 'Compiling Stories' },
      { delay: 0, fn: 'tripleDot' },
      { delay: 250, text: `\n✔ Compiled ${this.payload.stories.length} story\n\n` },
      { delay: 0, text: `Deploying app ${this.payload.name}` },
      { delay: 0, fn: 'tripleDot' },
      { delay: 250, text: `\n  ✔ Version ${this.releasesCount} of your app has been queued for deployment.\n\n` },
      { delay: 100, text: '  Waiting for deployment to complete...\n' },
      { delay: 0, text: `  ✔ Configured ${this.payload.stories.length} story\n` },
      { delay: 100, fn: 'stories' },
      { delay: 0, text: `  ✔ Deployed ${this.payload.services.length} services\n` },
      { delay: 100, fn: 'services' },
      { delay: 100, text: '  ✔ Created ingress route\n' },
      { delay: 100, text: '  ✔ Configured logging\n' },
      { delay: 100, text: '  ✔ Configured health checks\n' },
      { delay: 100, text: '  ✔ Deployment successful!\n' }
    ]
    return new Promise(async resolve => {
      for (let l of lines) {
        if ((l as any).text) {
          this.output += (l as any).text
        } else {
          switch ((l as any).fn) {
            case 'tripleDot':
              await tripleDot()
              break
            case 'stories':
              stories()
              break
            case 'services':
              await services()
              break
          }
        }
        await this.sleep(this.lineDelay >= 0 ? this.lineDelay : (l as any).delay)
      }
      resolve()
    })
  }
}
</script>
