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
        color="text-gray-100"
        class="bg-gray-20 rounded p-2"
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
            color="text-gray-100"
            clickable
          />
        </a>
        <s-text
          slot="content"
          p="4"
          weight="medium"
          class="max-w-xxs whitespace-normal w-max-content text-white"
        >
          Discover services in the Storyscript Hub
        </s-text>
      </s-drop>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SDrop from '@/components/Drop.vue'

@Component({
  name: 'Toolbar',
  components: {
    SDrop
  }
})
export default class Toolbar extends Vue {}
</script>
