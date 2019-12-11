<template>
  <div class="z-20">
    <div
      class="transition-all-fast absolute bg-white cursor-pointer w-10 h-10 flex items-center justify-center shadow-sm2 border-t border-r border-b border-gray-20 rounded-tr-md rounded-br"
      :class="[
        marginToggler
      ]"
      @click="togglePane"
    >
      <s-icon
        icon="book-open"
        color="text-gray-80"
        clickable
      />
    </div>
    <div
      id="library-view"
      class="z-30 transition-all-fast h-full flex flex-col bg-white rounded-tr-md border-t border-r border-gray-20 shadow-sm2 w-64"
      :class="[
        marginPane
      ]"
    >
      <div
        id="library-top-bar"
        class="flex items-center justify-between p-3 border-b border-gray-20"
      >
        <div class="flex items-center">
          <s-icon
            icon="book-open"
            class="mr-1"
            color="text-gray-100"
          />
          <s-text
            p="4"
            weight="medium"
            class="text-gray-100"
          >
            Library
          </s-text>
        </div>
        <s-icon
          icon="chevron-left"
          clickable
          @click="togglePane"
        />
      </div>
      <div
        id="library-content"
        class="flex flex-col items-center px-4"
      >
        <img
          class="mt-7 mb-6"
          src="/img/illustrations/library/services.png"
          alt="multiples services icons"
        >
        <s-text
          p="2"
          weight="medium"
          class="text-gray-100 mb-3"
          align="center"
        >
          Library of services to<br>
          power your Story
        </s-text>
        <s-text
          p="4"
          weight="regular"
          class="text-gray-70 mb-4"
          align="center"
        >
          Our native library is coming into the studio soon. As you develop, the library will show you documentation related to what service you are working with. For now, enjoy our library of services at the Storyscript Hub.
        </s-text>
        <a
          href="//hub.storyscript.io"
          target="_blank"
        >
          <s-text-button
            accent
            size="smaller"
          >
            Explore Hub
          </s-text-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

@Component({
  name: 'SLibrary'
})
export default class SLibrary extends Vue {
  private toggled: boolean = false

  @Mutation('toggleLibraryPane') storeToggle!: () => void

  @Getter('isLibraryPaneOpen')
  private isOpen!: boolean

  private togglePane (): void {
    this.storeToggle()
    this.toggled = true
    setTimeout(() => {
      this.toggled = false
    }, 350)
  }

  private get marginPane (): string {
    return this.isOpen ? 'ml-0' : '-ml-64'
  }

  private get marginToggler (): string {
    return !this.isOpen && !this.toggled ? 'ml-0' : '-ml-10'
  }
}
</script>
