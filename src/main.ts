import { createApp } from 'vue'
import App from './vApp21.vue'

const app = createApp(App)

app.mount('#app')


app.provide('currentUser', { name : 'vi' })