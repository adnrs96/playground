<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-6xl text-gray-80 leading-80 font-body mb-10">
      Not found
    </p>
    <button
      black
      @click="$router.push({ name: 'studio' })"
    >
      Go back home
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'NotFound',
  components: { }
})
export default class NotFound extends Vue { }
</script>
