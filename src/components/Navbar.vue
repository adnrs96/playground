<template>
  <nav class="flex items-center flex-no-wrap bg-white px-6 h-14 shadow-navbar border-solid border-b border-gray-20 z-20">
    <div
      id="home-btn-logo"
      class="flex items-center mr-6 cursor-pointer"
      @click="$router.push({ name: 'playground' })"
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
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'

@Component({
  name: 'Navbar',
  components: {
    SIcon
  }
})
export default class Navbar extends Vue {
}
</script>
