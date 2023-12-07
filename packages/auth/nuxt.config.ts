const packageJSON = require('./package.json');

const env = {
    serverOrigin: process.env.SERVER_ORIGIN,
};

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            appAuthPackageVersion: packageJSON.version,
            ...env
        }
    },

    localAuth: {
        origin: env.serverOrigin,
        pages: {
            auth: '/signin',
            protectAllPages: true
        },
        endpoints: {
            signIn: { path: 'auth', method: 'POST' },
            signUp: { path: 'auth/reg', method: 'POST' },
            getMe: { path: 'users/me', method: 'GET' }
        }
    },

    modules: ['nuxt-local-auth']
});
