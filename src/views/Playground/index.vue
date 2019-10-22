<template>
  <div class="min-h-screen">
    <s-navbar />
    <div class="min-h-screen-no-navbar flex">
      <div class="w-2/3">
        <br>
        <!-- HERE GOES THE EDITOR -->
      </div>

      <s-logs
        class="w-1/3"
        :logs="payload.logs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SNavbar from '@/components/Navbar.vue'
import SLogs from '@/views/Playground/Logs.vue'
import { IStorySample } from '@/models/StorySample'
import counter from '@/samples/counter'

@Component({
  components: {
    SNavbar,
    SLogs
  }
})
export default class Playground extends Vue {
  private payload: IStorySample = counter
  private automateLogs: boolean = false
}
</script>
