<template>
  <div>
    <button class="text-2xl cursor-pointer" @click="toggleMenu">
      <span class="material-symbols-outlined">menu</span>
    </button>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <div v-if="isMenuOpen" class="fixed inset-0 z-40">
        <!-- Overlay: desfoca e impede interação com o fundo -->
        <div
          class="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          @click="toggleMenu"
        ></div>
        <!-- Painel do menu animado -->
        <div
          ref="menuPanel"
          class="menu-panel relative z-50 top-0 left-0 w-64 h-full bg-gray-200 text-black flex flex-col items-start overflow-y-auto"
          @click.stop
        >
          <button
            class="flex items-center justify-between w-full text-xl p-3 pb-2 mb-6 border-b border-gray-400 cursor-pointer"
            @click="toggleMenu"
          >
            <span class="material-symbols-outlined">close</span>
            <p class="my-0 ml-0.5 mr-auto text-lg">Fechar</p>
          </button>
          <ul class="w-full flex flex-col items-center">
            <li
              class="flex flex-col items-center justify-center w-1/2 border-b border-gray-400 pb-4 mb-6"
            >
              <img
                v-if="
                  usuario && usuario.foto && usuario.foto.startsWith('http')
                "
                :src="usuario.foto"
                alt="Foto de perfil"
                class="w-20 h-20 rounded-full object-cover"
              />
              <span v-else class="material-symbols-outlined text-6xl">
                account_circle
              </span>
              <p class="flex items-center mt-2">
                <span class="mr-2">{{ usuario?.nome?.split(" ")[0] }}</span>
                <span
                  v-if="globalStore.userType.toLowerCase() === 'prestador'"
                  class="flex items-center"
                >
                  {{ " - " + usuario?.avaliacao }}
                  <span class="material-symbols-outlined">star</span>
                </span>
              </p>
            </li>

            <li
              class="grid grid-cols-[auto_1fr] items-center gap-2 mt-6 cursor-pointer"
            >
              <span class="material-symbols-outlined text-green-400">
                manage_accounts
              </span>
              <p>Gerenciar Conta</p>
            </li>

            <router-link
              to="/gerenciar-pets"
              class="grid grid-cols-[auto_1fr] items-center gap-2 cursor-pointer mt-4"
              v-i
            >
              <span class="material-symbols-outlined text-green-400">pets</span>
              <p>Gerenciar Pets</p>
            </router-link>
          </ul>

          <button
            class="border-t border-gray-400 p-3 w-full text-center absolute bottom-0 left-0 flex justify-between items-center gap-2.5 cursor-pointer"
            @click="sair"
          >
            <span class="material-symbols-outlined">logout</span>
            <p class="my-0 ml-0.5 mr-auto text-lg">Sair</p>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { animate } from "motion";
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
    async onEnter(el, done) {
      // Seleciona apenas o painel do menu dentro do container
      const menuPanel = el.querySelector(".menu-panel");
      await animate(
        menuPanel,
        {
          transform: ["translateX(-100%)", "translateX(0%)"],
          opacity: [0, 1],
        },
        { duration: 0.3, easing: "backInOut" }
      );
      done();
    },
    async onLeave(el, done) {
      const menuPanel = el.querySelector(".menu-panel");
      await animate(
        menuPanel,
        {
          transform: ["translateX(0%)", "translateX(-100%)"],
          opacity: [1, 0],
        },
        { duration: 0.3, easing: "backInOut" }
      );
      done();
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

<style scoped>
/* Estilos adicionais, se necessário */
</style>
