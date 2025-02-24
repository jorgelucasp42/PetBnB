<template>
    <!-- eslint-disable vue/html-indent -->
    <!-- eslint-disable vue/html-closing-bracket-newline -->
    <!-- eslint-disable vue/singleline-html-element-content-newline -->
    <!-- eslint-disable vue/max-attributes-per-line -->
    <!-- eslint-disable vue/html-self-closing -->
    <header>
      <button @click="voltar">&#9001;</button>
      <h1>Cadastro Pet</h1>
    </header>
    <hr />
    <div class="container">
      <form @submit.prevent="submitForm">
        <label for=""><Strong>Informe seu Endereço:</Strong></label>
        <p class="logradouroNumero">
          <input type="Text" placeholder="Logradouro*" />
  
          <input type="number" placeholder="Número*" />
        </p>
        <p class="BairroComplemento">
          <input type="Text" placeholder="Bairro*" />
          <input type="Text" placeholder="Complemento" />
        </p>
        <hr style="width: 100%" />
        <div>
          <label for="imageUpload">Pets:</label>
          <div class="image-upload">
            <label for="imageInput" class="upload-label">
              <img src="../assets/imgs/Foto.png" alt="Preview" />
              <!-- <span v-if="!imagePreview">Adicionar Foto</span> -->
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
          <input type="Text" placeholder="Nome do Pet" />
          <select id="pets" name="pets" placeholder="Tipo Pet">
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="calopsita">Calopsita</option>
            <option value="canario">Canário-do-reino / Canário-belga</option>
            <option value="chinchila">Chinchila</option>
            <option value="porquinho-da-india">Cobaia / Porquinho-da-Índia</option>
            <option value="coelho">Coelho</option>
            <option value="hamster">Hamster</option>
            <option value="periquito">Periquito-australiano</option>
            <option value="pombo">Pombo-doméstico</option>
        </select>
          <textarea placeholder="Escreva uma descrição..." rows="4" cols="50">
          </textarea>
          <input type="submit" value="salvar" />

          <input type="submit" value="Continuar" />
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { globalStore } from "@/store/globalStore";
  import { computed } from "vue";
  
  export default {
    setup() {
      const userType = computed(() => globalStore.userType || "Outro");
  
      const selectHidden = () => {
        return userType.value === "Cliente" ? "hidden" : "";
      };
  
      return {
        userType,
        selectHidden,
      };
    },
  
    methods: {
      voltar() {
        this.$router.push("/resgistro");
      },
      submitForm() {
        if (this.userType === "Prestador") {
          this.$router.push("/areaprestador");
        } else {
          this.$router.push("/buscarservico");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: center;
  }
  header h1 {
    font-size: 1.2rem;
    color: #333;
  }
  header button {
    position: absolute;
    left: 13px;
    top: 65px;
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
  .logradouroNumero {
    display: flex;
    gap: 6px;
    margin-bottom: -10px;
  }
  .logradouroNumero input[type="text"] {
    width: 295%;
  }
  
  .BairroComplemento {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .image-upload {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;
    flex-direction: column;
    width: 100vw; /* Ajuste se necessário */
  }
  img {
    width: 60%;
    height: 60%;
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
  