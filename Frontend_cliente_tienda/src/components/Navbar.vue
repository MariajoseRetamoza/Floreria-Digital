<template>
  <div class="navbar">
    <h1> Florería Digital</h1>
    <div>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/clientes">Clientes</RouterLink>
      <RouterLink to="/personal">Personal</RouterLink>
      <RouterLink to="/arreglos">Arreglos</RouterLink>
      <RouterLink to="/pedidos">Pedidos</RouterLink>
      <RouterLink to="/login" @click.native="logout">Salir</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  await signOut(auth);
  router.push("/login");
};
</script>

<style scoped>
/* Ya se aplica desde global.css */
</style>
