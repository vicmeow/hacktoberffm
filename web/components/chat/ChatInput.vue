<template>
  <div class="chat-input">
    <form class="chat-form" autocomplete="off" @submit.prevent="submitComment">
      <div class="input-wrapper name-input">
        <label class="label label-hidden" for="name-input">Name:</label>
        <input
          id="name-input"
          v-model="name.value"
          class="input-field input-name"
          type="text"
          placeholder="Your name"
        />
        <div v-if="name.error" class="error-message">
          {{ errorMessage.name }}
        </div>
      </div>
      <div class="input-wrapper comment-wrapper">
        <div class="wrapper-grow">
          <label class="label label-hidden">Comment:</label>
          <textarea-autosize
            ref="myTextarea"
            v-model="comment.value"
            class="input-field input-comment"
            :class="{ 'is-hidden': hideComment }"
            placeholder="Type something here..."
            :style="
              textareaHeight && {
                height: textareaHeight,
                transition: 'transition: height .1s linear;'
              }
            "
            :max-height="120"
            @keydown.native.enter.exact.prevent
            @keydown.native.enter.shift="setHeight"
            @input="setHeight"
            @keyup.native.enter.exact="submitComment"
          />
          <div v-if="comment.error" class="error-message">
            {{ errorMessage.comment }}
          </div>
        </div>
        <chat-button @submit.native="submitComment">
          <font-awesome-icon
            class="send-icon"
            :icon="['fas', 'arrow-up']"
            :class="{ 'send-status': isSent }"
          />
        </chat-button>
      </div>
      <div class="label char-count">{{ length.comment }}/{{ comment.max }}</div>
      <div v-if="hasSubmitError" class="submit-error error-message">
        Something went wrong. Try again.
      </div>
    </form>
  </div>
</template>

<script>
import ChatButton from '@/components/chat/ChatButton'
export default {
  components: {
    ChatButton
  },
  data() {
    return {
      name: {
        value: null,
        min: 5,
        max: 20,
        error: null
      },
      comment: {
        value: null,
        min: 5,
        max: 240,
        error: null
      },
      isSubmitted: false,
      isSent: false,
      hasSubmitError: false,
      hideComment: false,
      textareaHeight: '2rem'
    }
  },
  computed: {
    length() {
      const name = this.name.value
      const comment = this.comment.value
      return {
        name: typeof name === 'string' ? name.split('').length : 0,
        comment: typeof comment === 'string' ? comment.split('').length : 0
      }
    },
    errorMessage() {
      const length = this.length
      const name = this.name
      const comment = this.comment
      const nameMessage =
        length.name < name.min
          ? `min. ${name.min} characters (${length.name})`
          : `max. ${name.max} characters (${length.name})`
      const commentMessage =
        length.comment < comment.min
          ? `min. ${comment.min} characters (${length.comment})`
          : `max. ${comment.max} characters (${length.comment})`
      return {
        name: nameMessage,
        comment: commentMessage
      }
    }
  },
  watch: {
    'name.value'() {
      if (this.isSubmitted) {
        const { value, min, max } = this.name
        const length = this.length.name
        console.log(value)
        if (length >= min && length <= max) {
          this.name.error = null
          this.$emit('height')
        }
        if (length < min || length > max) {
          this.name.error = true
          this.$emit('height')
        }
      }
    },
    'comment.value'() {
      if (this.isSubmitted) {
        const { value, min, max } = this.comment
        const length = this.length.comment
        console.log(value)
        if (length >= min && length <= max) {
          this.comment.error = null
        }
        if (length < min || length > max) {
          this.comment.error = true
        }
      }
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      const user = {
        name: this.$auth.user.login,
        id: this.$auth.user.id
      }
      this.$store.dispatch('setAuthUser', user)
      this.name.value = user.name
    }
  },
  methods: {
    setHeight(e) {
      if (e && e.keyCode) {
        if (e.keyCode === 13 && e.shiftKey) {
          this.textareaHeight = false
        }
      }
      if (length.comment > 29) {
        this.textareaHeight = false
      }
    },
    autoSize() {
      const comment = this.$refs.inputComment
      setTimeout(() => {
        comment.style.cssText = 'height:auto; padding:0;'
        comment.style.cssText = 'height:' + comment.scrollHeight + 'px'
      }, 0)
    },
    submitComment() {
      // Send status for animation
      this.isSent = true
      this.$emit('scroll')
      // Submit status for continous validation
      this.isSubmitted = true
      // hide comment input
      this.hideComment = true
      // Send only if valid
      if (this.validateComment()) {
        const chatUser = this.$store.state.authUser
        const comment = {
          _type: 'comment',
          name: this.name.value,
          content: this.comment.value,
          user: {
            _type: 'reference',
            _ref: `user-${chatUser.id}`,
            weak: true
          }
        }
        this.$sanity
          .create(comment)
          .then(() => {
            this.textareaHeight = '2rem'
            this.resetComment()
            this.hideComment = false
            this.isSent = false
            this.isSubmitted = false
          })
          .catch(error => {
            this.hideComment = false
            this.isSent = false
            this.hasSubmitError = true
            console.log(error)
          })
      }
    },
    resetComment() {
      this.comment.value = null
    },
    validateComment() {
      const name = this.name
      const comment = this.comment
      const isValidName = this.validateInput(name)
      const isValidComment = this.validateInput(comment)

      if (!isValidName) {
        this.hideComment = false
        this.isSent = false
        name.error = true
      }
      if (!isValidComment) {
        this.isSent = false
        this.hideComment = false
        comment.error = true
      }

      if (!isValidName || !isValidComment) {
        return false
      }

      if (isValidName && isValidComment) {
        return true
      }
    },
    validateInput(test) {
      if (typeof test.value === 'string') {
        const length = test.value.split('').length
        return length >= test.min && length <= test.max
      }
    }
  }
}
</script>

<style scoped>
.chat-input {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chat-form {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.input-field {
  font: inherit;
  background: 0;
  border: 0;
  color: #fff;
  flex-grow: 1;
}

.input-field:focus {
  outline: 0;
}

.input-field:-internal-autofill-selected {
  background-color: transparent;
}

.input-field::placeholder {
  color: #fff;
  opacity: 0.5;
}

.input-name {
  font-size: 0.85rem;
  opacity: 0.5;
}

.input-name:focus {
  opacity: 1;
}

.wrapper-grow {
  flex-grow: 1;
}

.label-hidden {
  display: none;
}

.error-message {
  color: red;
  margin-bottom: 0.5rem;
}

.char-count,
.error-message {
  font-size: 0.7rem;
  opacity: 0.8;
}

.char-count {
  flex-basis: 100%;
}

.comment-wrapper {
  display: flex;
  height: 100%;
  align-items: flex-end;
  flex-wrap: wrap;
}

.input-comment {
  overflow: hidden;
  display: block;
  transition: all 0.1s linear;
  display: block;
  width: 100%;
  margin-right: 1rem;
  padding: 0;
}

.is-hidden {
  opacity: 0;
}

.send-icon {
  transition: all 0.1s linear;
}

.send-status {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
