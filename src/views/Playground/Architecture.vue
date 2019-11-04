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
    <perfect-scrollbar class="bg-gray-10 p-8 h-80">
      <div
        v-for="(r, idx) in architecture"
        :key="`row-${idx}`"
        class="flex"
      >
        <div
          v-for="(c, idx2) in r"
          :key="`card-${idx2}`"
          class="card flex items-center bg-white rounded-md w-full mb-2"
          :class="{'mr-2': idx2 !== r.length - 1}"
        >
          <div
            class="px-6 my-3 py-3 border-r border-gray-20"
          >
            <div
              class="w-6 h-6"
            >
              <img
                :src="`/img/services/${c.icon}.svg`"
                :alt="`${c.icon} logo`"
              >
            </div>
          </div>
          <div class="flex items-center justify-end w-full p-4">
            <!-- text-green-70 text-red-70 -->
            <s-text
              p="5"
              weight="bold"
              :color="`text-${c.health === 1 ? 'green' : 'red'}-70`"
            >
              {{ c.health === 1 ? 'Healthy' : 'Not-working' }}
            </s-text>

            <s-icon
              v-if="c.health === 1"
              icon="check"
              color="text-green-50"
              class="bg-green-10 border border-green-30 rounded-full w-6 h-6 flex items-center justify-center ml-3"
            />

            <s-icon
              v-else
              icon="cross"
              color="text-red-50"
              class="bg-red-10 border border-red-30 rounded-full w-6 h-6 flex items-center justify-center ml-3"
            />
          </div>
        </div>
      </div>

      <div
        v-for="(c, idx) in baseArch"
        :key="`base-card-${idx}`"
        class="base-card flex items-center w-full mb-2 bg-white rounded-md"
      >
        <div class="px-6 my-3 py-3 border-r border-gray-20">
          <s-icon
            :icon="c.icon"
            color="text-indigo-30"
            width="24"
            height="24"
          />
        </div>
        <div class="flex justify-center w-full items-center">
          <s-text v-if="c.hasOwnProperty('text')">
            {{ c.text }}
          </s-text>
          <img
            v-else-if="c.hasOwnProperty('img')"
            :src="`/img/services/${c.img.path}.svg`"
            :alt="c.img.alt"
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
import { IService, IArchitectureBlock } from '@/models/StorySample'

@Component({
  name: 'Architecture',
  components: {
    PerfectScrollbar,
    SText,
    SIcon
  }
})
export default class Architecture extends Vue {
  @Prop({ type: Array, default: [] }) readonly architecture!: IArchitectureBlock[][]

  private baseArch: any[] = [
    { icon: 'cloud-f', text: 'Storyscript Orchestrator' },
    { icon: 'cloud-f', img: { path: 'kubernetes-full', alt: 'kubernetes logo with text' } }
  ]
}
</script>
