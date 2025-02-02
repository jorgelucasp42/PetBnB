import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/LoginScreen.vue';
import ConfirmarNumeroScreen from './components/ConfirmarNumeroScreen.vue';
import RegistroScreen from './components/RegistroScreen.vue';
import EnderecoScreen from './components/EnderecoScreen.vue';

const routes = [
  { path: '/', component: LoginScreen },       // Rota para o componente Home
  { path: '/confirmaNum', component: ConfirmarNumeroScreen },
  { path: '/resgistro', component: RegistroScreen },
  { path: '/endereco', component: EnderecoScreen }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
