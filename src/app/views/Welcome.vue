<template>
  <div
    id="welcome"
    class="bg-gray-10"
  >
    <div class="flex items-center flex-no-wrap bg-white px-6 h-14 shadow-navbar border-solid border-b border-gray-20 z-20 justify-between">
      <router-link
        id="home-btn-logo"
        class="flex items-center cursor-pointer"
        :to="{ name: 'welcome' }"
      >
        <s-icon
          icon="story"
          height="18"
          width="18"
        />
        <s-icon
          icon="storyscript"
          color="text-indigo-logo"
          height="14"
          width="82"
          class="ml-2 mt-1"
        />
      </router-link>
    </div>
    <slot name="notification" />
    <perfect-scrollbar
      ref="content"
      class="overflow-hidden min-h-screen-no-navbar max-h-screen-no-navbar"
    >
      <s-text
        h="1"
        weight="regular"
        class="py-10 text-gray-90"
        align="center"
      >
        Welcome to Storyscript Studio!
      </s-text>

      <div class="flex flex-col md:flex-row md:flex-wrap justify-center mb-12">
        <div
          v-for="(card, idx) in samples"
          :id="`sample-card-${card.id}`"
          :key="`sample-card-${idx}`"
          class="bg-white rounded-xl m-4 w-full md:w-1/2 lg:w-1/3 sample-card shadow-card flex flex-col"
        >
          <div class="flex flex-col mt-8 px-8 pb-6 border-b border-solid border-gray-10">
            <div class="flex items-start">
              <div class="w-1/5 mr-6">
                <img
                  :src="`/img/services/${card.services[0]}.svg`"
                  :alt="`${card.services[0]} logo`"
                  class="w-full"
                >
              </div>
              <div class="w-4/5">
                <s-text
                  p="1"
                  weight="bold"
                  class="title text-gray-100"
                >
                  {{ card.name }}
                </s-text>
                <s-text
                  p="3"
                  weight="regular"
                  class="description text-black"
                >
                  {{ card.description }}
                </s-text>
              </div>
            </div>
            <div
              v-if="card.image"
              class="flex flex-col items-start mt-8"
            >
              <img
                :src="`/img/welcome-cards/${card.image}`"
                alt="card image"
                class="border border-gray-10 shadow-sm"
              >
            </div>
          </div>
          <div class="w-full flex justify-between items-center p-3">
            <div class="flex">
              <div
                v-for="(s, idx2) in card.services"
                :key="`service-${idx2}`"
                class="-mr-3 bg-white shadow-md rounded-full p-2 flex  items-center justify-center"
              >
                <img
                  :src="`/img/services/${s}.svg`"
                  width="32"
                  height="32"
                  :alt="`${s} service logo`"
                >
              </div>
            </div>
            <s-button
              :id="`explore-${card.id}`"
              accent
              class="flex items-center"
              @click="go(card.id)"
            >
              <s-icon
                icon="rocket-o"
                class="mr-2 rotate-45deg"
                color="text-white"
              />
              <s-text
                p="3"
                weight="regular"
                class="text-white"
              >
                Explore
              </s-text>
            </s-button>
          </div>
        </div>
        <div
          v-if="samples.length % 2 !== 0"
          class="m-4 w-full md:w-1/2 lg:w-1/3"
        />
      </div>

      <s-footer @scrollTop="$refs.content.$el.scrollTop = 0" />
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import event from '@app/event'
import PerfectScrollbar from '@internal/components/PerfectScrollbar.vue'
import SFooter from '@internal/components/Footer.vue'
import samples from '@/samples'
import { IStorySample } from '&/StorySample'

@Component({
  name: 'Welcome',
  components: {
    PerfectScrollbar,
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
    this.$router.push({ name: 'studio', params: { sample } })
  }
}
</script>
