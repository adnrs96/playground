<template>
  <div
    v-if="collaborators && collaborators.length > 0"
    id="collaborators"
    class="flex items-center"
  >
    <div
      v-for="(c, idx) in collaborators"
      :key="`collaborator-${idx}`"
      class="collaborator -mr-2"
    >
      <div
        class="bg-gray-30 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        :class="{'p-1': !c.photo}"
      >
        <img
          v-if="c.photo"
          :src="c.photo"
          :alt="`${c.name} profile picture`"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import SIcon from '@/components/Icon.vue'
import { IStoryCollaborator, IStorySample } from '../models/StorySample'

@Component({
  name: 'Collaborators',
  components: {
    SIcon
  }
})
export default class Collaborators extends Vue {
  @Getter('getPayload')
  private payload!: IStorySample

  private collaborators: Array<IStoryCollaborator> = []

  mounted () {
    this.collaborators = this.payload.collaborators
  }
}
</script>
