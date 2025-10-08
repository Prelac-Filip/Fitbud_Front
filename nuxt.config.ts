// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/test-utils',
    'nuxt-mail',
  ],

  devtools: {
    enabled: true
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "FitBud",
      htmlAttrs: {
        lang: "en",
      },
      script: [
        {
          src: "https://unpkg.com/tailwindcss-intersect@2.x.x/dist/observer.min.js",
          defer: true,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
  },

  runtimeConfig: {
    emailPass: process.env.NUXT_EMAIL_PASS, 
    public: {
      emailUser: process.env.NUXT_PUBLIC_EMAIL_USER,
    }
  },

  mail: {
    message: {
      to: process.env.NUXT_PUBLIC_EMAIL_USER,
    },
    smtp: {
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
          user: process.env.NUXT_PUBLIC_EMAIL_USER,
          pass: process.env.NUXT_EMAIL_PASS,
        },
    },
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})