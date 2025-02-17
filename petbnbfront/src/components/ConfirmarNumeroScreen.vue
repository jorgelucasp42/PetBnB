<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <header>
    <button @click="voltar">
      <span class="material-symbols-outlined"> arrow_left_alt </span>
    </button>
    <h1>Confirme seu Número {{}}</h1>
  </header>
  <hr />
  <div class="container">
    <form @submit.prevent="submitForm">
      <label for="verificationCode"
        >Informe o código que enviamos para o Número:
        <strong>{{ phoneNumber }}</strong></label
      >
      <input
        id="verificationCode"
        v-model="verificationCode"
        type="text"
        maxlength="4"
        placeholder="- - - -"
      />
      <p>Não recebeu? <a href="">Enviar novamente</a></p>
      <input type="submit" value="Continuar" />
    </form>
  </div>
</template>

<script>
import { generateValNumCode, validateNumberCode } from "@/api/authService";
import { globalStore } from "@/store/globalStore";

export default {
  data() {
    return {
      verificationCode: "",
    };
  },
  computed: {
    phoneNumber() {
      return this.$route.query.phoneNumber;
    },
    userType() {
      return this.$route.query.userType;
    },
  },
  async mounted() {
    if (!this.phoneNumber || !this.userType) {
      this.$router.push("/");
      return;
    }
    try {
      await generateValNumCode(this.phoneNumber, this.userType);
    } catch (error) {
      alert("Erro ao gerar código de verificação. Tente novamente.");
    }
  },
  methods: {
    voltar() {
      this.$router.push("/");
    },
    async submitForm() {
      try {
        const data = await validateNumberCode(
          this.userType,
          this.phoneNumber,
          this.verificationCode
        );
        const redirectPath = data.path;
        const auth_token = data.auth_token ?? null;

        if (auth_token) {
          localStorage.setItem("auth_token", auth_token);
          localStorage.setItem("userType", this.userType);

          globalStore.auth_token = auth_token;
          globalStore.userType = this.userType;
        }
        if (redirectPath === "/registro") {
          this.$router.push({
            path: redirectPath,
            query: { phoneNumber: this.phoneNumber },
          });
        } else {
          this.$router.push(redirectPath);
        }
      } catch (error) {
        alert(error.response?.data?.message);
      }
    },
  },
};
</script>

<style scoped>
header {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
header h1 {
  font-size: 1.2rem;
  margin: 0 auto 0 auto;
  color: #333;
}
header button {
  height: 35px;
  width: auto;
  border: none;
  background-color: transparent;
}
form {
  /* border: 1px solid black; */
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.container {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
}

form input {
  font-size: 2em;
  width: 50%;
  padding: 20px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
  text-align: center;
}

p a {
  color: black;
}

input[type="submit"] {
  width: 100%;
  padding: 15px;
  background-color: #00a000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 15px;
}

input[type="submit"]:hover {
  background-color: #00a0009d;
  cursor: pointer;
}
</style>
