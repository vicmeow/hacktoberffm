<template>
  <div class="leaderboard-item">
    <div class="avatar">
      <hexagon-image :url="user.avatar_url" />
    </div>
    <div class="user-name">{{ user.name }}</div>
    <div class="user-latest">
      <a class="inline-link" :href="user.latest_pr.url">{{
        user.latest_pr.title
      }}</a>
    </div>
    <div class="user-progress">{{ user.pr_count }}/4</div>
    <!-- <div class="user-latest-timestamp">{{ user.latest_pr.timestamp }}</div> -->
  </div>
</template>

<script>
import HexagonImage from '@/components/talks/HexagonImage'
export default {
  components: {
    HexagonImage
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style>
.leaderboard-item {
  display: grid;
  grid-template-columns: auto min-content 3fr auto;
  gap: 0.5rem 1.5rem;
  align-items: center;
  max-height: 80px;
}

.avatar {
  display: flex;
  max-width: 100px;
  max-height: 100px;
}

.avatar .hexagon-image {
  transform: scale(0.8);
}

.avatar #hex-inner {
  margin: 0;
  transform: scale(0.8);
}
</style>
