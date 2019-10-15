<template>
  <div class="talk-info">
    <div class="speaker-image">
      <hexagon-image :id="talk.speaker._id" :image="talk.speaker.image" />
    </div>
    <div class="talk-content">
      <h3 class="talk-title">
        {{ talk.title }}
        <span class="talk-language">({{ talk.language }})</span>
      </h3>
      <div class="talk-meta">
        <p class="talk-speaker">{{ talk.type }} by {{ talk.speaker.name }}</p>
        <span class="meta-links">
          <a
            v-for="link in talk.speaker.links"
            :key="link.index"
            class="speaker-link"
            :href="link.url"
          >
            <font-awesome-icon
              aria-role="img"
              aria-hidden="true"
              :aria-label="link.title"
              class="link-icon"
              :icon="[
                link.title === 'link' ? 'fas' : 'fab',
                `${link.title.toLowerCase()}`
              ]"
            />
          </a>
        </span>
      </div>
      <p class="talk-description">
        {{ talk.description }}
      </p>
      <speaker-bio :bio="talk.speaker.bio" />
    </div>
  </div>
</template>

<script>
import HexagonImage from '@/components/talks/HexagonImage'
import SpeakerBio from '@/components/talks/SpeakerBio'
export default {
  components: {
    SpeakerBio,
    HexagonImage
  },
  props: {
    talk: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.talk-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.talk-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
}

.talk-language {
  text-transform: uppercase;
}

.talk-meta {
  display: flex;
  align-items: center;
}

.toggle-description {
  display: none;
}

.talk-speaker {
  margin: 0 1rem 0 0;
  font-size: 0.9em;
}

.talk-speaker::first-letter {
  text-transform: uppercase;
}

.speaker-link {
  color: inherit;
  transition: all 0.3s linear;
  margin-right: 0.5rem;
  color: #ff00aa;
}

.speaker-link:hover,
.speaker-link:focus {
  color: #fff922;
}

.link-icon {
  font-size: 1.25rem;
}

.speaker-image {
  flex-shrink: 0;
  display: flex;
  margin-right: 1rem;
  max-width: 150px;
  max-height: 150px;
  width: 100%;
  height: 100%;
  transform: rotate(-5deg);
}

.talk-description {
  margin: 0.5rem 0 0 0;
}

.talk-type {
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
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

.description-toggle {
  display: flex;
  align-items: baseline;
  font-weight: bold;
  margin: 0;
  margin: 1rem 0 0.25rem 0;
}

@media screen and (max-width: 768px) {
  .talk-info {
    position: relative;
    flex-direction: column;
  }

  .speaker-image {
    align-self: center;
    margin-bottom: -1rem;
  }

  .talk-meta {
    display: block;
  }

  .talk-speaker {
    margin-bottom: 0.25rem;
  }
}
</style>
