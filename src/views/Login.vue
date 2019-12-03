<template>
  <div id="login">
    <s-blur
      id="login-blur"
      key="blur"
      ref="loginModal"
      class="flex justify-center items-center h-full w-full"
    >
      <s-modal cross>
        <s-text
          head="2"
          weight="semibold"
          color="text-black"
          class="w-full"
          center
        >
          The Storyscript Studio is in private beta only.
          Please drop your email to get updated for general availability.
        </s-text>
        <form
          id="login-form"
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
            placeholder="Enter your e-mail address"
            class="w-full mt-6"
            required
            shadow
          >
            <div slot="label">
              E-mail
            </div>
          </s-labeled-input>
          <s-text
            v-if="emailError.length > 0"
            p="5"
            weight="medium"
            color="text-red-70"
            class="mt-2"
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
            id="login-submit-btn"
            primary
            center
            type="submit"
            class="w-full mt-8"
            color="text-white"
            :class="{ 'mb-16': !error }"
            :disabled="emailError.length > 0 || email.length === 0 || sending"
          >
            {{ sending ? 'Sending...' : success ? 'Thanks!' : 'Register Interest' }}
          </s-button>
          <s-text
            v-if="error"
            p="5"
            weight="medium"
            color="text-red-70"
            :class="{'mb-12': error}"
            class="mt-2"
          >
            Failed to send your information.
          </s-text>
        </form>
      </s-modal>
    </s-blur>
    <s-drop
      id="new-from-tpl-btn"
      mode="hover"
      bottom
      light
      bordered
      class="ml-8"
    >
      <div class="flex items-center cursor-pointer select-none bg-colorful">
        <s-text
          p="5"
          weight="medium"
          color="text-gray-100"
          class="px-3 py-2 whitespace-no-wrap"
          clickable
          @click="$refs.loginModal.show()"
        >
          New from template
        </s-text>
      </div>
      <s-text
        slot="content"
        p="5"
        weight="medium"
        color="text-gray-90"
        class="max-w-xxs whitespace-normal w-max-content"
      >
        Write a new Story starting from this template.
      </s-text>
    </s-drop>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SLabeledInput from '@/components/Inputs/LabeledInput.vue'
import SButton from '@/components/Button.vue'
import SBlur from '@/components/Blur.vue'
import SModal from '@/components/Modals/Modal.vue'
import SDrop from '@/components/Drop.vue'

@Component({
  name: 'Login',
  components: {
    SText,
    SButton,
    SLabeledInput,
    SBlur,
    SModal,
    SDrop
  }
})
export default class Login extends Vue {
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

  private close () {
    const modal = this.$refs.loginModal as SBlur
    if (modal) {
      modal.hide()
    }
    this.comment = ''
    this.email = ''
  }
}
</script>
