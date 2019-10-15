<template>
  <div class="layout-wrapper">
    <button class="btn-toggle" tabIndex="0" @click="isOpen = !isOpen">
      <span v-if="isOpen">&#8592; Close</span>
      <span v-else>Menu -></span>
    </button>
    <the-nav :is-open="isOpen" @click="isOpen = !isOpen" />
    <nuxt />
  </div>
</template>

<script>
import TheNav from '@/components/TheNav'
export default {
  components: {
    TheNav
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
