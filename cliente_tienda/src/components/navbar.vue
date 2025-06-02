<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/personal">Personal</router-link>
    <router-link to="/clientes">Clientes</router-link>
    <router-link to="/pedidos">Pedidos</router-link>
    <router-link to="/arreglos">Arreglos</router-link>
    <router-link to="/login">Salir</router-link>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  background-color: #4CAF50;
  padding: 1em;
}
nav a {
  color: white;
  text-decoration: none;
}
</style>
