<template>
  <div class="min-h-screen">
    <s-navbar
      :welcome="welcome"
      :intro="isIntro"
    />
    <router-view @introChange="isIntro = $event" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SNavbar from '@/components/Navbar.vue'
import event from '@/event'

@Component({
  components: {
    SNavbar
  }
})
export default class Layout extends Vue {
  private welcome: boolean = false
  private isIntro: boolean = true

  mounted () {
    if (!this.$route.params.hasOwnProperty('sample') && !this.$route.path.includes('welcome')) {
      this.$router.push({ name: 'playground', params: { sample: 'counter' }, query: this.$route.query })
    }
    this.welcome = this.$route.name === 'welcome'
    this.isIntro = !(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
    event.$on('welcome', (val: boolean) => {
      this.welcome = val
    })
  }
}
</script>
