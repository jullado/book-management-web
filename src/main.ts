import { createApp } from 'vue'
import './css/style.css'

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Router
import router from './router'

// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
const vuetify = createVuetify({
  components,
  directives,
})

// Components
import App from './App.vue'

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')
