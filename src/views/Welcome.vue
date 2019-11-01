<template>
  <div class="bg-gray-10">
    <perfect-scrollbar
      ref="content"
      class="overflow-hidden min-h-screen-no-navbar max-h-screen-no-navbar"
    >
      <s-text
        head="1"
        weifht="regular"
        color="text-gray-90"
        class="pt-20 pb-10"
        center
      >
        Welcome to Storyscript Playground!
      </s-text>

      <div class="flex flex-col md:flex-row justify-center mb-12">
        <div
          v-for="(card, idx) in samples"
          :key="`sample-card-${idx}`"
          class="bg-white rounded-xl m-4 w-full md:w-1/2 lg:w-1/3"
        >
          <div
            class="flex mt-8 px-8 pb-6 border-b border-solid border-gray-10"
          >
            <img
              src="@/assets/img/redis.svg"
              alt="redis logo"
              class="mr-6"
            >
            <div>
              <s-text
                p="1"
                weight="bold"
                color="text-gray-100"
              >
                {{ card.name }}.story
              </s-text>
              <s-text
                p="3"
                weight="regular"
                color="text-black"
              >
                {{ card.description }}
              </s-text>
            </div>
          </div>
          <div class="w-full flex justify-end items-center p-3">
            <s-button
              :id="`explore-${card.name}`"
              icon="rocket-o"
              primary
              reverse
              danger
              @click="go(card.name)"
            >
              Explore
            </s-button>
          </div>
        </div>
      </div>

      <s-footer
        full
        @scrollTop="$refs.content.$el.scrollTop = 0"
      />
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import event from '@/event'
import PerfectScrollbar from '@/components/PerfectScrollbar.vue'
import SText from '@/components/Text.vue'
import SButton from '@/components/Button.vue'
import SIcon from '@/components/Icon.vue'
import SFooter from '@/components/Footer.vue'
import samples from '@/samples'
import { IStorySample } from '../models/StorySample'

@Component({
  name: 'Welcome',
  components: {
    PerfectScrollbar,
    SText,
    SIcon,
    SButton,
    SFooter
  }
})
export default class Welcome extends Vue {
  private samples: IStorySample[] = samples

  mounted () {
    event.$emit('welcome', true)
  }

  private go (sample: string) {
    event.$emit('welcome', false)
    this.$router.push({ name: 'playground', params: { sample } })
  }
}
</script>
