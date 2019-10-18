if (process.env.NODE_ENV !== 'production') require('dotenv').config()

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
  mode: 'spa',
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
  modules: [
    '@nuxtjs/pwa',
    'nuxt-sanity',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-socket-io'
  ],
  axios: {
    baseURL: 'https://api.github.com/'
  },
  auth: {
    // Options
    plugins: ['~/plugins/auth.js'],
    strategies: {
      github: {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET
      }
    },
    redirect: {
      home: '/',
      logout: '/',
      login: '/login',
      callback: '/leaderboard'
    },
    localStorage: false
  },
  sanity: {
    projectId: 'eu51wv3p', // required
    dataset: 'prod' // required
  },
  io: {
    sockets: [
      {
        name: 'leaderboard',
        url: 'http://localhost:3002',
        default: true,
        vuex: {
          mutations: [],
          actions: ['updateUsers']
        }
      }
    ]
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    /* extend(config, ctx) {} */
  }
}
