<template>

    <header>
      <button @click="voltar">&#9001;</button>
      <h1>Registo de {{ userType }}</h1>
    </header>
    <hr>
    <div class="container">
      <form @submit.prevent="submitForm">
        
        <label for=""><Strong>Nome:</Strong></label>
        <input type="Text"  placeholder="Informe seu nome">
        <p></p>
        <label for=""><Strong>CPF:</Strong></label>
        <input type="Text"  placeholder="xxx.xxx.xxx-xx">
        <p></p>
        <div>
    <label for="imageUpload">Foto de Usuário:</label>
    <div class="image-upload">
      <label for="imageInput" class="upload-label">
        <img src="../assets/imgs/Foto.png" alt="Preview" />
        <span v-if="!imagePreview">Adicionar Foto</span>
      </label>
      <input id="imageInput" type="file" @change="onImageChange" accept="image/*" hidden/>
    </div>
  </div>
        
        <label for="" v-show="userType !== 'Cliente'">Qual tipo de serviço você quer prestar?</label>
        <select name="" id="" v-show="userType !== 'Cliente'">
            <option value="Cuidador">Cuidador</option>
            <option value="Treinador">Treinador</option>
            <option value="Veterinario">Veterinario</option>
        </select>
        <input type="submit" value="Continuar">
        
      </form>
    </div>
    
      </template>
      
      <script>
    import { globalStore } from '@/store/globalStore';
    import { computed } from 'vue';

      export default {
        
        setup() {
            const userType = computed(() => globalStore.userType || "Outro");

            const selectHidden = () => {
            return userType.value === "Cliente" ? "hidden" : "";
            };  

            return {
            userType,
            selectHidden
            };
        },

        methods: {
            voltar(){
              this.$router.push('/confirmaNum')  
            }
        }
        
      };
      </script>
      
      <style scoped>
      header{
        
        display: flex;
        justify-content: center;
      }
      header h1{
        font-size: 1.2rem;
        color: #333;
      }
      header button{
        position: absolute;
        left: 13px;
        top: 65px;
        height: 35px;
        width: auto;
        border: none;
        background-color: transparent;
      }
      form{
        /* border: 1px solid black; */
        width: 80%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }
      .container{
        /* border: 2px solid red; */
        display: flex;
        justify-content: center;
      }
    
      form input, form select{
        font-size: 1em;
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 15px;
        box-sizing: border-box;
      }
      form select{
        box-shadow: 2px 4px 8px black;
      }
    
      p a{
        color: black;
      }
    
      input[type="submit"]{
        width: 100%;
        padding: 15px;
        background-color: #00a000;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        margin-top: 15px;
      }
    
      input[type="submit"]:hover{
        background-color: #00a0009d;
        cursor: pointer;
    
      }
    
      </style>
      