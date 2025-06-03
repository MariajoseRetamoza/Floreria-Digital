<template>
  <div class="container">
    <h2>Pedidos Entregados / No Entregados</h2>
    <select v-model="entregado">
      <option value="1">Entregados</option>
      <option value="2">No Entregados</option>
    </select>
    <button @click="filtrar">Buscar</button>
    <ul>
      <li v-for="p in pedidos" :key="p.folio">
        {{ p.descripcion }} - {{ p.entregado == 1 ? 'Sí' : 'No' }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/api';
const entregado = ref('1');
const pedidos = ref([]);
const filtrar = async () => {
  const { data } = await api.get(`/reportes/pedidos-entregados?estado=${entregado.value}`);
  pedidos.value = data;
};
</script>