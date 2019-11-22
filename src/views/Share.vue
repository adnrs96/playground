<template>
  <div id="share">
    <s-blur
      id="share-blur"
      key="blur"
      ref="shareModal"
      class="flex justify-center items-center"
    >
      <s-modal
        cross
        class="pb-8"
      >
        <s-text
          center
          head="2"
          weight="regular"
          color="text-gray-100"
          class="w-full mb-8"
        >
          Share your story to the world!
        </s-text>
        <div id="copy">
          <s-text
            p="2"
            weight="regular"
            color="text-gray-70"
            class="mb-2"
          >
            Copy link
          </s-text>
          <s-input
            readonly
            autocomplete="off"
            name="url"
            :placeholder="url"
            :value="url"
            class="bg-gray-10 shadow-sm"
          >
            <s-icon
              id="copy-icon"
              slot="icon"
              icon="file-copy"
              color="text-gray-100"
              class="mr-4"
              width="16"
              height="16"
              clickable
              @click="copy"
            />
          </s-input>
          <s-text
            v-show="copied"
            p="5"
            weight="regular"
            color="text-indigo-70"
            class="mt-2"
          >
            Link copied in your clipboard!
          </s-text>
        </div>
      </s-modal>
    </s-blur>
    <s-button
      id="share-btn"
      color="text-gray-100"
      white
      center
      reverse
      small
      @click.prevent="$refs.shareModal.show()"
    >
      <span class="flex flex-row items-center">
        <s-icon
          icon="user-plus"
          color="text-gray-100"
          is-stroke
          class="mr-3"
        />
        Share
      </span>
    </s-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SButton from '@/components/Button.vue'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import SBlur from '@/components/Blur.vue'
import { SModal } from '@/components/Modals'
import { SInput } from '@/components/Inputs'

@Component({
  name: 'SShare',
  components: {
    SButton,
    SIcon,
    SText,
    SBlur,
    SModal,
    SInput
  }
})
export default class Share extends Vue {
  private url: string = window.location.href
  private copied: boolean = false

  private copy (): void {
    this.$copyText(this.url)
    this.copied = true
    setTimeout(() => {
      this.copied = false
    }, 2000)
  }
}
</script>
