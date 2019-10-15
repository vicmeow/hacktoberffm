const options = {
  url: 'https://hacktoberffm.de',
  title: 'Hacktoberfest Frankfurt',
  description:
    'Hacktoberfest Frankfurt is a community event organised around Hacktoberfest, a month long celebration of open source software, where the Rhein Main tech community gets together for a night of food, drinks and hacking.',
  img: 'https://hacktoberffm.de/twitter.png',
  twitter: '@hacktoberffm',
  themeColor: '#152347'
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: options.description
      },
      { name: 'author', content: options.url },
      { name: 'publisher', content: options.url },
      { name: 'apple-mobile-web-app-title', content: options.title },
      { name: 'theme-color', content: options.themeColor },
      // Fb
      { name: 'og:title', content: options.title },
      { name: 'og:description', content: options.description },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: options.url },
      { name: 'og:image', content: options.img },
      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: options.twitter },
      { name: 'twitter:creator', content: options.twitter },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: options.img }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/css/global.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/block-content',
    '~/plugins/font-awesome',
    '~/plugins/textarea-resize'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', 'nuxt-sanity'],
  sanity: {
    projectId: 'eu51wv3p', // required
    dataset: 'prod', // required
    token:
      'skZI9vWGEJ74QfboOioTyIwSGXchaiO2yOyaQ8qrcc90LRDOHkepMlAHvmdVwtbVlFJtDNnpgWjfv6Xc1KmQ1jnr4otmM4xZrbPvWf15WIe8mJoaIVtPVuLg0nofxQ3eLbg7TRFD6XpN3l5oCWPp0TvJxzp1OZAdWo5UV17REuTTwcGNXTxf'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    /* extend(config, ctx) {} */
  }
}
