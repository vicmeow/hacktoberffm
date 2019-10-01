<template>
  <div class="layout-wrapper">
    <the-nav :is-open="isOpen" @click="isOpen = !isOpen" />
    <button class="btn-toggle" @click="isOpen = !isOpen">
      Menu ->
    </button>
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
