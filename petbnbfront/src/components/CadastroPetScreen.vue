<template>
  <div class="flex justify-between items-center mb-4 mt-2 p-2 border-b">
    <button @click="voltar" class="cursor-pointer">
      <span class="material-symbols-outlined"> arrow_left_alt </span>
    </button>
    <h1 class="text-2xl font-bold mx-auto">Cadastrar Pet</h1>
  </div>
  <div class="p-4">
    <form
      @submit.prevent="handleSubmit"
      class="space-y-4 text-left flex flex-col"
    >
      <div>
        <label for="nome" class="block mb-1 font-medium">Nome</label>
        <input
          id="nome"
          v-model="nome"
          type="text"
          class="border rounded p-2 w-full"
          placeholder="Digite o nome do pet"
          required
        />
      </div>
      <div>
        <label for="especie" class="block mb-1 font-medium">Espécie</label>
        <input
          id="especie"
          v-model="especie"
          type="text"
          class="border rounded p-2 w-full"
          placeholder="Digite a espécie do pet"
          required
        />
      </div>
      <div>
        <label for="raca" class="block mb-1 font-medium">Raça</label>
        <input
          id="raca"
          v-model="raca"
          type="text"
          class="border rounded p-2 w-full"
          placeholder="Digite a raça do pet"
          required
        />
      </div>

      <!-- Input de Upload da Foto -->
      <div>
        <label class="block mb-1 font-medium">Foto do Pet (opcional)</label>
        <div class="flex items-center space-x-4">
          <label
            for="foto"
            class="cursor-pointer bg-gray-200 p-3 rounded-lg flex items-center space-x-2"
          >
            <span class="material-symbols-outlined"> camera </span>
            <span>Selecionar Foto</span>
          </label>
          <input
            id="foto"
            type="file"
            class="hidden"
            @change="handleFileChange"
            accept="image/*"
          />
        </div>

        <!-- Pré-visualização da imagem -->
        <div v-if="fotoPreview" class="mt-4">
          <img
            :src="fotoPreview"
            alt="Pré-visualização da Foto"
            class="w-32 h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      <button
        type="submit"
        class="bg-green-400 hover:bg-green-600 active:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Cadastrar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPet } from "@/api/servicoPets";

const nome = ref("");
const especie = ref("");
const raca = ref("");
const foto = ref(null);
const fotoPreview = ref(null);

const router = useRouter();
const authToken = localStorage.getItem("auth_token");

// Função para capturar o arquivo de imagem e gerar a pré-visualização
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    foto.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      fotoPreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const voltar = () => {
  router.push("/gerenciar-pets");
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("especie", especie.value);
    formData.append("raca", raca.value);
    if (foto.value) {
      formData.append("foto", foto.value);
    }

    await createPet(authToken, formData);

    router.push("/gerenciar-pets");
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);
  }
};
</script>

<style scoped>
/* Adicione seus estilos personalizados aqui */
</style>
