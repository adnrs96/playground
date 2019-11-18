<template>
  <div
    id="collaborators"
    class="flex items-center"
  >
    <div
      v-for="(c, idx) in collaborators"
      :id="`collaborator-${idx}`"
      :key="`collaborator-${idx}`"
      class="collaborator -mr-2 flex items-center transition-all-fastest bg-indigo-10 rounded-full"
      @mouseenter="hoverHandler($event, true, idx)"
      @mouseleave="hoverHandler($event, false, idx)"
    >
      <div
        class="rounded-full border-2 border-white flex items-center justify-center shadow-md"
        :class="{'p-1': !c.avatar, 'border-indigo-50': hovered === idx}"
      >
        <s-text
          v-show="hovered === idx"
          p="3"
          weight="medium"
          color="text-indigo-70"
          class="flex items-center justiryf-center px-2 py-1 mx-2"
        >
          {{ c.name }}
        </s-text>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IStoryCollaborator } from '../models/StorySample'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import collaborators from '@/samples/defaultCollaborators'

@Component({
  name: 'Collaborators',
  components: {
    SIcon,
    SText
  }
})
export default class Collaborators extends Vue {
  private collaborators: Array<IStoryCollaborator> = collaborators
  private hovered = -1

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
