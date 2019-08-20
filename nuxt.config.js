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
  loading: { color: '#fff' },
  css: ['~/assets/global_styles.css'],
  server: {
    port: '8080',
    host: '0.0.0.0'
  },
  plugins: ['@/plugins/antd-ui'],
  devModules: ['@nuxtjs/eslint-module'],
  modules: [],
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        console.log(`ctx.isDev: ${ctx.isDev}`)
        console.log(ctx.isClient)
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
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
