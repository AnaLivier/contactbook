// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ContactStore } from './utils/contactStore'

// Initialize sample data when app starts
ContactStore.initializeSampleData()

const app = createApp(App)

app.use(router)

app.mount('#app')