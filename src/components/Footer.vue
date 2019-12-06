<template>
  <div class="w-screen bg-white px-2">
    <div
      v-if="full"
      class="flex flex-col sm:flex-row w-full max-w-5xl mx-auto pt-12 pb-6"
    >
      <div
        v-for="(section, sid) of footerElements"
        :key="`footer-section-${sid}`"
        :class="['flex', 'flex-col', { 'flex-grow': !section.children }]"
      >
        <s-text
          v-if="section.name"
          class="mb-8 text-indigo-100"
          p="1"
          weight="semibold"
          v-text="section.name"
        />
        <a
          v-for="(link, lid) of section.links"
          :key="`footer-section-${sid}-link-${lid}`"
          :class="[
            'text-base',
            `font-${link.bold ? 'semibold' : 'regular'}`,
            `text-${link.color || 'gray-80'}`,
            'tracking-normal',
            'mb-6'
          ]"
          :href="link.href"
          :title="link.title"
          v-text="link.title"
        />
        <div
          v-for="(child, cid) of section.children"
          :key="`footer-section-${sid}-child-${cid}`"
          :class="child.classes"
        >
          <component
            :is="c.el"
            v-for="(c, ci) of child.children"
            :key="`footer-section-${sid}-child-${cid}-c-${ci}`"
            v-bind="c.bind"
          >
            {{ c.text }}
          </component>
          <component
            :is="child.el"
            v-bind="child.bind"
          >
            {{ child.text }}
          </component>
        </div>
      </div>
    </div>
    <div
      v-if="full"
      class="h-px bg-gray-20 w-full max-w-5xl mx-auto"
    />
    <div class="py-4 flex flex-grow flex-col items-center justify-between max-w-5xl mx-auto relative">
      <div class="w-full h-12 hidden sm:block" />
      <s-text
        class="flex items-center relative sm:absolute inset-y-0 left-0 text-gray-100"
        p="2"
        weight="semibold"
      >
        <span>Built with</span>
        <s-icon
          icon="heart"
          class="mx-1"
        />
        <span>in Amsterdam</span>
      </s-text>
      <div class="flex items-center relative sm:absolute inset-y-0 sm:left-center my-2 sm:my-0">
        <div
          class="bg-gray-20 rounded-full sm:-ml-4 w-8 h-8 flex items-center justify-center cursor-pointer active:bg-gray-30 ease"
          @click="$emit('scrollTop', $event)"
        >
          <s-icon
            icon="arrow-up"
            color="text-gray-100"
          />
        </div>
      </div>
      <div class="flex items-center relative sm:absolute inset-y-0 right-0">
        <s-text
          p="2"
          weight="semibold"
          class="sm:mr-2 text-gray-100"
        >
          {{ new Date() | moment('YYYY') }} Storyscript
        </s-text>
        <a
          v-for="social in [{ name: 'GitHub', link: '//github.com/storyscript', icon: 'github-f' }, { name: 'Twitter', link: '//twitter.com/storyscript_', icon: 'twitter' }, { name: 'Slack', link: '//storyscript.click/slack', icon: 'slack' }]"
          :key="`social-icon-${social.name}`"
          :href="social.link"
          :title="social.name"
          class="ml-1 sm:ml-4"
        >
          <s-icon
            :icon="social.icon"
            color="text-indigo-50"
            clickable
            height="24"
            width="24"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FooterElements from '@/components/footer.json'

@Component({
  name: 'SFooter'
})
export default class Footer extends Vue {
  @Prop({ type: Boolean, default: false }) private readonly full!: boolean

  private readonly footerElements: any[] = FooterElements
}
</script>
