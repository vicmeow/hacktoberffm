<template>
  <div class="content-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serializers: {
        marks: {
          internalLink: ({ children, mark }) => {
            const { slug = {} } = mark
            const href = `/${slug.current}`
            return <a href={href}>{children}</a>
          }
        }
      }
    }
  },
  asyncData({ $sanity }) {
    const query = `{
      "blocks": *[_type == "page" && slug.current == "leaderboard"][0]{
        content[]{
          ...,
          content[]{
            ...,
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "slug": @.reference->slug
                }
              }
            }
          }
    }`
    return $sanity.fetch(query)
  }
}
</script>

<style></style>
