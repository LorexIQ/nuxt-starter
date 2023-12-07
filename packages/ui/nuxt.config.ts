import { resolve } from 'path';

export default defineNuxtConfig({
    components: [
        { path: './components/', pathPrefix: false, prefix: 'ui' },
    ],

    alias: {
        '@uiColors': resolve(__dirname, './assets/colors.scss')
    }
});
