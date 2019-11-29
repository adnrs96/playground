<template>
  <div
    id="toolbar"
    class="flex flex-col items-center w-16 shadow-inner-right py-4"
  >
    <div class="mb-4">
      <s-icon
        id="toolbar-ss-logo"
        icon="story"
        height="27"
        width="27"
        clickable
        @click="$router.push({ name: 'welcome' })"
      />
    </div>

    <div class="my-4">
      <s-icon
        id="toolbar-code"
        icon="code"
        height="20"
        width="20"
        color="text-grey-100"
        class="bg-gray-20 rounded p-2"
      />
    </div>

    <div class="my-4">
      <s-icon
        id="toolbar-feedback"
        icon="feedback-circle"
        height="20"
        width="20"
      />
    </div>

    <div class="my-4">
      <s-drop
        id="toolbar-nav-drop"
        class="ml-px mt-px"
        mode="hover|focus"
        right
        bordered
        shadow="sm"
      >
        <a
          href="https://hub.storyscript.io"
          target="_blank"
        >
          <s-icon
            id="toolbar-nav"
            icon="compass"
            height="20"
            width="20"
            clickable
          />
        </a>
        <s-text
          slot="content"
          p="5"
          weight="medium"
          color="white"
          class="max-w-xxs whitespace-normal w-max-content"
        >
          Discover services in the Storyscript Hub
        </s-text>
      </s-drop>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'
import SDrop from '@/components/Drop.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'Toolbar',
  components: {
    SIcon,
    SDrop,
    SText
  }
})
export default class Toolbar extends Vue {}
</script>
