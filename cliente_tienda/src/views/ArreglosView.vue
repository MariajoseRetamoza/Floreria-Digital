<template>
  <div class="container">
    <h2>Gestión de Arreglos</h2>

    <form @submit.prevent="crearArreglo" class="form">
      <input v-model="nuevo.descripcion" placeholder="Descripción" required />
      <select v-model="nuevo.tipo_arreglo" required>
        <option value="1">Ramo</option>
        <option value="2">Centro de mesa</option>
        <option value="3">Corona</option>
        <option value="4">Mixto</option>
      </select>
      <select v-model="nuevo.estatus" required>
        <option value="1">Vigente</option>
        <option value="2">No vigente</option>
      </select>
      <button>Agregar</button>
    </form>

    <div class="cards">
      <div v-for="a in arreglos" :key="a.ID_arreglo" class="card">
        <p>{{ a.descripcion }} - {{ a.tipo_arreglo }}</p>
        <button @click="eliminarArreglo(a.ID_arreglo)">Eliminar</button>
        <button @click="editarArreglo(a)">Editar</button>
      </div>
    </div>

    <div v-if="editando" class="edit">
      <h3>Editar Arreglo</h3>
      <form @submit.prevent="actualizarArreglo">
        <input v-model="editado.descripcion" placeholder="Descripción" required />
        <select v-model="editado.tipo_arreglo" required>
          <option value="1">Ramo</option>
          <option value="2">Centro de mesa</option>
          <option value="3">Corona</option>
          <option value="4">Mixto</option>
        </select>
        <select v-model="editado.estatus" required>
          <option value="1">Vigente</option>
          <option value="2">No vigente</option>
        </select>
        <button>Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';
import { arregloSchema } from '../utils/validators';
import { useToast } from 'vue-toastification';

const toast = useToast();
const arreglos = ref([]);
const nuevo = ref({ descripcion: '', tipo_arreglo: '1', estatus: '1' });
const editando = ref(false);
const editado = ref({ ID_arreglo: 0, ...nuevo.value });

const cargarArreglos = async () => {
  try {
    const res = await api.get('/arreglos');
    arreglos.value = res.data;
  } catch {
    toast.error('Error al cargar arreglos');
  }
};

const crearArreglo = async () => {
  try {
    arregloSchema.parse(nuevo.value);
    await api.post('/arreglos', nuevo.value);
    toast.success('Arreglo agregado correctamente');
    await cargarArreglos();
    nuevo.value = { descripcion: '', tipo_arreglo: '1', estatus: '1' };
  } catch (error) {
    toast.error(error.errors ? error.errors[0].message : 'Error al agregar arreglo');
  }
};

const eliminarArreglo = async (id: number) => {
  try {
    await api.delete(`/arreglos/${id}`);
    toast.success('Arreglo eliminado');
    await cargarArreglos();
  } catch {
    toast.error('Error al eliminar arreglo');
  }
};

const editarArreglo = (a) => {
  editando.value = true;
  editado.value = { ...a };
};

const actualizarArreglo = async () => {
  try {
    arregloSchema.parse(editado.value);
    await api.put(`/arreglos/${editado.value.ID_arreglo}`, editado.value);
    toast.success('Arreglo actualizado');
    await cargarArreglos();
    editando.value = false;
  } catch (error) {
    toast.error(error.errors ? error.errors[0].message : 'Error al actualizar arreglo');
  }
};

onMounted(() => {
  cargarArreglos();
});
</script>

<style scoped>
.container { display: flex; flex-direction: column; padding: 1em; }
.form, .edit form { display: flex; gap: 0.5em; flex-wrap: wrap; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1em; }
.card { border: 1px solid #ccc; padding: 1em; background-color: #f9f9f9; }
</style>
