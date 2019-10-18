<template>
  <div class="leaderboard-wrapper">
    <div v-for="type in blocks.content" :key="type._id">
      <block-content
        v-if="type._type === 'blockContent'"
        :blocks="type.content"
        :serializers="serializers"
      />
    </div>
    <div class="leaderboard-list">
      <leaderboard-item v-for="user in users" :user="user" :key="user._id" />
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
    if (this.$auth.loggedIn) {
      if (!this.$store.state.isListeningUsers) {
        this.$store.dispatch('startListener', 'users')
      }
      // Open connection to server that checks for user updates
      // this.socket1 = this.$nuxtSocket({
      //   name: 'leaderboard',
      //   channel: '/',
      //   reconnection: false
      // })
      this.$store.dispatch('fetchUsers')
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
