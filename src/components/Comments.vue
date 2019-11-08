<template>
  <transition-group
    name="fade-in"
    tag="div"
    class="px-4 pb-6 min-h-screen-no-navbar-tabs flex flex-col"
  >
    <div
      v-for="(comment, idx) of commentsDisplay"
      :key="`comments-comment-${idx}`"
      class="flex flex-row items-end mt-4"
    >
      <div class="bg-gray-10 overflow-hidden rounded-full border-2 h-8 w-8 border-white flex items-center justify-center shadow-md">
        <img
          width="32"
          height="32"
          :src="`/img/inkie-friends/${comment.author.toLowerCase()}.png`"
          :title="`Comment by ${comment.author}`"
          :alt="`${comment.author}'s profile picture`"
        >
      </div>
      <s-text
        class="bg-gray-10 rounded-md px-2 py-3 mx-4 max-w-sm"
        p="3"
        v-text="comment.comment"
      />
    </div>
    <div
      key="self-input"
      class="flex flex-row mt-auto pt-4 items-center w-full"
    >
      <div class="bg-gray-10 overflow-hidden rounded-full border-2 h-8 w-8 border-white flex items-center justify-center shadow-md">
        <img
          width="32"
          height="32"
          src="/img/inkie-friends/crabbie.png"
          alt="your profile picture"
        >
      </div>
      <s-input
        v-model="commentInput"
        name="comment"
        small
        class="max-w-sm mx-4 flex-1"
        placeholder="write a comment..."
        @keyup.enter="addComment"
      />
      <s-button
        primary
        small
        :disabled="commentInput.trim().length === 0"
        @click="addComment"
      >
        Send
      </s-button>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import { IStorySampleComment } from '@/models/StorySample.ts'
import { SInput } from '@/components/Inputs'
import SButton from '@/components/Button.vue'

@Component({
  components: {
    SIcon,
    SText,
    SInput,
    SButton
  }
})
export default class Comments extends Vue {
  @Prop({ type: Array, required: true })
  private comments!: Array<IStorySampleComment>

  private commentInput: string = ''
  private mComments: Array<IStorySampleComment> = []

  private get commentsDisplay (): Array<IStorySampleComment> {
    return [...this.comments, ...this.mComments]
  }

  private addComment () {
    if (this.commentInput.trim().length > 0) {
      this.mComments.push({ author: 'Crabbie', comment: this.commentInput.trim() })
      this.commentInput = ''
    }
  }
}
</script>
