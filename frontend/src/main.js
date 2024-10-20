import { createApp } from 'vue';
import router from './router';
import './style.css';
import App from './App.vue';

const app = createApp(App);
hljs.highlightAll();

app.use(router);
app.mount('#app');



