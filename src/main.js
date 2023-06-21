import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-toastification/dist/index.css';
import 'bulma/css/bulma.css'
import Toast from "vue-toastification";
import VueTheMask from "vue-the-mask";

createApp(App).use(store).use(Toast).use(VueTheMask).use(router).mount('#app')
