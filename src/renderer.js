import {createApp} from 'vue';
import {createMemoryHistory, createRouter} from 'vue-router'
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import MainView from "./views/MainView.vue";
import TraineeView from "./views/TraineeView.vue";


const routes = [
    {path: '/', component: MainView},
    {path: '/trainee', component: TraineeView},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    }
})


const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(VueSweetalert2)
app.mount('#app');
