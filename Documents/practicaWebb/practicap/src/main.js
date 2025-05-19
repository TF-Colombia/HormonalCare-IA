import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// PrimeVue Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'

// PrimeVue Styles
import Material from '@primeuix/themes/material'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// i18n Setup
import en from './locales/en.json'
import es from './locales/es.json'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        es
    }
})

const app = createApp(App)

// Register PrimeVue Components
app.component('pv-card', Card)
app.component('pv-button', Button)
app.component('pv-toolbar', Toolbar)
app.component('pv-input-text', InputText)
app.component('pv-select-button', SelectButton)

// Use plugins
app.use(router)
app.use(i18n)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.mount('#app')