<template>
  <div
    class="px-4 pb-6 min-h-screen-no-navbar-tabs flex flex-col"
  >
    <s-perfect-scrollbar>
      <transition-group
        name="fade-in"
        tag="div"
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
      </transition-group>
    </s-perfect-scrollbar>
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
      <s-text-button
        size="small"
        accent
        :disabled="commentInput.trim().length === 0"
        @click="addComment"
      >
        Send
      </s-text-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IStorySampleComment } from '&/StorySample'
import { SInput } from '@internal/components/Inputs'
import SPerfectScrollbar from '@internal/components/PerfectScrollbar.vue'

@Component({
  components: {
    SInput,
    SPerfectScrollbar
  }
})
export default class Comments extends Vue {
  @Prop({ type: Array, default: () => ([]) })
  private comments!: Array<IStorySampleComment> | []

  private commentInput = ''
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
