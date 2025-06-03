<template>
  <div class="container">
    <h2>Reporte de Arreglos Florales</h2>
    <select v-model="tipo">
      <option value="">Todos</option>
      <option value="1">Ramo</option>
      <option value="2">Centro de mesa</option>
      <option value="3">Corona</option>
      <option value="4">Mixto</option>
    </select>
    <button @click="filtrar">Buscar</button>
    <ul>
      <li v-for="a in arreglos" :key="a.ID_arreglo">
        {{ a.descripcion }} - {{ tipoTexto(a.tipo_arreglo) }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/api';
const tipo = ref('');
const arreglos = ref([]);
const filtrar = async () => {
  const { data } = await api.get(`/reportes/arreglos?tipo=${tipo.value}`);
  arreglos.value = data;
};
const tipoTexto = (t: string | number) => {
  return ['Ramo', 'Centro de mesa', 'Corona', 'Mixto'][Number(t) - 1] || 'N/A';
};
</script>
