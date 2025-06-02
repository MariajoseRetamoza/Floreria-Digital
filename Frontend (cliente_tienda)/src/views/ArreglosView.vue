<template>
  <div>
    <h2>Gestión de Arreglos</h2>

    <div>
      <input v-model="nuevo.descripcion" placeholder="Descripción" />
      <select v-model="nuevo.tipo_arreglo">
        <option value="1">Ramo</option>
        <option value="2">Centro de mesa</option>
        <option value="3">Corona</option>
        <option value="4">Mixto</option>
      </select>
      <select v-model="nuevo.estatus">
        <option value="1">Vigente</option>
        <option value="2">No vigente</option>
      </select>
      <button @click="crearArreglo">Agregar</button>
    </div>

    <ul>
      <li v-for="a in arreglos" :key="a.ID_arreglo">
        {{ a.descripcion }} - {{ a.tipo_arreglo }}
        <button @click="eliminarArreglo(a.ID_arreglo)">Eliminar</button>
        <button @click="editarArreglo(a)">Editar</button>
      </li>
    </ul>

    <div v-if="editando">
      <h3>Editar Arreglo</h3>
      <input v-model="editado.descripcion" placeholder="Descripción" />
      <select v-model="editado.tipo_arreglo">
        <option value="1">Ramo</option>
        <option value="2">Centro de mesa</option>
        <option value="3">Corona</option>
        <option value="4">Mixto</option>
      </select>
      <select v-model="editado.estatus">
        <option value="1">Vigente</option>
        <option value="2">No vigente</option>
      </select>
      <button @click="actualizarArreglo">Actualizar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const arreglos = ref([]);
const nuevo = ref({ descripcion: '', tipo_arreglo: '1', estatus: '1' });
const editando = ref(false);
const editado = ref({ ID_arreglo: 0, ...nuevo.value });

const cargarArreglos = async () => {
  const res = await api.get('/arreglos');
  arreglos.value = res.data;
};

const crearArreglo = async () => {
  await api.post('/arreglos', nuevo.value);
  await cargarArreglos();
  nuevo.value = { descripcion: '', tipo_arreglo: '1', estatus: '1' };
};

const eliminarArreglo = async (id: number) => {
  await api.delete(`/arreglos/${id}`);
  await cargarArreglos();
};

const editarArreglo = (a) => {
  editando.value = true;
  editado.value = { ...a };
};

const actualizarArreglo = async () => {
  await api.put(`/arreglos/${editado.value.ID_arreglo}`, editado.value);
  await cargarArreglos();
  editando.value = false;
};
onMounted(() => {
  cargarArreglos();
});
</script>
