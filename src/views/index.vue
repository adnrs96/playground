<template>
  <div class="min-h-screen">
    <s-navbar :welcome="welcome" />
    <router-view />
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

  mounted () {
    if (!this.$route.params.hasOwnProperty('sample') && !this.$route.path.includes('welcome')) {
      this.$router.push({ name: 'playground', params: { sample: 'counter' } })
    }
    this.welcome = this.$route.name === 'welcome'
    event.$on('welcome', (val: boolean) => {
      this.welcome = val
    })
  }
}
</script>
