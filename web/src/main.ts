import { createApp } from 'vue';
import './assets/style/style.css';
import 'virtual:windi.css';
import App from './App.vue';
import 'vant/es/toast/style';

import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
