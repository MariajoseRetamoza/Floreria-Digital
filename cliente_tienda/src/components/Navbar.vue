<template>
  <div class="navbar">
    <h1>🌷 Florería Digital</h1>
    <div>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/clientes">Clientes</RouterLink>
      <RouterLink to="/personal">Personal</RouterLink>
      <RouterLink to="/arreglos">Arreglos</RouterLink>
      <RouterLink to="/pedidos">Pedidos</RouterLink>
      <a href="#" @click="logout">Salir</a>
    </div>
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

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #fdecef;
  align-items: center;
}
.navbar a {
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.navbar a:hover {
  color: #e91e63;
}
</style>
