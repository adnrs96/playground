<template>
  <div class="min-h-screen">
    <s-navbar
      :intro="isIntro"
    />
    <router-view @introChange="isIntro = $event">
      <template slot="notification">
        <slot name="notification" />
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SNavbar from '@/components/Navbar.vue'

@Component({
  components: {
    SNavbar
  }
})
export default class Layout extends Vue {
  private isIntro = true

  mounted () {
    if ((!this.$route || !this.$route.params || !('sample' in this.$route.params)) &&
      (this.$route && this.$route.path && !this.$route.path.includes('welcome'))) {
      this.$router.push({ name: 'welcome' })
    }
    this.isIntro = !(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
  }
}
</script>
