<template>
  <div>
    <h1>Home</h1>
    <button @click="logout">Cerrar Sesión</button>
  </div>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  await signOut(auth);
  router.push('/login');
};
</script>
