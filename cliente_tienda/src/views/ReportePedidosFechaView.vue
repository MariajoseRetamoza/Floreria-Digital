<template>
  <div class="container">
    <h2>Reporte de Pedidos por Fecha</h2>
    <input type="date" v-model="fechaInicio" />
    <input type="date" v-model="fechaFin" />
    <button @click="filtrar">Buscar</button>
    <table v-if="pedidos.length">
      <thead>
        <tr>
          <th>Folio</th>
          <th>Descripción</th>
          <th>Fecha Pedido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pedidos" :key="p.folio">
          <td>{{ p.folio }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.fecha_hora_pedido }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/api';
const pedidos = ref([]);
const fechaInicio = ref('');
const fechaFin = ref('');
const filtrar = async () => {
  const { data } = await api.get(`/reportes/pedidos-fecha?inicio=${fechaInicio.value}&fin=${fechaFin.value}`);
  pedidos.value = data;
};
</script>