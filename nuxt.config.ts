import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    modules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
    css: ['@/assets/scss/main.scss'],
    vite: {
        plugins: [svgLoader()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/variables.scss" as *;'
                }
            }
        }
    },
    imports: {
        dirs: ['store//*', 'api//*', 'composables//*'],
        autoImport: true
    },
    runtimeConfig: {
        public: {
            apiURI: process.env.API_URI,
        }
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true }
});
