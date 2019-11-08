<template>
  <!-- slide-down-enter slide-down-leave-to slide-down-enter-active slide-down-leave-active -->
  <div class="sticky top-0 z-10">
    <transition name="slide-down">
      <div
        v-if="visible"
        :class="['relative', 'inset-x-0', 'w-fit-content', 'p-4', '-mb-12', 'mx-auto', 'transition-all-faster']"
      >
        <div class="flex flex-row p-3 rounded-sm bg-gray-100">
          <s-text
            v-if="!$slots.default"
            p="5"
            weight="medium"
            color="text-gray-30"
          >
            {{ content }}
          </s-text>
          <template v-else>
            <slot />
          </template>
          <s-icon
            v-if="closeable"
            icon="cross"
            color="text-gray-50 active:text-gray-80"
            class="pl-8"
            clickable
            @click="hide"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import IDisplay from '@/models/Display'

@Component({
  name: 'SNotification',
  components: { SIcon, SText }
})
export default class Notification extends Vue implements IDisplay {
  @Prop({ type: Boolean, default: false }) private closeable!: boolean
  @Prop({ type: String, default: undefined }) private content!: string
  @Prop({ type: Boolean, default: false }) private hidden!: boolean
  private visible: boolean = true

  public show () {
    this.visible = true
  }

  public hide () {
    this.visible = false
  }

  created () {
    if (this.hidden) {
      this.visible = false
    }
  }
}
</script>
