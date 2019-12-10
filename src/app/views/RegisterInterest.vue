<template>
  <div id="register-interest">
    <s-modal
      id="register-interest-modal"
      ref="registerInterestModal"
      @hidden="onHidden"
    >
      <s-text
        h="2"
        weight="semibold"
        color="text-gray-100"
        class="w-full mb-6"
        center
      >
        The Storyscript Studio is in private beta only
      </s-text>
      <s-text
        span
        color="text-gray-70"
        class="w-full"
        left
      >
        Please drop your email to get updated for general availability.
      </s-text>
      <form
        id="register-interest-form"
        name="register-interest"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="submit"
      >
        <s-labeled-input
          name="form-name"
          type="text"
          class="w-full mt-6"
          placeholder="Don’t fill this out if you're human"
          value="register-interest"
          hidden
          readonly
        >
          <div slot="label">
            Bot Field
          </div>
        </s-labeled-input>
        <s-labeled-input
          v-model.trim="email"
          autocomplete="off"
          name="email"
          type="email"
          placeholder="Enter your email address"
          class="w-full mt-6"
          required
          shadow
        >
          <div slot="label">
            Email
          </div>
        </s-labeled-input>
        <s-text
          v-if="emailError.length > 0"
          p="5"
          weight="medium"
          class="mt-2 text-red-70"
        >
          {{ emailError }}
        </s-text>
        <s-labeled-input
          v-model.trim="comment"
          autocomplete="off"
          name="comment"
          type="text"
          class="w-full mt-6"
          placeholder="Type your comment here (optional)"
          shadow
        >
          <div slot="label">
            Comment
          </div>
        </s-labeled-input>
        <s-button
          id="register-interest-submit-btn"
          primary
          center
          type="submit"
          class="w-full mt-8 text-white"
          :class="{ 'mb-16': !error }"
          :disabled="emailError.length > 0 || email.length === 0 || sending"
        >
          {{ sending ? 'Sending...' : success ? 'Thanks!' : 'Register Interest' }}
        </s-button>
        <s-text
          v-if="error"
          p="4"
          weight="medium"
          :class="{'mb-12': error}"
          class="mt-2 text-red-70"
        >
          Failed to send your information.
        </s-text>
      </form>
    </s-modal>
    <s-drop
      id="new-from-tpl-btn"
      mode="hover"
      down
      light
      bordered
      class="ml-8"
    >
      <s-gradient-border-button
        secondary
        @click="$refs.registerInterestModal.show()"
      >
        New from template
      </s-gradient-border-button>
      <s-text
        slot="content"
        p="5"
        weight="medium"
        class="max-w-xxs whitespace-normal w-max-content text-gray-90"
      >
        Write a new Story starting from this template.
      </s-text>
    </s-drop>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SLabeledInput from '@internal/components/Inputs/LabeledInput.vue'
import SDrop from '@internal/components/Drop.vue'

@Component({
  name: 'RegisterInterest',
  components: {
    SLabeledInput,
    SDrop
  }
})
export default class RegisterInterest extends Vue {
  private comment = ''
  private email = ''
  private emailError = ''
  private sending = false
  private success = false
  private error = false

  @Watch('success')
  private async onSuccess () {
    return new Promise((resolve) => {
      if (this.success) {
        setTimeout(() => {
          this.success = false
          this.error = false
          this.close()
          resolve()
        }, 2000)
      } else {
        resolve()
      }
    })
  }

  @Watch('email')
  private onEmailHandler () {
    if (/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/.test(this.email) === false && this.email.length > 0) {
      this.emailError = 'Email is invalid.'
    } else {
      this.emailError = ''
    }
  }

  private submit () {
    if (this.sending) {
      return
    }
    this.sending = true
    this.success = false
    this.error = false
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `form-name=${encodeURIComponent('register-interest')}&email=${encodeURIComponent(this.email)}&comment=${encodeURIComponent(this.comment)}`
    }).then((response: Response) => {
      if (response.status !== 200) {
        this.error = true
      } else {
        this.success = true
      }
    }).finally(() => {
      this.sending = false
    })
  }

  private onHidden () {
    this.comment = ''
    this.email = ''
  }

  private close () {
    this.onHidden()
    const modal = this.$refs.registerInterestModal as any
    if (modal) {
      modal.hide()
    }
  }
}
</script>
