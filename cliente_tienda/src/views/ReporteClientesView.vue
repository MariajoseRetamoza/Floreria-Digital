<template>
  <div class="container">
    <h2>Reporte de Clientes Registrados</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.ID_cliente">
          <td>{{ c.ID_cliente }}</td>
          <td>{{ c.nombre_completo }}</td>
          <td>{{ c.direccion }}</td>
          <td>{{ c.telefono }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="exportarExcel">Exportar a Excel</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../utils/api';

const clientes = ref([]);

const cargarClientes = async () => {
  const { data } = await api.get('/clientes');
  clientes.value = data;
};

const exportarExcel = async () => {
  const response = await api.get('/reportes/clientes', { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporte_clientes.xlsx';
  link.click();
};

onMounted(cargarClientes);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
}
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
