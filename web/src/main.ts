import { createApp } from 'vue';
import './assets/style/style.css';
import 'virtual:windi.css';
import App from './App.vue';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import '@icon-park/vue-next/styles/index.css';

import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
