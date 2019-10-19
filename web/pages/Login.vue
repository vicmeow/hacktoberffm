<template>
  <div class="content-wrapper">
    <h1>Login</h1>
    <div class="register-wrapper">
      <button v-if="!$auth.loggedIn" class="btn btn-register" @click="login">
        <font-awesome-icon :icon="['fab', 'github']" />
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  components: {},
  data() {
    return {
      error: null,
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
    const query = `{"blocks": *[_type == "page" && slug.current == "login"][0]{
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
    login() {
      this.$auth.loginWith('github').catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style></style>
