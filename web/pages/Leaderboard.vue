<template>
  <div class="leaderboard-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
    </div>
    <button
      v-if="$auth.loggedIn"
      class="btn btn-register"
      @click="logoutGithub"
    >
      <font-awesome-icon :icon="['fab', 'github']" />
      Logout
    </button>
    <div class="leaderboard-list">
      <leaderboard-item v-for="user in sorted" :user="user" :key="user._id" />
    </div>
  </div>
</template>

<script>
import LeaderboardItem from '@/components/LeaderboardItem'
export default {
  middleware: 'auth',
  layout: 'chat',
  components: {
    LeaderboardItem
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
  computed: {
    users() {
      return this.$store.state.users
    },
    sorted() {
      return this.$store.state.users
        .slice()
        .sort((a, b) => a.pr_count > b.pr_count)
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
        }
      }`
    return $sanity.fetch(query)
  },
  mounted() {
    if (!this.$store.state.isListeningUsers) {
      this.$store.dispatch('startListener', 'users')
    }

    if (this.$auth.loggedIn) {
      this.$store.dispatch('checkIfUserExists', this.$auth.user)
    }

    this.$store.dispatch('fetchUsers')
  },
  methods: {
    loginGithub() {
      this.$auth.loginWith('github')
    },
    logoutGithub() {
      this.$auth.logout('github')
    }
  }
}
</script>

<style scoped>
.leaderboard-wrapper {
  width: 100%;
  max-with: 100%;
  padding: 1rem;
  margin-right: 2rem;
}
</style>
