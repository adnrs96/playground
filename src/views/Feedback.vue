<template>
  <div id="feedback">
    <s-modal
      id="feeback-modal"
      ref="feedbackModal"
    >
      <div class="flex flex-col justify-center items-center h-full w-full">
        <img src="../assets/img/feedback-modal-header.svg">

        <s-text
          h="2"
          weight="semibold"
          class="w-full my-4 text-gray-100"
          align="center"
        >
          Feedback makes a better product.
        </s-text>

        <form
          id="feedback-form"
          class="mt-6"
          name="feedback"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="submit"
        >
          <s-labeled-input
            name="form-name"
            type="text"
            class="w-full mt-6"
            placeholder="Don’t fill this out if you're human"
            value="feedback"
            hidden
            readonly
          >
            <div slot="label">
              Bot Field
            </div>
          </s-labeled-input>

          <s-select-pills
            p="2"
            weight="medium"
            :option-strings="shutdownStoryscriptQuestion"
            @pillSelectionChange="onPillSelectionChange('q1', $event)"
          >
            <s-text
              slot="label"
              p="2"
              weight="regular"
              align="center"
              class="mb-2 text-gray-90"
            >
              How would you feel if we
              <span class="font-semibold">stopped building</span> Storyscript?
            </s-text>
          </s-select-pills>

          <s-select-pills
            p="3"
            weight="medium"
            :option-strings="understandStoryscriptQuestion"
            @pillSelectionChange="onPillSelectionChange('q2', $event)"
          >
            <s-text
              slot="label"
              p="2"
              weight="regular"
              align="center"
              class="mb-2 text-gray-90 text-center"
            >
              Is it clear what the product does?
            </s-text>
          </s-select-pills>

          <s-labeled-input
            v-model.trim="comment"
            textarea
            autocomplete="off"
            name="comment"
            type="text"
            class="w-full mt-6"
            placeholder="Type something"
            shadow
          >
            <div
              slot="label"
              class="font-medium text-gray-90"
            >
              Any additional comments or questions
            </div>
          </s-labeled-input>

          <s-labeled-input
            v-model.trim="email"
            autocomplete="off"
            name="email"
            type="email"
            placeholder="Enter your email address"
            class="w-full mt-6"
            shadow
          >
            <div
              slot="label"
              class="font-medium text-gray-90"
            >
              Email (Optional)
            </div>
          </s-labeled-input>
          <s-text
            v-if="emailError.length > 0"
            p="3"
            weight="regular"
            class="mt-2 text-red-70"
          >
            {{ emailError }}
          </s-text>

          <s-button
            id="feedback-submit-btn"
            type="submit"
            class="w-full mt-8"
            :class="[
              { 'bg-gray-100': !(success || disabled)},
              { 'bg-gray-80': success}]"
            :disabled="disabled"
          >
            <s-text
              p="2"
              weight="semibold"
              align="center"
              class="text-white"
            >
              {{ sending ? 'Sending...' : success ? 'Feedback Submitted!' : 'Submit Feedback' }}
            </s-text>
          </s-button>
          <s-text
            v-if="error"
            p="3"
            weight="regular"
            class="mt-2 text-red-70 text-center"
          >
            Failed to send your information.
          </s-text>
          <s-text
            v-else-if="success"
            p="3"
            weight="regular"
            class="mt-2 text-center text-gray-100 flex flex-row items-center justify-center"
          >
            Thank you for taking the time to share your feedback.
            <s-icon
              icon="heart"
              height="17"
              width="17"
            />
          </s-text>
        </form>
      </div>
    </s-modal>
    <s-icon
      id="toolbar-feedback"
      icon="feedback-circle"
      color="text-gray-90"
      height="20"
      width="20"
      clickable
      @click="$refs.feedbackModal.show()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SLabeledInput from '@/components/Inputs/LabeledInput.vue'
import SSelectPills from '@/components/Inputs/SelectPills.vue'

@Component({
  name: 'Feedback',
  components: {
    SLabeledInput,
    SSelectPills
  }
})
export default class Feedback extends Vue {
  private comment = ''
  private email = ''
  private emailError = ''
  private sending = false
  private success = false
  private error = false
  private questionsAnswered = 0
  private shutdownStoryscriptAnswer = ''
  private understandStoryscriptAnswer = ''
  private shutdownStoryscriptQuestion = ["Don't care", 'Meh', 'Sad', 'Angry']
  private understandStoryscriptQuestion = [
    'Yes, I get it!',
    'No, does not make sense.'
  ]

  readonly q1 = 'How would you feel if we stopped building storyscript?'
  readonly q2 = 'Is it clear what the product does?'

  private disabled = true

  private updateDisabled () {
    if (
      this.emailError.length > 0 ||
      this.sending ||
      (this.email === '' && this.comment === '' && this.questionsAnswered === 0)
    ) {
      this.disabled = true
    } else {
      this.disabled = false
    }
  }

  private updateQuestionsAnswered () {
    this.questionsAnswered = 0
    if (this.shutdownStoryscriptAnswer !== '') {
      this.questionsAnswered += 1
    }
    if (this.understandStoryscriptAnswer !== '') {
      this.questionsAnswered += 1
    }
    this.updateDisabled()
  }

  @Watch('comment')
  private onComment () {
    this.updateDisabled()
  }

  @Watch('email')
  private onEmailHandler () {
    if (
      /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/.test(
        this.email
      ) === false &&
      this.email.length > 0
    ) {
      this.emailError = 'Email is invalid.'
    } else {
      this.emailError = ''
    }
    this.updateDisabled()
  }

  @Watch('success')
  private async onSuccess () {
    return new Promise(resolve => {
      if (this.success) {
        setTimeout(() => {
          this.close()
          resolve()
        }, 2500)
      } else {
        resolve()
      }
    })
  }

  private onPillSelectionChange (q: string, selected: any) {
    if (q === 'q1') {
      this.shutdownStoryscriptAnswer = selected
    } else if (q === 'q2') {
      this.understandStoryscriptAnswer = selected
    }
    this.updateQuestionsAnswered()
  }

  private submit () {
    if (this.sending || this.disabled) {
      return
    }
    this.sending = true
    this.success = false
    this.error = false
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `form-name=${encodeURIComponent(
        'feedback'
      )}&email=${encodeURIComponent(this.email)}&comment=${encodeURIComponent(
        this.comment
      )}&${encodeURIComponent(this.q1)}=${encodeURIComponent(
        this.shutdownStoryscriptAnswer
      )}&${encodeURIComponent(this.q2)}=${encodeURIComponent(
        this.understandStoryscriptAnswer
      )}`
    })
      .then((response: Response) => {
        if (response.status !== 200) {
          this.error = true
        } else {
          this.success = true
        }
      })
      .finally(() => {
        this.sending = false
      })
  }

  private close () {
    const modal = this.$refs.feedbackModal as any
    if (modal) {
      modal.hide()
    }
    this.comment = ''
    this.email = ''
    this.success = false
    this.error = false
  }
}
</script>
