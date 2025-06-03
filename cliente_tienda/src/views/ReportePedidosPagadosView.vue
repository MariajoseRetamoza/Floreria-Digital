<template>
  <div class="container">
    <h2>Pedidos Pagados / No Pagados</h2>
    <select v-model="pagado">
      <option value="1">Pagados</option>
      <option value="2">No Pagados</option>
    </select>
    <button @click="filtrar">Buscar</button>
    <ul>
      <li v-for="p in pedidos" :key="p.folio">
        {{ p.descripcion }} - {{ p.pagado == 1 ? 'Sí' : 'No' }}
      </li>
    </ul>
    <p v-if="pagado == '1'">Total: ${{ total }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/api';
const pagado = ref('1');
const pedidos = ref([]);
const total = ref(0);
const filtrar = async () => {
  const { data } = await api.get(`/reportes/pedidos-pagados?estado=${pagado.value}`);
  pedidos.value = data.lista;
  total.value = data.total;
};
</script>