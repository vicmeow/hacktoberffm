<template>
  <div class="sponsor-card">
    <div v-if="sponsor.logo" class="sponsor-logo">
      <img :src="sponsor.logo" :alt="sponsor.logo" class="img-logo" />
    </div>
    <div class="sponsor-info">
      <h3 class="sponsor-name">
        <a class="sponsor-link" :href="sponsor.link">{{ sponsor.name }}</a>
      </h3>
      <p class="sponsor-description">
        {{ sponsor.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sponsor']
}
</script>

<style scoped>
.sponsor-card {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sponsor-logo {
  display: flex;
  margin-right: 1.5rem;
  max-width: 90px;
  width: 100%;
}

.sponsor-name,
.sponsor-description {
  margin: 0;
}

.sponsor-name {
  font-weight: bold;
}

.sponsor-link {
  border: 0;
}

.sponsor-link::after {
  content: '->';
  margin-left: 0.5rem;
  color: #fff922;
  transition: all 0.3s linear;
}

.sponsor-link:hover::after {
  color: #ff00aa;
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .sponsor-card {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .sponsor-logo {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
