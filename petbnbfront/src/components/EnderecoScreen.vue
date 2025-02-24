<template>
  <!-- eslint-disable vue/html-indent -->
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable vue/max-attributes-per-line -->
  <!-- eslint-disable vue/html-self-closing -->
  <header>
    <button @click="voltar">
      <span class="material-symbols-outlined">arrow_left_alt</span>
    </button>
    <h1>Cadastro de Prestador</h1>
  </header>
  <hr />
  <div class="container">
    <form @submit.prevent="submitForm">
      <span><strong>Informe seu Endereço:</strong></span>

      <div class="cep row">
        <input
          v-model="cep"
          v-mask="'#####-###'"
          type="text"
          placeholder="CEP*"
          required
          @input="buscarCep"
        />
        <p v-if="cepFetchError" class="erro">{{ cepFetchError }}</p>
      </div>
      <div class="cidadeEstado row">
        <input v-model="cidade" type="text" placeholder="Cidade*" required />
        <input v-model="estado" type="text" placeholder="Estado*" required />
      </div>

      <div class="row">
        <input
          v-model="logradouro"
          type="text"
          placeholder="Logradouro*"
          name="rua"
          required
        />
      </div>

      <div class="row">
        <input
          v-model="bairro"
          type="text"
          placeholder="Bairro*"
          required
          name="bairro"
        />
      </div>
      <div class="complementoNumero row">
        <input
          v-model="complemento"
          type="text"
          placeholder="Complemento"
          name="complemento"
        />
        <input v-model="numero" type="text" placeholder="Número*" required />
      </div>
      <div style="margin-top: 10px" class="row">
        <label><strong>Valor por noite:</strong></label>
        <input
          v-model="valorPorNoite"
          v-mask="[
            'R$ #,##',
            'R$ ##,##',
            'R$ ###,##',
            'R$ ####,##',
            'R$ #####,##',
          ]"
          type="text"
          placeholder="R$"
          required
        />
      </div>

      <hr style="width: 100%; margin: 20px 0px 20px 0" />

      <!-- Seção da Galeria de Áreas -->

      <label for="imageUpload">Galeria de Áreas:</label>
      <div class="image-upload">
        <label for="imageInput" class="upload-label">
          <img
            :src="imagePreview || require('../assets/imgs/Foto.png')"
            alt="Preview"
          />
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          hidden
          @change="onImageChange"
        />
      </div>

      <div class="nomeDescricao">
        <input
          id="nomeArea"
          v-model="nomeArea"
          type="text"
          placeholder="Nome da Área"
        />
        <textarea
          v-model="descricao"
          placeholder="Escreva uma descrição..."
          rows="4"
          cols="50"
        ></textarea>
        <!-- Botão para adicionar item à galeria -->
        <button type="button" @click="addGalleryItem">
          Adicionar na Galeria
        </button>
        <!-- Mostra quantos itens já foram adicionados -->
        <p v-if="galleryItems.length > 0">
          {{ galleryItems.length }} item(s) a serem adicionado(s) à galeria
        </p>
      </div>

      <input type="submit" value="Continuar" />
    </form>
  </div>
</template>

<script>
import { useEnderecoForm } from "@/composables/useEnderecoForm";
import { useAuthGuard } from "@/composables/useAuthGuard";
export default {
  setup() {
    useAuthGuard();
    const {
      logradouro,
      numero,
      bairro,
      complemento,
      cep,
      cidade,
      estado,
      nomeArea,
      descricao,
      valorPorNoite,
      imagePreview,
      onImageChange,
      submitForm,
      buscarCep,
      cepFetchError,
      galleryItems,
      addGalleryItem,
    } = useEnderecoForm();

    return {
      logradouro,
      numero,
      bairro,
      complemento,
      cep,
      cidade,
      estado,
      nomeArea,
      descricao,
      valorPorNoite,
      imagePreview,
      onImageChange,
      submitForm,
      buscarCep,
      cepFetchError,
      galleryItems,
      addGalleryItem,
    };
  },

  methods: {
    voltar() {
      if (
        window.confirm(
          "O cadastro de conta já foi realizado. Ao voltar, você será redirecionado para Login/Home. Tem certeza?"
        )
      ) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0;
  width: 100%;
}
.erro {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
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
  /* border: 1px solid black; */
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

input[type="submit"],
button[type="button"] {
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
.complementoNumero {
  display: flex;
  gap: 5px;
}
.cidadeEstado {
  display: flex;
  gap: 5px;
}
.image-upload {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;
  flex-direction: column;
  width: 100%; /* Ajuste se necessário */
}
img {
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.nomeDescricao input,
.nomeDescricao textarea {
  font-size: 1em;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

input[value="salvar"] {
  width: 50%;
}
</style>
