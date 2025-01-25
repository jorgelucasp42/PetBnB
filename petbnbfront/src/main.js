import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o roteador

const app = createApp(App);

app.use(router); // Adiciona o roteador à aplicação
app.mount('#app');
