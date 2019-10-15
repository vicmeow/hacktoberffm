<template>
  <div class="content-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
      <sponsor-list v-if="type._type === 'list'" :sponsors="type.sponsors" />
    </div>
  </div>
</template>

<script>
import SponsorList from '@/components/SponsorList'
export default {
  components: {
    SponsorList
  },
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
    const query = `{"blocks": *[_type == "page" && slug.current == "home"][0]{
      _id,
      content[]{
        _type,
        "sponsors": item[]->{name, description, "logo": logo.asset->url, link},
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
      }
    }`
    return $sanity.fetch(query)
  }
}
</script>

<style></style>
