const packageJSON = require('./package.json');

const env = {
    serverOrigin: process.env.SERVER_ORIGIN,
};

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            appAuthPackageVersion: packageJSON.version,
            ...env
        }
    },

    localAuth: {
        origin: env.serverOrigin,
        pages: {
            protectAllPages: true,
            serverIsDown: undefined
        },
        endpoints: {
            signIn: { path: 'Auth/user', method: 'POST' },
            signUp: { path: 'Auth/user/create', method: 'POST' },
            getMe: { path: 'User', method: 'GET' }
        }
    },

    modules: ['nuxt-local-auth']
});
