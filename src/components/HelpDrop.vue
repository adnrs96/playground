<template>
  <s-drop
    id="help-drop-btn"
    ref="self"
    down
    right
    narrow
    no-arrow
    class="ml-8"
  >
    <div class="flex items-center cursor-pointer select-none text-white">
      <s-icon
        icon="help-circle"
      />
      <s-text
        p="5"
        weight="medium"
        class="px-3 py-2 whitespace-no-wrap"
      >
        Help
      </s-text>
    </div>
    <div
      slot="content"
      class="whitespace-normal w-max-content max-w-xs flex flex-col rounded-sm"
    >
      <div
        class="w-full bg-gray-80 text-white rounded-xs flex px-2 py-3 items-center justify-start cursor-pointer"
        @click="chatWithUs"
      >
        <s-icon
          icon="intercom"
          class="mr-2"
        />
        <s-text
          p="3"
          weight="medium"
        >
          Live Support
        </s-text>
        <div
          class="rounded-full border-2 border-white shadow-md w-6 h-6 relative ml-10"
        >
          <img
            :src="`/img/inkie-friends/inkie.png`"
            :alt="`chat with us`"
            srcset="/img/inkie-friends/inkie@2x.png 2x, /img/services/inkie@3x.png 3x"
            width="24"
            height="24"
            class="rounded-full"
          >
          <s-icon
            icon="dot"
            class="absolute -top-min -right-min text-green-50 border rounded-full border-white"
            width="6"
            height="6"
          />
        </div>
      </div>
      <div class="p-1 border-b border-black">
        <div
          class="px-1 py-2 cursor-pointer flex items-center"
          @click="showTips"
        >
          <s-icon
            icon="disc"
            class="text-gray-40 mr-2"
          />
          <s-text
            p="4"
            weight="medium"
            class="text-gray-20"
          >
            Show tips
          </s-text>
        </div>
        <a
          href="//docs.storyscript.io"
          target="_blank"
          rel="noopener"
          class="px-1 py-2 cursor-pointer flex items-center"
          @click="hideOnElementClicked"
        >
          <s-icon
            icon="book"
            class="text-gray-40 mr-2"
          />
          <s-text
            p="4"
            weight="medium"
            class="text-gray-20"
          >Documentation</s-text>
        </a>
      </div>
      <div
        class="flex items-center justify-center p-2"
      >
        <a
          href="//twitter.com/storyscript_"
          target="_blank"
          rel="noopener"
          class="p-1 bg-gray-80 rounded-full cursor-pointer flex items-center justify-center"
          @click="hideOnElementClicked"
        >
          <s-icon
            icon="twitter"
            class="text-gray-20"
          />
        </a>
        <a
          href="//github.com/storyscript"
          target="_blank"
          rel="noopener"
          class="p-1 mx-4 bg-gray-80 rounded-full cursor-pointer flex items-center justify-center"
          @click="hideOnElementClicked"
        >
          <s-icon
            icon="github-o"
            class="text-gray-20"
          />
        </a>
        <a
          href="//storyscript.click/chat"
          target="_blank"
          rel="noopener"
          class="p-1 bg-gray-80 rounded-full cursor-pointer flex items-center justify-center"
          @click="hideOnElementClicked"
        >
          <s-icon
            icon="spectrum"
            class="text-gray-20"
          />
        </a>
      </div>
    </div>
  </s-drop>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import SDrop from '@/components/Drop.vue'

@Component({
  name: 'HelpDrop',
  components: {
    SIcon,
    SText,
    SDrop
  }
})
export default class HelpDrop extends Vue {
  @Mutation('sampleHasNotBeenShown') showTip!: (sampleId: string) => void

  private chatWithUs () {
    this.$intercom.show()
    this.hideOnElementClicked()
  }

  private showTips () {
    this.showTip(this.$route.params.sample)
    this.hideOnElementClicked()
  }

  private hideOnElementClicked () {
    (this.$refs.self as any).hideIfShown()
  }
}
</script>
