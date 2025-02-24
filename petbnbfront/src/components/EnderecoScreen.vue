<template>
  <header>
    <button @click="voltar">&#9001;</button>
    <h1>Endereço {{ userType }}</h1>
  </header>
  <hr />
  <div class="container">
    <form @submit.prevent="submitForm">
      <label><strong>Informe seu Endereço:</strong></label>
      <p class="logradouroNumero">
        <input type="text" placeholder="Logradouro*" />
        <input type="number" placeholder="Número*" />
      </p>
      <p class="BairroComplemento">
        <input type="text" placeholder="Bairro*" />
        <input type="text" placeholder="Complemento" />
      </p>
      <hr style="width: 100%" />
      <div>
        <label for="imageUpload">Galeria de Áreas:</label>
        <div class="image-upload">
          <label for="imageInput" class="upload-label">
            <img :src="imagePreview" alt="Preview" />
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
        <input type="text" placeholder="Nome da Área" />
        <textarea
          placeholder="Escreva uma descrição..."
          rows="4"
          cols="50"
        ></textarea>
        <input type="submit" value="salvar" />
        <hr />
        <label>Valor por noite:</label>
        <input type="number" name="valorPorNoite" placeholder="R$" />
        <input type="submit" value="Continuar" />
      </div>
    </form>
  </div>
</template>

<script>
import { globalStore } from "@/store/globalStore";
import { computed, ref } from "vue";

export default {
  setup() {
    const userType = computed(() => globalStore.userType || "Outro");
    const imagePreview = ref(require("@/assets/imgs/Foto.png"));

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

    return {
      userType,
      imagePreview,
      onImageChange,
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
  border: none;
  background-color: transparent;
}
.container {
  display: flex;
  justify-content: center;
}
form {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
form input,
form textarea {
  font-size: 1em;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
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
  flex-direction: column;
}
img {
  width: 60%;
  height: 60%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
