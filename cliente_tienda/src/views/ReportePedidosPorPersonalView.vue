<template>
  <div class="container">
    <h2>Pedidos por Personal</h2>
    <input v-model="idPersonal" type="number" placeholder="ID Personal" />
    <button @click="filtrar">Buscar</button>
    <ul>
      <li v-for="p in pedidos" :key="p.folio">
        {{ p.descripcion }} - Asignado: {{ p.ID_personal }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import api from '../utils/api';
const idPersonal = ref('');
const pedidos = ref([]);
const filtrar = async () => {
  const { data } = await api.get(`/reportes/pedidos-por-personal/${idPersonal.value}`);
  pedidos.value = data;
};
</script>