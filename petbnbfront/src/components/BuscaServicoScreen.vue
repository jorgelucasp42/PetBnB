<template>
  <!-- eslint-disable vue/html-indent -->
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable vue/max-attributes-per-line -->
  <!-- eslint-disable vue/html-self-closing -->
  <div class="area-prestador">
    <header>
      <HamburguerMenu :usuario="usuario" />
      <input type="text" placeholder="Busque um lugar" />
    </header>
    <div class="container">
      <div class="servicos">
        <div class="servico-card" @click="filtrarServicos('Cuidadores')">
          <h3>Cuidadores</h3>
        </div>
        <div class="servico-card" @click="filtrarServicos('Veterinaria')">
          <h3>Veterinária</h3>
        </div>
        <div class="servico-card" @click="filtrarServicos('Adestramento')">
          <h3>Adestramento</h3>
        </div>
      </div>

      <h2>Resultados:</h2>
      <div ref="carouselRef" class="carousel">
        <div
          v-for="(servico, index) in servicosFiltrados"
          :key="index"
          class="servico-card"
          @click="irPrestador(servico)"
        >
          <p><img :src="servico.foto" alt="" /></p>

          <p>
            <strong>{{ servico.nome }}</strong>
          </p>
          <p>{{ servico.tipo }}</p>
          <p>Localização: {{ servico.localizacao }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthGuard } from "@/composables/useAuthGuard";
import { globalStore } from "@/store/globalStore";
import HamburguerMenu from "./reusable/HamburguerMenu.vue";
import useCliente from "@/composables/useCliente";

export default {
  components: {
    HamburguerMenu,
  },
  setup() {
    useAuthGuard();
    const token = globalStore.auth_token;
    const { usuario, loading, error } = useCliente(token);

    const router = useRouter();
    const carouselRef = ref(null);

    const servicos = [
      {
        id: 1,
        nome: "Mariana Costa - Cuidado Animal",
        tipo: "Cuidadores",
        localizacao: "Cohama, São Luís - MA",
        foto: new URL("@/assets/imgsUsers/cuidador01.jpg", import.meta.url)
          .href,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 2,
        nome: "Clínica Veterinária Pet Saúde",
        tipo: "Veterinaria",
        localizacao: "Centro, São Luís - MA",
        foto: new URL("@/assets/imgsUsers/Adestrador.jpg", import.meta.url)
          .href,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 3,
        nome: "Adestramento Inteligente",
        tipo: "Adestramento",
        localizacao: "Tirirical, São Luís - MA",
        foto: new URL("@/assets/imgsUsers/veterinaria01.jpg", import.meta.url)
          .href,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ];

    const servicosFiltrados = ref(servicos);

    const filtrarServicos = (tipo) => {
      servicosFiltrados.value = servicos.filter(
        (servico) => servico.tipo === tipo
      );
    };

    const voltar = () => {
      const confirmar = window.confirm("Deseja mesmo sair?");
      if (confirmar) {
        localStorage.removeItem("auth_token");
        globalStore.auth_token = null;
        router.push("/");
      }
    };

    const irPrestador = (servico) => {
      router.push({
        path: "/prestadorperfil",
        query: { servico: JSON.stringify(servico) }, // Passando os dados na query
      });
    };

    return {
      carouselRef,
      servicosFiltrados,
      filtrarServicos,
      voltar,
      irPrestador,
      usuario,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.area-prestador {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header input {
  padding: 14px;
  width: 75%;
  border-radius: 15px;
}
header h1 {
  font-size: 1.2rem;
  color: #333;
}
header button {
  border: none;
  background-color: transparent;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.servicos {
  width: 95%;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  overflow-x: scroll;
  position: relative;
  padding: 0 10px; /* Adicionando algum espaço interno */
  mask-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 1) 95%,
    rgba(0, 0, 0, 0) 100%
  );
  /* O gradiente começa transparente nas bordas e vai se tornando opaco ao longo da área central */
}

.servicos::-webkit-scrollbar {
  height: 3px; /* Ajuste da altura da barra de rolagem */
}

.servicos::-webkit-scrollbar-thumb {
  background-color: rgba(
    0,
    0,
    0,
    0.3
  ); /* Cor da "pistão" da barra de rolagem */
  border-radius: 10px;
}

.servico-card {
  width: fit-content;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px;
  text-align: left;
  cursor: pointer;
}
.servico-card:hover {
  background-color: #e9ffe9;
}
.carousel {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  scroll-behavior: auto;
  gap: 10px;
}
.carousel::-webkit-scrollbar {
  display: none;
}
img {
  height: 100px;
}
</style>
