<template>
  <button
    class="btn-submit"
    @click="$emit('submit')"
    @keydown.enter="$emit('submit')"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn-submit {
  background: #ff00aa;
  display: flex;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  line-height: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
