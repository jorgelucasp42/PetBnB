<template>
    <div class="area-prestador">
      <header>
        <button @click="voltar">&#9001;</button>
        <input type="text" placeholder="Busque um lugar"/>
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
        <div class="carousel" ref="carouselRef">
          <div v-for="(servico, index) in servicosFiltrados" :key="index" class="servico-card">
            <p><strong>{{ servico.nome }}</strong></p>
            <p>{{ servico.tipo }}</p>
            <p>Localização: {{ servico.localizacao }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const carouselRef = ref(null);
  
      const servicos = [
        { nome: 'Mariana Costa - Cuidado Animal', tipo: 'Cuidadores', localizacao: 'Cohama, São Luís - MA' },
        { nome: 'Clínica Veterinária Pet Saúde', tipo: 'Veterinaria', localizacao: 'Centro, São Luís - MA' },
        { nome: 'Adestramento Inteligente', tipo: 'Adestramento', localizacao: 'Tirirical, São Luís - MA' }
      ];
  
      const servicosFiltrados = ref(servicos);
  
      const filtrarServicos = (tipo) => {
        servicosFiltrados.value = servicos.filter(servico => servico.tipo === tipo);
      };
  
      const voltar = () => {
        router.push('/');
      };
  
      return {
        carouselRef,
        servicosFiltrados,
        filtrarServicos,
        voltar
      };
    }
  };
  </script>
  
  <style scoped>
  .area-prestador {
    padding: 20px;
  }
  
  header {
    display: flex;
    justify-content: center;
  }
  header input{
    padding: 14px;
    width: 75%;
    border-radius: 15px;
    position: absolute;
    top: 50px;

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
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .servicos {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
  .servico-card {
    min-width: 100px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
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
  </style>