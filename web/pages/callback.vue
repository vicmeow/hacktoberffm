<template>
  <div class="content-wrapper callback">
    Logging you in...
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/leaderboard')
    }
  }
}
</script>
