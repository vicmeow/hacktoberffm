<template>
  <div class="content-wrapper">
    <block-content :blocks="content.body" :serializers="serializers" />
  </div>
</template>

<script>
export default {
  components: {},
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
    const query = `{"content": *[_type == "content" && slug.current == "register"][0]{
      body[]{
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
