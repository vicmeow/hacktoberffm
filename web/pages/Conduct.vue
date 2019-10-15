<template>
  <div class="content-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
      />
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $sanity }) {
    const query =
      '{"blocks": *[_type == "page" && slug.current == "conduct"][0]}'
    return $sanity.fetch(query)
  }
}
</script>
