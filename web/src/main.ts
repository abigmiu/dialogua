import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/style/style.css';
import 'virtual:windi.css';
import App from './App.vue';
import { setGlobalOptions } from 'vue-request';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import '@icon-park/vue-next/styles/index.css';

import router from './router';

setGlobalOptions({
    loadingDelay: 300,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
