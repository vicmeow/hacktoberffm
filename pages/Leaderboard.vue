<template>
  <div class="content-wrapper">
    <block-content :blocks="content.body" :serializers="serializers" />
  </div>
</template>

<script>
import SponsorList from '@/components/SponsorList'
export default {
  components: {},
  data() {
    return {
      serializers: {
        marks: {
          sponsors: SponsorList
        }
      }
    }
  },
  asyncData({ $sanity }) {
    const query =
      '{"content": *[_type == "content" && slug.current == "leaderboard"][0]{body}}'
    return $sanity.fetch(query)
  }
}
</script>

<style></style>
