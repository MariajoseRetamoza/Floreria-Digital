<template>
  <div class="container">
    <h2>Gestión de Personal</h2>

    <!-- Formulario de agregar personal -->
    <form @submit.prevent="crearPersonal" class="form">
      <input v-model="nuevo.nombre" placeholder="Nombre" required />
      <input v-model="nuevo.direccion" placeholder="Dirección" required />
      <input v-model="nuevo.telefono" placeholder="Teléfono" required />
      <select v-model="nuevo.estatus" required>
        <option value="1">Vigente</option>
        <option value="2">Baja</option>
      </select>
      <button>Agregar</button>
    </form>

    <!-- Lista de personal -->
    <div class="cards">
      <div v-for="p in personal" :key="p.id" class="card">
        <p>{{ p.nombre }} - {{ p.estatus }}</p>
        <button @click="eliminarPersonal(p.id)">Eliminar</button>
        <button @click="editarPersonal(p)">Editar</button>
      </div>
    </div>

    <!-- Formulario de edición -->
    <div v-if="editando" class="edit">
      <h3>Editar Personal</h3>
      <form @submit.prevent="actualizarPersonal">
        <input v-model="editado.nombre" placeholder="Nombre" required />
        <input v-model="editado.direccion" placeholder="Dirección" required />
        <input v-model="editado.telefono" placeholder="Teléfono" required />
        <select v-model="editado.estatus" required>
          <option value="1">Vigente</option>
          <option value="2">Baja</option>
        </select>
        <button>Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';
import { personalSchema } from '../utils/validators';
import { useToast } from 'vue-toastification';

const toast = useToast();
const personal = ref([]);
const nuevo = ref({ nombre: '', direccion: '', telefono: '', estatus: '1' });
const editando = ref(false);
const editado = ref({ id: 0, nombre: '', direccion: '', telefono: '', estatus: '1' });

const cargarPersonal = async () => {
  try {
    const res = await api.get('/personal');
    personal.value = res.data;
  } catch {
    toast.error('Error al cargar datos');
  }
};

const crearPersonal = async () => {
  try {
    personalSchema.parse(nuevo.value);  // Validar datos con Zod
    await api.post('/personal', nuevo.value);
    toast.success('Personal agregado correctamente');
    await cargarPersonal();
    nuevo.value = { nombre: '', direccion: '', telefono: '', estatus: '1' };
  } catch (error) {
    toast.error(error.errors ? error.errors[0].message : 'Error al agregar personal');
  }
};

const eliminarPersonal = async (id: number) => {
  try {
    await api.delete(`/personal/${id}`);
    toast.success('Personal eliminado');
    await cargarPersonal();
  } catch {
    toast.error('Error al eliminar');
  }
};

const editarPersonal = (p) => {
  editando.value = true;
  editado.value = { ...p };
};

const actualizarPersonal = async () => {
  try {
    personalSchema.parse(editado.value);  // Validar datos con Zod
    await api.put(`/personal/${editado.value.id}`, editado.value);
    toast.success('Personal actualizado');
    await cargarPersonal();
    editando.value = false;
  } catch (error) {
    toast.error(error.errors ? error.errors[0].message : 'Error al actualizar personal');
  }
};

onMounted(() => {
  cargarPersonal();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.form, .edit form {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
}
.card {
  border: 1px solid #ccc;
  padding: 1em;
  background-color: #f9f9f9;
}
</style>
