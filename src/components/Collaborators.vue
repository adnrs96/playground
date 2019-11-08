<template>
  <div
    v-if="collaborators && collaborators.length > 0"
    id="collaborators"
    class="flex items-center"
  >
    <div
      v-for="(c, idx) in collaborators"
      :id="`collaborator-${idx}`"
      :key="`collaborator-${idx}`"
      class="collaborator -mr-2 flex items-center transition-all-fastest"
      @mouseenter="hoverHandler($event, true, idx)"
      @mouseleave="hoverHandler($event, false, idx)"
    >
      <div
        class="bg-gray-30 rounded-full border-2 border-white flex items-center justify-center shadow-md z-10"
        :class="{'p-1': !c.avatar}"
      >
        <img
          v-if="c.avatar"
          :src="`/img/inkie-friends/${c.avatar}.png`"
          :alt="`${c.name} profile picture`"
          :srcset="`/img/inkie-friends/${c.avatar}@2x.png 2x, /img/services//${c.avatar}@3x.png 3x`"
          width="31"
          height="31"
          class="rounded-full"
        >
        <s-icon
          v-else
          icon="story"
          color="text-indigo-60"
          width="23"
          height="23"
        />
      </div>
      <s-text
        v-show="hovered === idx"
        p="3"
        weight="medium"
        color="text-gray-70"
      >
        {{ c.name }}
      </s-text>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { IStoryCollaborator, IStorySample } from '../models/StorySample'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'Collaborators',
  components: {
    SIcon,
    SText
  }
})
export default class Collaborators extends Vue {
  @Getter('getPayload')
  private payload!: IStorySample

  private collaborators: Array<IStoryCollaborator> = []
  private hovered = -1

  mounted () {
    this.collaborators = this.payload.collaborators
  }

  hoverHandler (e: any, inside: boolean, idx: number) {
    if (inside) {
      if (idx + 1 !== this.collaborators.length) {
        e.target.classList.remove('-mr-2')
      }
      this.hovered = idx
    } else {
      e.target.classList.add('-mr-2')
      this.hovered = -1
    }
  }
}
</script>
