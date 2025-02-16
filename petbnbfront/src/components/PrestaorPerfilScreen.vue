<template>
    <div v-if="prestador" id="infos">
      <img :src="prestador.foto" alt="Imagem do prestador" id="fotoPrestador">
      <h2>{{ prestador.nome }}</h2>
      <p>{{ prestador.tipo }}</p>
      <p>Localização: {{ prestador.localizacao }}</p>
      <p>{{ prestador.descricao }}</p>
    </div>
    <p v-else>Carregando...</p>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  
  export default {
    setup() {
      const route = useRoute();
  
      const prestador = computed(() => {
        try {
          return route.query.servico ? JSON.parse(route.query.servico) : null;
        } catch (e) {
          console.error("Erro ao analisar JSON do prestador:", e);
          return null;
        }
      });
  
      return { prestador };
    }
  };
  </script>


<style>
#fotoPrestador{
    width: 100vw;

}
#infos{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    margin: 0;
}

</style>
  