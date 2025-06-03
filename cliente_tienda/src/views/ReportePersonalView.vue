<template>
  <div class="container">
    <h2>Reporte de Personal</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in personal" :key="p.ID">
          <td>{{ p.ID }}</td>
          <td>{{ p.nombre_completo }}</td>
          <td>{{ p.telefono }}</td>
          <td>{{ p.estatus == 1 ? 'Vigente' : 'Baja' }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="exportar">Exportar a Excel</button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';
const personal = ref([]);
const cargar = async () => {
  const { data } = await api.get('/personal');
  personal.value = data;
};
onMounted(cargar);
const exportar = async () => {
  const res = await api.get('/reportes/personal', { responseType: 'blob' });
  const blob = new Blob([res.data]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporte_personal.xlsx';
  link.click();
};
</script>