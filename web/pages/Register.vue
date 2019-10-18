<template>
  <div class="content-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
    </div>
    <div class="register-wrapper">
      <button class="btn btn-register" @click="loginGithub">
        <font-awesome-icon :icon="['fab', 'github']" />
        Sign in with GitHub
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: mapState({
    users: state => state.users
  }),
  asyncData({ $sanity }) {
    const query = `{"blocks": *[_type == "page" && slug.current == "register"][0]{
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
      }
    }`
    return $sanity.fetch(query)
  },
  methods: {
    loginGithub() {
      this.$auth.loginWith('github')
      this.$store.dispatch('setAuthUser', this.$auth.user)
    }
  }
}
</script>

<style></style>
