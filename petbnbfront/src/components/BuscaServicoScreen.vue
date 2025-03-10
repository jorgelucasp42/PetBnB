<template>
  <!-- eslint-disable vue/html-indent -->
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable vue/max-attributes-per-line -->
  <!-- eslint-disable vue/html-self-closing -->
  <div class="area-prestador">
    <header class="flex justify-between items-center gap-2.5">
      <HamburguerMenu :usuario="usuario" />
      <form class="w-full mr-0">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <span class="material-symbols-outlined text-gray-400">search</span>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[50px] focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Busque endereços, pessoas, serviços..."
            required
          />
        </div>
      </form>
    </header>
    <div class="container flex flex-col items-center">
      <div
        class="w-[360px] flex justify-around items-center relative gap-2 overflow-x-auto pb-4 mt-3 rounded-lg"
        :class="{
          'gap-x-[2px]': filtroAtivo,
          'gap-2': !filtroAtivo,
        }"
      >
        <button
          v-if="filtroAtivo"
          class="w-full h-fit flex flex-col items-center justify-center p-2.5 bg-[#f5f5f5] hover:bg-[#e9ffe9] rounded-xl shadow-lg text-left cursor-pointer transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 opacity-0 animate-fade-in"
          @click="resetFilter"
        >
          <span class="material-symbols-outlined text-green-400"
            >restart_alt</span
          >
        </button>

        <FiltroBotao
          tipo="Cuidador"
          label="Cuidadores"
          :activeFilter="filtroAtivo"
          :class="{ 'scale-95': filtroAtivo, 'scale-100': !filtroAtivo }"
          @filtrar="filtrarServicos"
        />
        <FiltroBotao
          tipo="Veterinaria"
          label="Veterinária"
          :activeFilter="filtroAtivo"
          :class="{ 'scale-95': filtroAtivo, 'scale-100': !filtroAtivo }"
          @filtrar="filtrarServicos"
        />
        <FiltroBotao
          tipo="Adestramento"
          label="Adestramento"
          :activeFilter="filtroAtivo"
          :class="{ 'scale-95': filtroAtivo, 'scale-100': !filtroAtivo }"
          @filtrar="filtrarServicos"
        />
      </div>
      <div v-if="servicosLoading">Carregando serviços...</div>
      <div v-else-if="servicosError">
        Erro ao carregar serviços: {{ servicosError.message }}
      </div>
      <div
        v-else-if="servicosFiltrados.length > 0"
        ref="carouselRef"
        class="flex flex-col items-center h-[calc(100vh-200px)] px-6 overflow-x-auto gap-2.5 mt-4 scroll-auto"
      >
        <h2 class="text font-bold text-xl">Serviços Encontrados</h2>
        <div
          v-for="(servico, index) in servicosFiltrados"
          :key="index"
          class="w-[22rem] flex flex-col relative rounded-[12px] p-2 text-left bg-[#f9f9f9] shadow-2xl cursor-pointer hover:bg-[#e9ffe9]"
          @click="irPrestador(servico)"
        >
          <img
            :src="servico.foto"
            class="w-full object-cover rounded-t-[4px]"
            alt=""
          />

          <div class="flex items-center w-full justify-between">
            <strong
              >{{ servico.nome }} -
              {{ capitalizeFirstLetter(servico.tipo) }}</strong
            >
            <p class="flex items-center">
              <span class="material-symbols-outlined">star</span>
              {{ servico.avaliacao }}
            </p>
          </div>
          <p class="text-[#afafaf]">Localização: {{ servico.localizacao }}</p>
          <p class="flex items-center">
            <strong>
              {{
                servico.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </strong>
            / noite
          </p>
        </div>
        <span></span>
      </div>
      <div v-else class="mt-6 font-bold">Nenhum serviço encontrado.</div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthGuard } from "@/composables/useAuthGuard";
import { globalStore } from "@/store/globalStore";
import HamburguerMenu from "./reusable/HamburguerMenu.vue";
import useCliente from "@/composables/useCliente";
import useFetchServicos from "@/composables/useFetchServicos";
import FiltroBotao from "./reusable/FiltroBotao.vue";

export default {
  components: {
    HamburguerMenu,
    FiltroBotao,
  },
  methods: {
    capitalizeFirstLetter(text) {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
  },
  setup() {
    useAuthGuard();
    const token = globalStore.auth_token;
    const { usuario, loading, error } = useCliente(token);
    const {
      servicos,
      loading: servicosLoading,
      error: servicosError,
      fetchServicos,
    } = useFetchServicos();

    const router = useRouter();
    const carouselRef = ref(null);
    const filtroAtivo = ref(null);
    const servicosFiltrados = ref([]);

    const filtrarServicos = (tipo) => {
      if (
        filtroAtivo.value &&
        filtroAtivo.value.toLowerCase() === tipo.toLowerCase()
      ) {
        filtroAtivo.value = null;
      } else {
        filtroAtivo.value = tipo;
      }
    };

    // Função para resetar o filtro via template
    const resetFilter = () => {
      filtroAtivo.value = null;
    };

    fetchServicos();

    // Aplica o filtro sempre que servicos ou filtroAtivo mudar
    watchEffect(() => {
      if (!filtroAtivo.value) {
        servicosFiltrados.value = servicos.value;
      } else {
        servicosFiltrados.value = servicos.value.filter(
          (servico) =>
            servico.tipo.toLowerCase() === filtroAtivo.value.toLowerCase()
        );
      }
    });

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
        query: { servico: JSON.stringify(servico) },
      });
    };

    return {
      carouselRef,
      servicosFiltrados,
      filtrarServicos,
      resetFilter, // Retorne essa função para poder usá-la no template
      voltar,
      irPrestador,
      usuario,
      loading,
      error,
      servicosLoading,
      servicosError,
      filtroAtivo, // Se quiser exibir no template qual filtro está ativo
    };
  },
};
</script>
<style scoped>
.area-prestador {
  padding: 20px;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
</style>
