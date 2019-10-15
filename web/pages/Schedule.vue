<template>
  <div class="content-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
      <talk-list v-if="type.title === 'talks list'" :talks="type.talks" />
    </div>
  </div>
</template>

<script>
import TalkList from '@/components/talks/TalkList'
export default {
  components: {
    TalkList
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
    const query = `{"blocks": *[_type == "page" && slug.current == "schedule"][0]{
      content[]{
        _type,
        title,
        _id,
        "talks": item[]->{_id, title, type, description, language, "speaker": speaker->{name, bio, links, image, _id}},
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
