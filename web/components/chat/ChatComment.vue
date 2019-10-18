<template>
  <div class="chat-comment">
    <div class="comment-meta">{{ comment.name }} @ {{ timestamp }}</div>
    <div class="comment-content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp() {
      return new Date(this.comment._createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.chat-comment {
  margin-bottom: 1rem;
}

.comment-meta {
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
