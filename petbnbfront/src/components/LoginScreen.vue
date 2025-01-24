<template>
    <div class="login-container">
      <h2>Entre ou Cadastre-se</h2>
      <hr>
      <div class="welcome-text">
        <span>Bem-Vindo ao <strong>PetB&B</strong></span>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group ">
            <br>
          <label for="country">País/Região</label>
          <select id="country" v-model="country" class="row-group">
            <option value="Brasil">Brasil</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Portugal">Portugal</option>
          </select>
          <input
          class="form-group row-group"
          id="num"
            type="text"
            v-model="phoneNumber"
            placeholder="Número de Telefone"
            required
          />
        </div>
        <button type="submit" class="primary-button">Continuar</button>
      </form>
      <div class="divider">
        <span>ou</span>
      </div>
      <div class="social-login">
        <button class="social-button google"><img src="../assets/icons/icons8-google-logo-48.png" alt=""> Continuar com Google</button>
        <button class="social-button facebook"><img src="../assets/icons/icons8-facebook-48.png" alt=""> Continuar com Facebook</button>
        <button class="social-button email"><img src="../assets/icons/icons8-nova-mensagem-48.png" alt=""> Continuar com Email</button>
      </div>
      <div class="user-type-switch">
        <button :class="{ active: userType === 'Cliente' }" @click="setUserType('Cliente')">
          <img src="../assets/icons/icons8-usuário-48.png" alt="">
          <br>
            Cliente
        </button>
        <button :class="{ active: userType === 'Prestador' }" @click="setUserType('Prestador')">
          <img src="../assets/icons/icons8-aperto-de-mão-48.png" alt="">
          <br>
            Prestador de Serviço
        </button>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        country: "Brasil",
        phoneNumber: "",
        userType: "Cliente",
      };
    },
    methods: {
      submitForm() {
        alert(`Enviado: ${this.phoneNumber}`);
      },
      setUserType(type) {
        this.userType = type;
      },
    },
  };
  </script>
  
  <style scoped>

  .login-container {
    text-align: center;
    font-family: Arial, sans-serif;
    padding: 20px;
    margin: 0 auto;
  }

  h2 {
  font-size: 1.2rem;
  color: #333;
  position: absolute;
  top: 10px; /* Define a posição do topo */
  left: 50%;
  transform: translateX(-50%); /* Centraliza horizontalmente */
}
  .welcome-text strong {
    color: #00a000;
  }
  .form-group {
    margin-bottom: 15px;
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
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 50px;
    font-size: 1rem;
    background-color: white;
  }
  .user-type-switch button.active {
    background-color: #00a000;
    color: white;
    border-color: #00a000;
  }

  #country{
    border-top-right-radius: 20px ;
    border-top-left-radius: 20px ;
    margin-bottom: 0;

  }
  #num{
    border-bottom-right-radius: 20px ;
    border-bottom-left-radius: 20px ;
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

  </style>
  