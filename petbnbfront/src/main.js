import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o roteador
import VueTheMask from 'vue-the-mask';
const app = createApp(App);

app.use(router); // Adiciona o roteador à aplicação
app.use(VueTheMask);
app.mount('#app');
