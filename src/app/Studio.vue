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
        slot="notification"
        key="pwa-update"
        ref="pwaUpdateNotification"
        closeable
        hidden
      >
        <s-text
          p="4"
          weight="medium"
          class="text-gray-30"
        >
          A new version is available.
          <s-text
            clickable
            tag="span"
            p="4"
            weight="bold"
            class="text-indigo-40 hover:text-indigo-70 active:text-indigo-80"
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
import { Component, Vue } from 'vue-property-decorator'
import event from '@app/event'
import SNotification from '@internal/components/Notification.vue'

@Component({
  name: 'Studio',
  components: {
    SNotification
  }
})
export default class Studio extends Vue {
  private refresh () {
    window.location.reload()
  }

  private async onSWEventListener (event: any) {
    if ('status' in event) {
      switch (event.status) {
        case 'update':
          if (event.latest && event.refresh) {
            this.$nextTick().then(() => {
              const pwaUpdateNotification = this.$refs.pwaUpdateNotification as SNotification
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
    this.$intercom.hideLauncher()
  }
}
</script>
