<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <header>
    <button @click="voltar">
      <span class="material-symbols-outlined"> arrow_left_alt </span>
    </button>
    <h1>Registo de {{ userType }}</h1>
  </header>
  <hr />
  <div class="container">
    <form @submit.prevent="submitForm">
      <label for="inome"><strong>Nome:</strong></label>
      <input
        id="inome"
        v-model="nome"
        type="Text"
        placeholder="Informe seu nome"
      />
      <p></p>
      <label for="icpf"><strong>CPF:</strong></label>
      <input
        id="icpf"
        v-model="cpf"
        v-mask="'###.###.###-##'"
        type="Text"
        placeholder="xxx.xxx.xxx-xx"
      />
      <p></p>
      <div>
        <label for="imageUpload">Foto de Usuário:</label>
        <div class="image-upload">
          <label for="imageInput" class="upload-label">
            <img
              :src="imagePreview || require('@/assets/imgs/Foto.png')"
              alt="Preview"
            />
            <span v-if="!imagePreview">Adicionar Foto</span>
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            hidden
            @change="onImageChange"
          />
        </div>
      </div>

      <label v-show="userType !== 'Cliente'" for="itiposervice"
        >Qual tipo de serviço você quer prestar?</label
      >
      <select
        v-show="userType !== 'Cliente'"
        id="itiposervice"
        v-model="tipoService"
      >
        <option value="Cuidador">Cuidador</option>
        <option value="Treinador">Treinador</option>
        <option value="Veterinario">Veterinario</option>
      </select>
      <input type="submit" value="Continuar" />
    </form>
  </div>
</template>

<script>
import { useRegisterForm } from "@/composables/useRegisterForm";
export default {
  setup() {
    const {
      userType,
      nome,
      cpf,
      tipoService,
      selectHidden,
      imagePreview,
      onImageChange,
      submitForm,
    } = useRegisterForm();

    return {
      userType,
      nome,
      cpf,
      tipoService,
      selectHidden,
      imagePreview,
      onImageChange,
      submitForm,
    };
  },
  computed: {
    phoneNumber() {
      return this.$route.query.phoneNumber;
    },
  },
  methods: {
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header h1 {
  font-size: 1.2rem;
  color: #333;
  margin: 0 auto 0 auto;
}
header button {
  height: 35px;
  width: auto;
  border: none;
  background-color: transparent;
}
form {
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.container {
  /* border: 2px solid red; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

form input,
form select {
  font-size: 1em;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}
form select {
  box-shadow: 2px 4px 8px black;
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
.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 30vh;
  border-radius: 15px;
  overflow: hidden; /* Garante que a imagem não ultrapasse a borda arredondada */
}

.image-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
