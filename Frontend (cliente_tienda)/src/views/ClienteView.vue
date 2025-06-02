<template>
  <div>
    <h2>Gestión de Clientes</h2>

    <div>
      <input v-model="nuevo.nombre_completo" placeholder="Nombre Completo" />
      <input v-model="nuevo.direccion" placeholder="Dirección" />
      <input v-model="nuevo.telefono" placeholder="Teléfono" />
      <button @click="crearCliente">Agregar</button>
    </div>

    <ul>
      <li v-for="c in clientes" :key="c.ID_cliente">
        {{ c.nombre_completo }}
        <button @click="eliminarCliente(c.ID_cliente)">Eliminar</button>
        <button @click="editarCliente(c)">Editar</button>
      </li>
    </ul>

    <div v-if="editando">
      <h3>Editar Cliente</h3>
      <input v-model="editado.nombre_completo" placeholder="Nombre Completo" />
      <input v-model="editado.direccion" placeholder="Dirección" />
      <input v-model="editado.telefono" placeholder="Teléfono" />
      <button @click="actualizarCliente">Actualizar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const clientes = ref([]);
const nuevo = ref({ nombre_completo: '', direccion: '', telefono: '' });
const editando = ref(false);
const editado = ref({ ID_cliente: 0, nombre_completo: '', direccion: '', telefono: '' });

const cargarClientes = async () => {
  const res = await api.get('/clientes');
  clientes.value = res.data;
};

const crearCliente = async () => {
  await api.post('/clientes', nuevo.value);
  await cargarClientes();
  nuevo.value = { nombre_completo: '', direccion: '', telefono: '' };
};

const eliminarCliente = async (id: number) => {
  await api.delete(`/clientes/${id}`);
  await cargarClientes();
};

const editarCliente = (c) => {
  editando.value = true;
  editado.value = { ...c };
};

const actualizarCliente = async () => {
  await api.put(`/clientes/${editado.value.ID_cliente}`, editado.value);
  await cargarClientes();
  editando.value = false;
};
onMounted(() => {
  cargarClientes();
});
</script>
