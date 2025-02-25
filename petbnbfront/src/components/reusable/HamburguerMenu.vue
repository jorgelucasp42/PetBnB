<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div>
    <button class="hamburguer-button" @click="toggleMenu">
      <span class="material-symbols-outlined">menu</span>
    </button>
    <div v-if="isMenuOpen" class="hamburguer-menu">
      <button class="voltar-button" @click="toggleMenu">
        <span class="material-symbols-outlined">close</span>
        <p style="margin: 0 auto 0 0">Fechar</p>
      </button>
      <ul class="menu-list">
        <li
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid rgba(63, 63, 63, 0.546);
            width: 50%;
          "
        >
          <img
            v-if="usuario && usuario.foto && usuario.foto.startsWith('http')"
            :src="usuario.foto"
            alt="Foto de perfil"
            class="perfil-img"
          />
          <span v-else class="material-symbols-outlined" style="font-size: 80px"
            >account_circle</span
          >
          <p style="margin-top: 10px; display: flex; align-items: center">
            <span style="margin-right: 8px"
              >{{ usuario?.nome?.split(" ")[0] }} {{ " - " }}</span
            >
            <span
              v-if="globalStore.userType.toLowerCase() === 'prestador'"
              style="display: flex; align-items: center"
            >
              {{ usuario?.avaliacao }}
              <span class="material-symbols-outlined">star</span>
            </span>
          </p>
        </li>
        <li style="margin-top: 30px">
          <span class="material-symbols-outlined">account_circle</span>
          Gerenciar Conta
        </li>
      </ul>
      <button class="sair-button" @click="sair">
        <span class="material-symbols-outlined" style="">logout</span>
        <p style="margin: 0 auto 0 0">Sair</p>
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { globalStore } from "@/store/globalStore";

export default {
  props: {
    usuario: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      globalStore,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    sair() {
      const confirmar = window.confirm("Deseja mesmo sair?");
      if (confirmar) {
        localStorage.removeItem("auth_token");
        globalStore.auth_token = null;
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.hamburguer-button {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.hamburguer-menu {
  position: fixed; /* Mantém o menu fixo na tela */
  top: 0;
  left: 0;
  width: 250px;
  height: 100dvh;
  background-color: rgb(212, 212, 212);
  color: rgb(0, 0, 0);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto; /* Adiciona rolagem caso o menu tenha muitos itens */
  z-index: 1000; /* Garante que fique acima do conteúdo */
}

.voltar-button {
  background: none;
  border: none;
  font-size: 24px;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(63, 63, 63, 0.546);
  width: 100%;
  padding-bottom: 10px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
  width: 100%;
  flex-grow: 0.5;
  justify-content: flex-start;
  align-items: center;
}

li {
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sair-button {
  background: inherit;
  border: none;
  border-top: 1px solid rgba(63, 63, 63, 0.546);
  color: inherit;
  padding: 10px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: absolute; /* Fixa o botão "Sair" na parte inferior */
  bottom: 5%;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
button p {
  font-size: 16px;
}
.logout-icon {
  width: 24px; /* Ajuste conforme necessário */
  height: 24px;
  margin-right: 8px; /* Espaço entre o ícone e o texto */
  fill: black;
}
.perfil-img {
  width: 80px; /* Ajuste o tamanho conforme necessário */
  height: 80px;
  border-radius: 50%; /* Faz a imagem ficar circular */
  object-fit: cover; /* Garante que a imagem preencha o círculo sem distorcer */
}
</style>
