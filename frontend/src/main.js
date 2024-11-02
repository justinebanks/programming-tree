import { createApp } from 'vue';
import router from './router';
import './style.css';
import App from './App.vue';
import store from './store';
import axios from 'axios';

axios.defaults.withCredentials = true;

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(store);
app.use(router);
app.mount('#app')





