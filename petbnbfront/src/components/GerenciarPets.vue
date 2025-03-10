<template>
  <div class="p-4">
    <!-- Botão Cadastrar Pet -->
    <div class="flex justify-between mb-4">
      <button @click="voltar">
        <span class="material-symbols-outlined"> arrow_left_alt </span>
      </button>
      <button
        class="bg-green-300 hover:bg-green-400 active:bg-green-400 text-black font-bold py-2 px-4 rounded cursor-pointer"
        @click="handleCadastrar"
      >
        Cadastrar Pet
      </button>
    </div>

    <!-- Área de loading e erros -->
    <div v-if="loading" class="text-center text-gray-500">Buscando pets...</div>
    <div v-if="error" class="text-center text-red-500">
      Ocorreu um erro ao buscar os pets.
    </div>

    <!-- Lista de Pets em grid responsivo -->
    <div v-if="!loading && !error">
      <!-- Se não houver nenhum pet cadastrado, mostra mensagem em negrito -->
      <div v-if="pets?.length === 0" class="text-center font-bold mt-4">
        Você não possui nenhum pet cadastrado
      </div>
      <!-- Caso contrário, exibe a grid de pets -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="pet in pets"
          :key="pet.id"
          class="bg-white shadow-md rounded-lg p-4 flex items-center"
        >
          <!-- Nome e atributos do Pet -->
          <div class="flex flex-col w-[70%] text-left">
            <h2 class="text-xl font-semibold mb-2">{{ pet.nome }}</h2>
            <p class="text-gray-700">Espécie: {{ pet.especie }}</p>
            <p class="text-gray-700">Raça: {{ pet.raca }}</p>
          </div>
          <!-- Foto do Pet (caso exista) -->
          <img
            v-if="pet.foto"
            :src="pet.foto"
            alt="Foto do Pet"
            class="w-24 h-24 object-cover rounded-full mb-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFetchPets } from "@/composables/useFetchPets";
import { useAuthGuard } from "@/composables/useAuthGuard";
export default {
  setup() {
    useAuthGuard();
    const authToken = localStorage.getItem("auth_token");

    const { pets, error, loading, fetchPets } = useFetchPets(authToken);

    fetchPets();

    return {
      pets,
      error,
      loading,
    };
  },
  methods: {
    handleCadastrar() {
      this.$router.push("/cadastrar-pet");
    },
    voltar() {
      this.$router.push("/buscarservico");
    },
  },
};
</script>

<style scoped></style>
