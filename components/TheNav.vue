<template>
  <div class="nav-wrapper" :class="{ 'is-open': isOpen }">
    <div class="nav">
      <div class="logo">
        <nuxt-link to="/">
          <img src="/logo.png" />
        </nuxt-link>
      </div>
      <nav class="nav-links">
        <nuxt-link
          v-for="link in nav"
          :key="link.slug"
          :to="link.slug"
          class="nav-link"
          @click.native="$emit('click')"
        >
          {{ link.title }}
        </nuxt-link>
        <nuxt-link class="nav-btn" to="/register">
          Register
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
  data() {
    return {
      nav: [
        {
          title: 'Home',
          slug: '/'
        },
        {
          title: 'Agenda',
          slug: '/agenda'
        },
        {
          title: 'Leaderboard',
          slug: '/leaderboard'
        },
        {
          title: 'Resources',
          slug: '/resources'
        },
        {
          title: 'Code of Conduct',
          slug: '/conduct'
        }
      ]
    }
  }
}
</script>

<style scoped>
.nav-wrapper {
  max-width: 350px;
  width: 100%;
  padding: 1rem 1rem;
  flex-shrink: 1;
}

.logo {
  display: flex;
  max-width: 300px;
  margin-bottom: 1rem;
}

.logo img {
  display: block;
  width: 100%;
  height: 100%;
}

.nav {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-links {
  max-width: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: #ebe8ef;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  transition: all 0.3s linear;
  border-bottom: 2px solid transparent;
  align-self: center;
}

.nav-link::before {
  position: absolute;
  left: -1.5rem;
  opacity: 0;
  content: '>';
  color: inherit;
  transition: all 0.3s linear;
  color: #fff922;
}

.nav-link:hover,
.nav-link:focus {
  color: #ff00aa;
  outline: 0;
}

.nav-link:hover::before {
  opacity: 0;
}

.nuxt-link-exact-active::before,
.nuxt-link-exact-active:hover::before {
  opacity: 1;
}

.nav-btn {
  position: relative;
  color: #fff;
  text-decoration: none;
  align-self: center;
  font: inherit;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s linear;
  background: #ff00aa;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
}

.nav-btn:hover {
  transform: scale(1.03);
}

.nav-btn:focus {
  outline: 0;
  background: #fff922;
  color: #ff00aa;
}

@media screen and (max-width: 768px) {
  .nav-wrapper {
    position: fixed;
    transform: translateX(-350px);
    transition: all 0.3s linear;
    background-color: #172344;
    background-image: url('../static/bg.png');
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
  }
  .is-open {
    transform: translateX(0);
  }
}
</style>
