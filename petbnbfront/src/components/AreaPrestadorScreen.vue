<template>
  <!-- eslint-disable vue/html-indent -->
  <!-- eslint-disable vue/html-closing-bracket-newline -->
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable vue/max-attributes-per-line -->
  <!-- eslint-disable vue/html-self-closing -->
  <header>
    <HamburguerMenu :usuario="usuario" />
    <h1>Área do Prestador</h1>
  </header>
  <hr />
  <div class="area-prestador">
    <div class="container">
      <h2>Mensagens Recentes:</h2>
      <div
        ref="carouselRef"
        class="carousel"
        @pointerdown="startDrag"
        @pointerup="endDrag"
        @pointermove="onDrag"
      >
        <div
          v-for="(mensagem, index) in mensagens"
          :key="index"
          class="mensagem-card"
        >
          <p>
            <strong>{{ mensagem.nome }}</strong>
          </p>
          <p>{{ mensagem.data }}</p>
          <p>{{ mensagem.texto }}</p>
        </div>
      </div>

      <h2>Seu Período Disponível:</h2>
      <div class="calendario">
        <table>
          <thead>
            <tr>
              <th>Dom</th>
              <th>Seg</th>
              <th>Ter</th>
              <th>Qua</th>
              <th>Qui</th>
              <th>Sex</th>
              <th>Sab</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendario" :key="index">
              <td
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                :class="{ pendente: isPendente(day) }"
              >
                {{ day || "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Pedidos Pendentes:</h2>
      <div ref="pedidoCarouselRef" class="carousel">
        <div
          v-for="(pedido, index) in pedidos"
          :key="index"
          class="pedido-card"
        >
          <p>
            <strong>{{ pedido.nome }}</strong>
          </p>
          <p>Animal: {{ pedido.animal }}</p>
          <p>Raça: {{ pedido.raca }}</p>
          <p>Período: {{ pedido.periodo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import usePrestador from "@/composables/usePrestador";
import HamburguerMenu from "./reusable/HamburguerMenu.vue";
import { useAuthGuard } from "@/composables/useAuthGuard";
import { globalStore } from "@/store/globalStore";

export default {
  components: {
    HamburguerMenu,
  },
  setup() {
    useAuthGuard();
    const token = globalStore.auth_token;
    const { usuario, loading, error } = usePrestador(token);

    const carouselRef = ref(null);
    const pedidoCarouselRef = ref(null);
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Gerar calendário do mês atual
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    const gerarCalendario = () => {
      const primeiroDia = new Date(anoAtual, mesAtual, 1);
      const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
      const diasNoMes = ultimoDia.getDate();
      let primeiroDiaSemana = primeiroDia.getDay();

      let calendario = [];
      let semana = Array(7).fill(null);

      for (let dia = 1; dia <= diasNoMes; dia++) {
        semana[primeiroDiaSemana] = dia;
        primeiroDiaSemana++;
        if (primeiroDiaSemana > 6 || dia === diasNoMes) {
          calendario.push(semana);
          semana = Array(7).fill(null);
          primeiroDiaSemana = 0;
        }
      }

      return calendario;
    };

    const calendario = ref(gerarCalendario());

    // Lógica para seleção de intervalo de datas
    const dataInicio = ref(null);
    const dataFim = ref(null);

    const selecionarData = (dia) => {
      if (!dia) return;

      const dataSelecionada = new Date(anoAtual, mesAtual, dia);

      if (!dataInicio.value || dataFim.value) {
        dataInicio.value = dataSelecionada;
        dataFim.value = null;
      } else {
        if (dataSelecionada < dataInicio.value) {
          dataFim.value = dataInicio.value;
          dataInicio.value = dataSelecionada;
        } else {
          dataFim.value = dataSelecionada;
        }
      }
    };

    const isSelecionado = (dia) => {
      if (!dia) return false;
      const data = new Date(anoAtual, mesAtual, dia);
      return (
        dataInicio.value &&
        dataFim.value &&
        data >= dataInicio.value &&
        data <= dataFim.value
      );
    };

    // Períodos pendentes
    const periodosPendentes = [
      {
        inicio: new Date(anoAtual, mesAtual, 22),
        fim: new Date(anoAtual, mesAtual, 27),
      },
      {
        inicio: new Date(anoAtual, mesAtual, 15),
        fim: new Date(anoAtual, mesAtual, 19),
      },
    ];

    const isPendente = (day) => {
      if (!day) return false;
      const date = new Date(anoAtual, mesAtual, day);
      return periodosPendentes.some(
        (periodo) => date >= periodo.inicio && date <= periodo.fim
      );
    };

    // Mensagens e pedidos
    const mensagens = [
      { nome: "Renato", data: "Hoje", texto: "Mensagem de exemplo 1" },
      {
        nome: "Marcos Almeida",
        data: "Há 2 dias",
        texto: "Mensagem de exemplo 2",
      },
      { nome: "Renato", data: "Hoje", texto: "Mensagem de exemplo 1" },
      {
        nome: "Marcos Almeida",
        data: "Há 2 dias",
        texto: "Mensagem de exemplo 2",
      },
      { nome: "Renato", data: "Hoje", texto: "Mensagem de exemplo 1" },
      {
        nome: "Marcos Almeida",
        data: "Há 2 dias",
        texto: "Mensagem de exemplo 2",
      },
    ];

    const pedidos = [
      {
        nome: "Renato",
        animal: "Cachorro",
        raca: "Golden Retriever",
        periodo: "22 dez - 27 dez",
      },
      {
        nome: "Mariana",
        animal: "Gato",
        raca: "Siamês",
        periodo: "15 jan - 20 jan",
      },
      {
        nome: "Renato",
        animal: "Cachorro",
        raca: "Golden Retriever",
        periodo: "22 dez - 27 dez",
      },
      {
        nome: "Mariana",
        animal: "Gato",
        raca: "Siamês",
        periodo: "15 jan - 20 jan",
      },
      {
        nome: "Renato",
        animal: "Cachorro",
        raca: "Golden Retriever",
        periodo: "22 dez - 27 dez",
      },
      {
        nome: "Mariana",
        animal: "Gato",
        raca: "Siamês",
        periodo: "15 jan - 20 jan",
      },
    ];

    // Lógica de arrastar para o carrossel
    const startDrag = (event) => {
      if (!carouselRef.value) return;
      isDragging = true;
      startX = event.pageX - carouselRef.value.offsetLeft;
      scrollLeft = carouselRef.value.scrollLeft;
    };

    const endDrag = () => {
      isDragging = false;
    };

    const onDrag = (event) => {
      if (!isDragging || !carouselRef.value) return;
      event.preventDefault();
      const x = event.pageX - carouselRef.value.offsetLeft;
      const walk = (x - startX) * 2;
      carouselRef.value.scrollLeft = scrollLeft - walk;
    };

    return {
      carouselRef,
      pedidoCarouselRef,
      calendario,
      periodosPendentes,
      isPendente,
      mensagens,
      pedidos,
      startDrag,
      endDrag,
      onDrag,
      selecionarData,
      isSelecionado,
      dataInicio,
      dataFim,
      usuario,
      loading,
      error,
    };
  },
  methods: {
    voltar() {
      this.$router.push("/confirmaNum");
    },
  },
};
</script>

<style scoped>
.area-prestador {
  padding: 20px;
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
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: auto;
  gap: 10px;
}
.mensagem-card,
.pedido-card {
  min-width: 200px;
  border: 2px #000 solid;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: left;
}
.pedido-card {
  border: 2px #000 solid;
}
.carousel::-webkit-scrollbar {
  display: none;
}

.calendario table {
  width: 100%;
  border-collapse: collapse;
}

.calendario th,
.calendario td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.calendario td.pendente {
  background-color: #ffcccc;
}

.periodos-pendentes {
  display: flex;
  gap: 10px;
}

.periodo-card {
  background-color: #ffe9e9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
