<template>
  <!-- Informações do prestador -->
  <button @click="voltar" id="voltar">
      <span class="material-symbols-outlined"> arrow_left_alt </span>
    </button>
  <div v-if="prestador" id="infos">
    <img :src="prestador.foto" alt="Imagem do prestador" id="fotoPrestador">
    <h2>{{ prestador.nome }}</h2>
    <p><strong>Tipo:</strong> {{ prestador.tipo }}</p>
    <p><strong>Localização:</strong> {{ prestador.localizacao }}</p>
    <p>{{ prestador.descricao }}</p>
  </div>
  <p v-else>Carregando...</p>

  <hr>

  <!-- Título "Áreas" -->
  <h2>Áreas</h2>

  <!-- Carrossel com Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- Loop para gerar os itens do carrossel -->
      <div v-for="(area, index) in areas" :key="index" class="swiper-slide">
        <div class="card">
          <img :src="area.imagem" class="card-img-top" :alt="area.nome">
          <div class="card-body">
            <h5 class="card-title">{{ area.nome }}</h5>
            <p class="card-text">{{ area.descricao }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de navegação -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>

  <button class="btnSolicitar">Solicitar serviço</button>

  <hr>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  methods: {
    voltar() {
      this.$router.push("/buscarservico");
    },
  },
  setup() {
    const route = useRoute();

    // Dados do prestador
    const prestador = computed(() => {
      try {
        return route.query.servico ? JSON.parse(route.query.servico) : null;
      } catch (e) {
        console.error("Erro ao analisar JSON do prestador:", e);
        return null;
      }
    });

    // Dados das áreas (exemplo dinâmico)
    const areas = ref([
      {
        imagem: "https://via.placeholder.com/400x300",
        nome: "Área 1",
        descricao: "Descrição da Área 1."
      },
      {
        imagem: "https://via.placeholder.com/400x300",
        nome: "Área 2",
        descricao: "Descrição da Área 2."
      },
      {
        imagem: "https://via.placeholder.com/400x300",
        nome: "Área 3",
        descricao: "Descrição da Área 3."
      },
      {
        imagem: "https://via.placeholder.com/400x300",
        nome: "Área 3",
        descricao: "Descrição da Área 3."
      }
    ]);

    // Inicializa o Swiper após o componente ser montado
    onMounted(() => {
      new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 10,
        grabCursor: true,
      });
    });
    

    return { prestador, areas };
  }
  
};
</script>

<style>
/* Estilo para a imagem do prestador */
#fotoPrestador {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Estilo para o container de informações */
#infos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

/* Estilo para o carrossel */
.swiper-container {
  width: 100%;
  padding: 20px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.swiper-button-next, .swiper-button-prev {
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.swiper-button-next::after, .swiper-button-prev::after {
  font-size: 20px;
}
#voltar {
  height: 35px;
  width: auto;
  border: none;
  background-color: transparent;
  display: flex;
}
.btnSolicitar{
  width: 100%;
  padding: 15px;
  background-color: #00a000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;

}



</style>