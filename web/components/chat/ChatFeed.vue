<template>
  <div ref="chatFeed" class="chat-feed">
    <chat-comment
      v-for="comment in comments"
      :key="comment._id"
      :comment="comment"
    />
  </div>
</template>

<script>
import ChatComment from '@/components/chat/ChatComment'

export default {
  components: {
    ChatComment
  },
  props: {
    scroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments
    }
  },
  watch: {
    scroll() {
      this.scrollToBottom()
    }
  },
  mounted() {
    if (!this.$store.state.isListeningChat) {
      this.$store.dispatch('startListener', 'chat')
    }
    this.$store.dispatch('fetchComments')
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      setTimeout(() => {
        this.$refs.chatFeed.scrollTop = this.$refs.chatFeed.scrollHeight
      }, 100)
    }
  }
}
</script>

<style scoped>
.chat-feed {
  position: relative;
  padding: 0 1rem;
  overflow: auto;
  height: 100%;
}
</style>
