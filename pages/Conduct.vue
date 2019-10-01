<template>
  <div class="content-wrapper">
    <block-content :blocks="content.body" />
  </div>
</template>

<script>
export default {
  asyncData({ $sanity }) {
    const query =
      '{"content": *[_type == "content" && slug.current == "code-of-conduct"][0]{title, body}}'
    return $sanity.fetch(query)
  }
}
</script>
