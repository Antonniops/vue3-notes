import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)
const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{violet.600}',
          inverseColor: '#ffffff',
          hoverColor: '{violet.400}',
          activeColor: '{violet.500}',
        },
        highlight: {
          background: '{violet.50}',
          focusBackground: '{violet.100}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{emerald.500}',
          inverseColor: '#ffffff',
          hoverColor: '{emerald.400}',
          activeColor: '{emerald.800}',
        },
        highlight: {
          background: '{emerald.50}',
          focusBackground: '{emerald.100}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
    },
  },
})
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})

app.mount('#app')
