import { reactive } from 'vue';

export const globalStore = reactive({
  userType: localStorage.getItem('userType') || 'Cliente',
  auth_token: localStorage.getItem('auth_token') || null,
});