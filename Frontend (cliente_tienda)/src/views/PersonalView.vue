<template>
  <div>
    <h2>Gestión de Personal</h2>

    <div>
      <input v-model="nuevo.nombre" placeholder="Nombre Completo" />
      <input v-model="nuevo.direccion" placeholder="Dirección" />
      <input v-model="nuevo.telefono" placeholder="Teléfono" />
      <select v-model="nuevo.estatus">
        <option value="1">Vigente</option>
        <option value="2">Baja</option>
      </select>
      <button @click="crearPersonal">Agregar</button>
    </div>

    <ul>
      <li v-for="p in personal" :key="p.id">
        {{ p.nombre }} - {{ p.estatus }}
        <button @click="eliminarPersonal(p.id)">Eliminar</button>
        <button @click="editarPersonal(p)">Editar</button>
      </li>
    </ul>

    <div v-if="editando">
      <h3>Editar Personal</h3>
      <input v-model="editado.nombre" placeholder="Nombre Completo" />
      <input v-model="editado.direccion" placeholder="Dirección" />
      <input v-model="editado.telefono" placeholder="Teléfono" />
      <select v-model="editado.estatus">
        <option value="1">Vigente</option>
        <option value="2">Baja</option>
      </select>
      <button @click="actualizarPersonal">Actualizar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const personal = ref([]);
const nuevo = ref({ nombre: '', direccion: '', telefono: '', estatus: '1' });
const editando = ref(false);
const editado = ref({ id: 0, nombre: '', direccion: '', telefono: '', estatus: '1' });

const cargarPersonal = async () => {
  const res = await api.get('/personal');
  personal.value = res.data;
};

const crearPersonal = async () => {
  await api.post('/personal', nuevo.value);
  await cargarPersonal();
  nuevo.value = { nombre: '', direccion: '', telefono: '', estatus: '1' };
};

const eliminarPersonal = async (id: number) => {
  await api.delete(`/personal/${id}`);
  await cargarPersonal();
};

const editarPersonal = (p) => {
  editando.value = true;
  editado.value = { ...p };
};

const actualizarPersonal = async () => {
  await api.put(`/personal/${editado.value.id}`, editado.value);
  await cargarPersonal();
  editando.value = false;
};
onMounted(() => {
  cargarPersonal();
});
</script>
