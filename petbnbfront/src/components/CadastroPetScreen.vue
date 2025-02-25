<template>
  <!-- eslint-disable vue/html-indent -->
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable vue/max-attributes-per-line -->
  <!-- eslint-disable vue/html-self-closing -->
  <header>
    <button @click="voltar">
      <span class="material-symbols-outlined"> arrow_left_alt </span>
    </button>
    <h1>Cadastro Pet</h1>
  </header>
  <hr />
  <div class="container">
    <form @submit.prevent="submitForm">
      <label for="endereco"><strong>Informe seu Endereço:</strong></label>
      <p class="logradouroNumero">
        <input
          id="logradouro"
          v-model="logradouro"
          type="text"
          placeholder="Logradouro*"
        />
        <input
          id="numero"
          v-model="numero"
          type="number"
          placeholder="Número*"
        />
      </p>
      <p class="BairroComplemento">
        <input id="bairro" v-model="bairro" type="text" placeholder="Bairro*" />
        <input
          id="complemento"
          v-model="complemento"
          type="text"
          placeholder="Complemento"
        />
      </p>
      <hr />

      <div>
        <label for="imageUpload">Pets:</label>
        <div class="image-upload">
          <label for="imageInput" class="upload-label">
            <img :src="imageSrc" alt="Preview" />
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

      <div class="nomeDescricao">
        <input
          id="nomePet"
          v-model="nomePet"
          type="text"
          placeholder="Nome do Pet"
        />

        <select id="tipoPet" v-model="tipoPet">
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
          <option value="calopsita">Calopsita</option>
          <option value="canario">Canário-do-reino / Canário-belga</option>
          <option value="chinchila">Chinchila</option>
          <option value="porquinho-da-india">Porquinho-da-Índia</option>
          <option value="coelho">Coelho</option>
          <option value="hamster">Hamster</option>
          <option value="periquito">Periquito-australiano</option>
          <option value="pombo">Pombo-doméstico</option>
        </select>

        <textarea
          v-model="descricao"
          placeholder="Escreva uma descrição..."
          rows="4"
        ></textarea>

        <input type="submit" value="Salvar" />
        <input type="submit" value="Continuar" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const logradouro = ref("");
    const numero = ref("");
    const bairro = ref("");
    const complemento = ref("");
    const nomePet = ref("");
    const tipoPet = ref("");
    const descricao = ref("");
    const imagePreview = ref(null);

    const imageSrc = computed(() => {
      return (
        imagePreview.value ||
        new URL("@/assets/imgs/Foto.png", import.meta.url).href
      );
    });

    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const voltar = () => {
      window.history.back();
    };

    const submitForm = () => {
      console.log("Formulário enviado!");
    };

    return {
      logradouro,
      numero,
      bairro,
      complemento,
      nomePet,
      tipoPet,
      descricao,
      imagePreview,
      imageSrc,
      onImageChange,
      voltar,
      submitForm,
    };
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
  margin: 0 auto;
}

header button {
  height: 35px;
  width: auto;
  border: none;
  background-color: transparent;
}

.container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

form {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

form input,
form select,
form textarea {
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

input[type="submit"] {
  width: 100%;
  padding: 15px;
  background-color: #00a000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 15px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #00a0009d;
}

.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 30vh;
  border-radius: 15px;
  overflow: hidden;
}

.image-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logradouroNumero {
  display: flex;
  gap: 6px;
}

.BairroComplemento {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
