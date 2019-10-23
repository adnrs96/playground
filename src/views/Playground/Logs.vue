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
import SText from '@/components/Text.vue'
import { IStoryLogs } from '@/models/StorySample'
import event from '@/event'

const INITIAL_LOGS = '$> '

@Component({
  name: 'Logs',
  components: {
    SText
  }
})
export default class Logs extends Vue {
  private output: string = INITIAL_LOGS

  @Prop({ type: Object, required: true }) readonly logs!: IStoryLogs

  @Getter('getReleasesCount')
  private releasesCount!: number

  mounted () {
    event.$on('deploy', async (cb: Function) => {
      this.output = INITIAL_LOGS
      await this.writeCmd()
      await this.sleep(500)
      await this.writeLogs()
      cb()
    })
  }

  private sleep (time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  private writeCmd (interval: number = 50): Promise<void> {
    return new Promise(async resolve => {
      for (let i = 0; i < this.logs.cmd.length; i++) {
        this.output += this.logs.cmd[i]
        await this.sleep(interval)
      }
      resolve()
    })
  }

  private writeLogs (interval: number = 75): Promise<void> {
    const tripleDot = () => {
      return new Promise(async resolve => {
        for (let i in [1, 2, 3]) {
          await this.sleep(500)
          this.output += '.'
        }
        resolve()
      })
    }
    return new Promise(async resolve => {
      this.output += '\nCompiling Stories'
      await tripleDot()
      this.output += `\n✔ Compiled ${this.logs.files.length} story\n\n`
      await this.sleep(250)
      this.output += `Deploying app ${this.logs.name}`
      await tripleDot()
      this.output += `\n  ✔ Version ${this.releasesCount} of your app has been queued for deployment.\n\n`
      await this.sleep(250)
      this.output += '  Waiting for deployment to complete...\n'
      await this.sleep(100)
      this.output += `  ✔ Configured ${this.logs.files.length} story\n`
      if (this.logs.files.length > 0) {
        this.logs.files.forEach(f => {
          this.output += `  - ${f}\n`
        })
      }
      await this.sleep(100)
      this.output += `  ✔ Deployed ${this.logs.services.length} services\n`
      if (this.logs.services.length > 0) {
        this.logs.services.forEach(s => {
          this.output += `  - ${s}\n`
        })
      }
      await this.sleep(100)
      this.output += '  ✔ Created ingress route\n'
      await this.sleep(100)
      this.output += '  ✔ Configured logging\n'
      await this.sleep(100)
      this.output += '  ✔ Configured health checks\n'
      await this.sleep(100)
      this.output += '  ✔ Deployment successful!\n'
      await this.sleep(100)
      resolve()
    })
  }
}
</script>
