<template>
  <div class="speaker-bio">
    <button class="btn-toggle-bio" @click="isOpen = !isOpen">
      <h4 class="bio-title">
        <div
          aria-hidden="true"
          class="toggle-icon"
          :class="{ 'is-open': isOpen }"
          v-text="'>'"
        />
        Speaker Bio
      </h4>
    </button>
    <p
      ref="bioContent"
      class="bio-content"
      :class="{ 'is-open': isOpen }"
      :style="{ height: `${isOpen ? height : 0}px` }"
    >
      {{ bio }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bio: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: true,
      height: null
    }
  },
  mounted() {
    this.isOpen = false
    this.height = this.$refs.bioContent.scrollHeight
  }
}
</script>

<style scoped>
.speaker-card {
  margin-bottom: 1.5rem;
}

.bio-title {
  display: flex;
  align-items: baseline;
  font-weight: bold;
  margin: 0;
  margin: 1rem 0 0.25rem 0;
  cursor: pointer;
}

.toggle-icon {
  font-weight: bold;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  color: #fff922;
}

.toggle-icon.is-open {
  transform: rotate(90deg);
}

.bio-content {
  height: 0px;
  opacity: 0;
  transition: all 0.3s linear;
  overflow: hidden;
  margin: 0;
}

.bio-content.is-open {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .speaker-card {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .speaker-logo {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
