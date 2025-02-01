<template>

<header>
  <button @click="voltar">&#9001;</button>
  <h1>Confirme seu Número</h1>
</header>
<hr>
<div class="container">
  <form @submit.prevent="submitForm">
    <label for="">informe o código que enviamos para o Número {{ phoneNumber }}</label>
    <input type="number" max="6" placeholder="------">
    <p>Não recebeu? <a href="">Enviar novamente</a></p>
    <input type="submit" value="Continuar">
  </form>
</div>

  </template>
  
  <script>
  export default {
    computed:{
      phoneNumber(){
        return this.$route.query.phoneNumber;
      }
    },
    methods:{
      voltar(){
        this.$router.push("/")
      },
      // submitForm(){
      //   this.$router.push('/confirmaNum');

      // }
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
    position: relative;
    left: -130px;
    top: 6px;
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

  form input{
    font-size: 2em;
    width: 50%;
    padding: 20px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
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
  