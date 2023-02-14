import { createApp } from 'vue'
import App from '../view/devtools.vue'
chrome.devtools.panels.create('bnu-consumption-pattern', '', 'devtools.html')
createApp(App).mount('#app')
