<template>
  <div class="min-h-screen">
    <router-view>
      <template slot="notification">
        <slot name="notification" />
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'StudioIndex'
})
export default class StudioIndex extends Vue {
  mounted () {
    this.checkRoute()
  }

  @Watch('$route')
  private onRouteChange () {
    this.checkRoute()
  }

  private checkRoute () {
    if ((!this.$route || !this.$route.params || !('sample' in this.$route.params)) &&
      (this.$route && this.$route.path && !this.$route.path.includes('welcome'))) {
      this.$router.push({ name: 'welcome' })
    }
  }
}
</script>
