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
  data() {
    return {
      sponsors: []
    }
  },
  mounted() {
    const query =
      '*[_type == "sponsor"]{name, description, "logo": logo.asset->url, link}'
    this.$sanity.fetch(query).then(result => {
      this.sponsors = result
    })
  }
}
</script>

<style scoped>
.sponsor-list {
  outline: 1px solid transparent;
}
</style>
