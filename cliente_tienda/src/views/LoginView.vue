<template>
  <div class="container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button>Entrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    toast.success('Bienvenido');
    router.push('/');
  } catch (err) {
    toast.error('Correo o contraseña incorrectos');
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
  padding: 3rem;
}
form input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
