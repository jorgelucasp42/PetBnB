<template>
  <div class="login-container">
    <h2>Entre ou Cadastre-se</h2>
    <hr style="margin: 5px 0 10px 0" />
    <div class="welcome-text">
      <span>Bem-Vindo ao <strong>PetB&B</strong></span>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <select v-model="country" class="row-group" id="country">
          <option value="Brasil">Brasil</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Portugal">Portugal</option>
        </select>
        <input
          class="form-group row-group"
          id="num"
          v-mask="phoneMask"
          v-model="phoneNumber"
          placeholder="Número de telefone"
          required
        />

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      </div>

      <button type="submit" class="primary-button">Continuar</button>
    </form>
    <div class="divider">
      <span>ou</span>
    </div>
    <div class="social-login">
      <button class="social-button email">
        <img src="../assets/icons/icons8-nova-mensagem-48.png" alt="" />
        Continuar com Email
      </button>
    </div>
    <div class="user-type-switch">
      <button
        :class="['mr-4', { active: userType === 'Cliente' }]"
        @click="setUserType('Cliente')"
      >
        <span class="material-symbols-outlined" style="font-size: 48px"
          >person</span
        >
        <p>Cliente</p>
      </button>
      <button
        :class="{ active: userType === 'Prestador' }"
        @click="setUserType('Prestador')"
      >
        <span class="material-symbols-outlined" style="font-size: 48px"
          >handshake</span
        >

        <p>Prestador de Serviço</p>
      </button>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/composables/useAuth";
import { useAuthGuard } from "@/composables/useAuthGuard";

export default {
  setup() {
    useAuthGuard();
    const {
      country,
      phoneNumber,
      errorMessage,
      validatePhoneNumber,
      submitForm,
      userType,
      setUserType,
      phoneMask,
    } = useAuth(); // Retorna os dados e métodos do composable
    return {
      country,
      phoneNumber,
      errorMessage,
      validatePhoneNumber,
      submitForm,
      userType,
      setUserType,
      phoneMask,
    };
  },
};
</script>

<style scoped>
html,
body {
  height: 100vh;
}
.login-container {
  text-align: center;
  font-family: Arial, sans-serif;
  padding-left: 20px;
  padding-right: 20px;
}

h2 {
  font-size: 1.2rem;
  color: #333;
}
.welcome-text strong {
  color: #00a000;
}
.welcome-text {
  margin-bottom: 10px;
}
.form-group {
  margin-bottom: 15px;
}
.error-text {
  color: red;
  text-align: left;
  font-size: 0.9rem;
}
input,
select {
  width: 100%;
  padding: 20px;
  margin-top: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.primary-button {
  width: 100%;
  padding: 15px;
  background-color: #00a000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}
.divider {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.divider span {
  margin: 0 10px;
  color: #666;
}
.social-login button {
  width: 100%;
  padding: 15px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  text-align: left;
}
.social-button.google {
  background-color: #fff;
}
.social-button.facebook {
  background-color: #fff;
}
.social-button.email {
  background-color: white;
  color: #000;
}
.user-type-switch {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.user-type-switch button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  background-color: white;
}
.user-type-switch button.active {
  background-color: #00a000;
  color: white;
  border-color: #00a000;
}

#country {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  margin-bottom: 0;
}
#num {
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-top: 0;
}
.row-group {
  display: flex;
  gap: 0;
}

.social-login button {
  display: flex; /* Habilita o layout flex */
  align-items: center; /* Alinha verticalmente os itens no centro */
  justify-content: start; /* Alinha os itens horizontalmente no início */
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  text-align: left;
  gap: 10px; /* Espaço entre a imagem e o texto */
}

.social-login button img {
  width: 20px; /* Define o tamanho do ícone */
  height: 20px;
}
button:hover {
  cursor: pointer;
}
</style>
