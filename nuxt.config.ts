const packageJSON = require('./package.json');

const env = {
};

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            appVersion: packageJSON.version,
            ...env
        }
    },

    css: [
        '~/assets/styles/main.scss'
    ],

    devtools: { enabled: true },

    extends: [
        'packages/auth',
        'packages/ui',
    ]
})
