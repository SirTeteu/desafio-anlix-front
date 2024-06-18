import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Router
import router from './router/router.js';

// Components
import App from './App.vue'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi'
    },

    components,
    directives,
});

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
