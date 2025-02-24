import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/LoginScreen.vue';
import ConfirmarNumeroScreen from './components/ConfirmarNumeroScreen.vue';
import RegistroScreen from './components/RegistroScreen.vue';
import EnderecoScreen from './components/EnderecoScreen.vue';
import AreaPrestadorScreen from './components/AreaPrestadorScreen.vue';
import BuscaServicoScreen from './components/BuscaServicoScreen.vue';
import PrestaorPerfilScreen from './components/PrestaorPerfilScreen.vue';
//import { component } from 'vue/types/umd';
import CadastroPetScreen from './components/CadastroPetScreen.vue';

const routes = [
  { path: '/', component: LoginScreen },       // Rota para o componente Home
  { path: '/confirmaNum', component: ConfirmarNumeroScreen },
  { path: '/registro', component: RegistroScreen },
  { path: '/endereco', component: EnderecoScreen },
  { path: '/areaprestador', component: AreaPrestadorScreen },
  { path: '/buscarservico', component: BuscaServicoScreen },
  { path: '/prestadorperfil', component: PrestaorPerfilScreen },
  { path: '/cadastroPet', component: CadastroPetScreen}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
