<template>
  <div
    ref="chatApp"
    class="chat-app"
    :style="{ 'max-height': `calc(100vh - ${logoHeight}px)` }"
  >
    <div ref="chatInput" class="chat-input-wrapper">
      <chat-input @scroll="scroll = true" />
    </div>
    <chat-feed ref="chatFeed" :comments="comments" :scroll="scroll" />
  </div>
</template>

<script>
// TODO:
// - Add open and close chat feature
import ChatFeed from '@/components/chat/ChatFeed'
import ChatInput from '@/components/chat/ChatInput'
export default {
  components: {
    ChatFeed,
    ChatInput
  },
  props: {
    logoHeight: {
      type: Number,
      default: 200
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scroll: false
    }
  },
  watch: {
    scroll() {
      setTimeout(() => {
        this.scroll = false
      }, 100)
    }
  }
}
</script>

<style scoped>
.chat-app {
  flex: 1;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  font-size: 0.95rem;
}

.chat-feed {
  flex-grow: 1;
  width: 100%;
  overflow: auto;
}

.chat-input-wrapper {
  padding-bottom: 0.5em;
  background: #121d3a;
  border-radius: 5px;
  width: 100%;
  align-self: flex-end;
}
/* background: rgba(18, 29, 58, 0.6); */
</style>
