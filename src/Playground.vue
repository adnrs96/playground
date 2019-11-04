<template>
  <!-- fade-enter fade-leave-to fade-enter-active fade-leave-active -->
  <transition-group
    class="max-h-screen max-w-screen overflow-hidden"
    name="fade"
    tag="div"
  >
    <router-view
      key="route"
      class="min-h-screen max-w-screen"
    >
      <s-notification
        v-if="initialized"
        slot="notification"
        key="pwa-update"
        ref="pwaUpdateNotification"
        closeable
        hidden
      >
        <s-text
          p="5"
          weight="medium"
          color="text-gray-30"
        >
          A new version is available.
          <s-text
            clickable
            span
            p="5"
            weight="bold"
            color="text-indigo-40 hover:text-indigo-70 active:text-indigo-80"
            @click.prevent="refresh"
          >
            Click here
          </s-text>
          to refresh.
        </s-text>
      </s-notification>
    </router-view>
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Sentry } from './plugins'
import event from './event'
import SNotification from '@/components/Notification.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'Playground',
  components: {
    SNotification,
    SText
  }
})
export default class Playground extends Vue {
  private initialized: boolean = true

  private refresh () {
    window.location.reload()
  }

  private async onSWEventListener (event: any) {
    if ('status' in event) {
      switch (event.status) {
        case 'update':
          if (event.latest && event.refresh) {
            const pwaUpdateNotification = this.$refs.pwaUpdateNotification as SNotification
            this.$nextTick().then(() => {
              pwaUpdateNotification.show()
            })
          }
          break
        case 'registered':
        case 'ready':
        default:
          break
      }
    }
  }

  created () {
    event.$on('sw', this.onSWEventListener)
  }

  mounted () {
    this.$intercom.boot()
  }
}
</script>
