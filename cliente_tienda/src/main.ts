import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/global.css';
import './assets/base.css'


createApp(App).use(router).use(Toast).mount('#app');
