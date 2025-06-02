<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <input v-model="email" placeholder="Correo" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="login">Ingresar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/');
  } catch (error) {
    alert('Error al iniciar sesión');
  }
};
</script>
