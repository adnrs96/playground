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
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'StudioIndex'
})
export default class StudioIndex extends Vue {
  mounted () {
    if ((!this.$route || !this.$route.params || !('sample' in this.$route.params)) &&
      (this.$route && this.$route.path && !this.$route.path.includes('welcome'))) {
      this.$router.push({ name: 'welcome' })
    }
  }
}
</script>
