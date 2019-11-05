<template>
  <div
    id="architecture"
    class="w-full"
  >
    <s-text
      p="3"
      weight="semibold"
      color="text-gray-100"
      class="bg-white pl-8 py-1 flex items-center border-t border-b border-gray-20"
    >
      Architecture
    </s-text>
    <perfect-scrollbar class="bg-gray-10 p-8">
      <div class="flex flex-wrap-reverse">
        <div
          v-for="(c, idx) in services"
          :key="`card-${idx}`"
          class="card flex items-center bg-white rounded-md w-1/2-gutter-1 mb-2"
          :class="{'mr-2': idx % 2 === 0}"
        >
          <div
            class="px-6 my-3 py-3 border-r border-gray-20"
          >
            <div
              class="w-6 h-6"
            >
              <img
                :src="`/img/services/${c}.svg`"
                :alt="`${c} logo`"
              >
            </div>
          </div>
          <div class="flex items-center justify-end w-full p-4">
            <s-text
              p="5"
              weight="bold"
              color="text-gray-70"
            >
              {{ c }}
            </s-text>
          </div>
        </div>
      </div>

      <div
        class="base-card flex items-center w-full mb-2 bg-white rounded-md"
      >
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <s-icon
            icon="cloud-f"
            color="text-indigo-30"
            width="24"
            height="24"
          />
        </div>
        <div
          class="flex items-center w-full justify-center"
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
        </div>
      </div>
      <div
        class="base-card flex items-center w-full mb-2 bg-white rounded-md"
      >
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <s-icon
            icon="cloud-f"
            color="text-indigo-30"
            width="24"
            height="24"
          />
        </div>
        <div
          class="flex items-center w-full justify-center"
        >
          <img
            src="/img/services/kubernetes-full.svg"
            alt="kubernetes logo"
          >
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import PerfectScrollbar from '@/components/PerfectScrollbar.vue'

@Component({
  name: 'Architecture',
  components: {
    PerfectScrollbar,
    SText,
    SIcon
  }
})
export default class Architecture extends Vue {
  @Prop({ type: Array, default: [] }) readonly services!: Array<string>
}
</script>
