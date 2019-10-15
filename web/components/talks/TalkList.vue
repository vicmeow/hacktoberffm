<template>
  <div class="talk-list">
    <talk-item v-for="talk in talks" :key="talk._id" :talk="talk" />
  </div>
</template>

<script>
import TalkItem from '@/components/talks/TalkItem'
export default {
  components: {
    TalkItem
  },
  props: ['talks']
}
</script>
