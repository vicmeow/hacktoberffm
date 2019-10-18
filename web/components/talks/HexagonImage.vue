<template>
  <div class="hexagon-image">
    <svg
      id="hex"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <pattern
          :id="`image-bg-${id}`"
          x="0"
          y="0"
          height="100"
          width="100"
          patternUnits="userSpaceOnUse"
        >
          <image
            width="100"
            height="100"
            :xlink:href="url ? url : imageBuilder(image)"
          ></image>
        </pattern>
      </defs>
      <polygon
        id="hex-inner"
        points="100,50 75,93 25,93 0,50 25,6.6 75,6.6"
        :fill="`url('#image-bg-${id}')`"
      ></polygon>
    </svg>
  </div>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'

export default {
  props: ['image', 'id', 'url'],
  computed: {
    imageUrl() {
      return `url('image-bg-${this.id}')`
    }
  },
  methods: {
    imageBuilder(src) {
      const builder = imageUrlBuilder(this.$sanity)
      return builder
        .image(src)
        .size(500, 500)
        .fit('crop')
        .url()
    }
  }
}
</script>

<style scoped>
svg {
  height: 100%;
  width: 100%;
}
#hex {
  margin-top: 1rem;
  margin-left: 1rem;
  stroke: #92eaff;
  stroke-width: 2;
  transform: scale(1.2);
  transform-origin: left;
  filter: drop-shadow(rgba(146, 234, 255, 0.5) 0px 0px 10px);
  display: inline-block;
  transition: all 0.2s linear;
}
</style>

<style>
.talk-info:hover #hex {
  stroke: #ff00aa;
  filter: drop-shadow(rgba(255, 0, 170, 0.9) 0px 0px 10px);
}
</style>
