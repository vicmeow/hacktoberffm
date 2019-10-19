<template>
  <div class="sponsor-list">
    <sponsor-card
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      :sponsor="sponsor"
    />
  </div>
</template>

<script>
import SponsorCard from '@/components/SponsorCard'
export default {
  components: {
    SponsorCard
  },
  props: {
    sponsors: {
      type: Array,
      required: true
    }
  }
}
</script>
