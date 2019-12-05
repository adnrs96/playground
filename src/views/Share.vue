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
          h="2"
          weight="regular"
          class="w-full mb-8 text-gray-100"
        >
          Share your story to the world!
        </s-text>
        <div id="copy">
          <s-text
            p="2"
            weight="regular"
            class="mb-2 text-gray-70"
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
            p="4"
            weight="regular"
            class="mt-2 text-indigo-70"
          >
            Link copied in your clipboard!
          </s-text>
        </div>
      </s-modal>
    </s-blur>
    <s-button
      id="share-btn"
      accent
      size="smaller"
      tabindex="2"
      class="flex items-center rounded-md cursor-pointer bg-indigo-70 hover:bg-indigo-60"
      @click="$refs.shareModal.show()"
    >
      <s-icon
        icon="user-plus"
        color="text-white"
        class="mr-2"
      />
      <s-text
        p="4"
        weight="medium"
        class="text-white"
      >
        Share
      </s-text>
    </s-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SBlur from '@/components/Blur.vue'
import { SModal } from '@/components/Modals'
import { SInput } from '@/components/Inputs'

@Component({
  name: 'SShare',
  components: {
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
