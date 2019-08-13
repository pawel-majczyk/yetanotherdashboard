const env = require('dotenv').config()

console.log(env)

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/yetanotherdashboard/',
          mode: 'hash'
        }
      }
    : {}

export default {
  ...routerBase,
  mode: 'spa',
  /* Headers of the page */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /* Customize the progress-bar color */
  loading: { color: '#fff' },
  /* Global CSS */
  css: ['~/assets/global_styles.css'],
  // ant-design-vue - disabled bacause babel-import-plugin handles
  // css: ['ant-design-vue/dist/antd.min.css'],
  // css: [
  //   {
  //     src: 'ant-design-vue/dist/antd.less',
  //     lang: 'less'
  //   }
  // ],
  /* Plugins to load before mounting the App */
  server: {
    port: '8080',
    host: '0.0.0.0'
  },
  plugins: ['@/plugins/antd-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /* Nuxt.js modules */
  modules: [],
  /* Build configuration */
  build: {
    /* You can extend webpack config here */
    extend(config, ctx) {
      ctx.loaders.less.javascriptEnabled = true
    },
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es', // default: lib
            style: true
          }
        ]
      ]
    }
  }
}
