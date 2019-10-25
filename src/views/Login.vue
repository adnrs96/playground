<template>
  <div id="login">
    <s-blur
      id="login-blur"
      key="blur"
      ref="loginModal"
      class="flex justify-center items-center h-full w-full"
    >
      <s-modal
        cross
      >
        <form
          id="login-form"
          name="register-interest"
          method="post"
          data-netlify="true"
        >
          <s-text
            head="2"
            weight="semibold"
            color="text-black"
            class="w-full"
          >
            Register Interest
          </s-text>
          <s-labeled-input
            v-model="name"
            name="name"
            type="text"
            class="w-full mt-6"
            placeholder="Enter your name"
            required
            shadow
          >
            <div slot="label">
              Name
            </div>
          </s-labeled-input>
          <s-text
            v-if="nameError.length > 0"
            p="5"
            weight="medium"
            color="text-red-70"
            class="mt-2"
          >
            {{ nameError }}
          </s-text>
          <s-labeled-input
            v-model="email"
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
          <s-button
            primary
            class="w-full mt-8 mb-12"
            center
            type="submit"
            :disabled="nameError.length > 0 || emailError.length > 0 || name.length === 0 || email.length === 0"
            @click="close()"
          >
            Get in touch
          </s-button>
        </form>
      </s-modal>
    </s-blur>

    <s-button
      id="login-btn"
      icon="account-pin-o"
      primary
      reverse
      danger
      center
      small
      @click="$refs.loginModal.show()"
    >
      Get in touch
    </s-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SLabeledInput from '@/components/Inputs/LabeledInput.vue'
import SButton from '@/components/Button.vue'
import SBlur from '@/components/Blur.vue'
import SModal from '@/components/Modals/Modal.vue'

@Component({
  name: 'Login',
  components: {
    SText,
    SButton,
    SLabeledInput,
    SBlur,
    SModal
  }
})
export default class Login extends Vue {
  private name: string = ''
  private email: string = ''
  private nameError: string = ''
  private emailError: string = ''

  @Watch('name')
  private onNameHandler () {
    if (this.name.length < 3) {
      this.nameError = 'Name too short.'
    } else {
      this.nameError = ''
    }
  }

  @Watch('email')
  private onEmailHandler () {
    if (/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/.test(this.email) === false) {
      this.emailError = 'Email is invalid.'
    } else {
      this.emailError = ''
    }
  }

  private close () {
    (this.$refs.loginModal as SBlur).hide()
    this.name = ''
    this.email = ''
  }
}
</script>
