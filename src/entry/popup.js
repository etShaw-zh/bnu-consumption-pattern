import { createApp } from 'vue'
import App from '../view/popup.vue'
import {ElButton} from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElButton)
app.mount('#app')
