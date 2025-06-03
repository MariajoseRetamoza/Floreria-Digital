<template>
  <div class="navbar">
    <h1>🌷 Florería Digital</h1>
    <div>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/clientes">Clientes</RouterLink>
      <RouterLink to="/personal">Personal</RouterLink>
      <RouterLink to="/arreglos">Arreglos</RouterLink>
      <RouterLink to="/pedidos">Pedidos</RouterLink>

      <!-- Reportes -->
      <RouterLink to="/reporte-clientes">Rpt. Clientes</RouterLink>
      <RouterLink to="/reporte-personal">Rpt. Personal</RouterLink>
      <RouterLink to="/reporte-pedidos-fecha">Rpt. Ped. Fecha</RouterLink>
      <RouterLink to="/reporte-pedidos-entregados">Rpt. Entregados</RouterLink>
      <RouterLink to="/reporte-pedidos-pagados">Rpt. Pagados</RouterLink>
      <RouterLink to="/reporte-pedidos-por-personal">Rpt. x Personal</RouterLink>
      <RouterLink to="/reporte-arreglos">Rpt. Arreglos</RouterLink>

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
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #fdecef;
  align-items: center;
  gap: 1rem;
}
.navbar a {
  margin-left: 10px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.navbar a:hover {
  color: #e91e63;
}
</style>
