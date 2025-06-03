<template>
  <div class="container">
    <h2>Gestión de Arreglos Florales</h2>

    <form @submit.prevent="guardarArreglo">
      <input v-model="form.descripcion" placeholder="Descripción" />
      <select v-model="form.tipo_arreglo">
        <option value="1">Ramo</option>
        <option value="2">Centro de mesa</option>
        <option value="3">Corona</option>
        <option value="4">Mixto</option>
      </select>
      <select v-model="form.estatus">
        <option value="1">Vigente</option>
        <option value="2">No vigente</option>
      </select>
      <button>{{ editando ? 'Actualizar' : 'Agregar' }}</button>
    </form>

    <ul>
      <li v-for="a in arreglos" :key="a.ID_arreglo">
        {{ a.descripcion }} - {{ tipoTexto(a.tipo_arreglo) }} ({{ estatusTexto(a.estatus) }})
        <button @click="editar(a)">Editar</button>
        <button @click="eliminar(a.ID_arreglo)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { z } from 'zod';
import api from '../utils/api';
import { useToast } from 'vue-toastification';

const toast = useToast();

const ArregloSchema = z.object({
  descripcion: z.string().min(3),
  tipo_arreglo: z.string(),
  estatus: z.string()
});

const arreglos = ref<any[]>([]);
const form = ref({ descripcion: '', tipo_arreglo: '1', estatus: '1' });
const editando = ref(false);
const editId = ref<number | null>(null);

const cargar = async () => {
  const { data } = await api.get('/arreglos');
  arreglos.value = data;
};

const guardarArreglo = async () => {
  try {
    ArregloSchema.parse(form.value);
    if (editando.value) {
      await api.put(`/arreglos/${editId.value}`, form.value);
      toast.success('Arreglo actualizado');
    } else {
      await api.post('/arreglos', form.value);
      toast.success('Arreglo agregado');
    }
    form.value = { descripcion: '', tipo_arreglo: '1', estatus: '1' };
    editando.value = false;
    editId.value = null;
    cargar();
  } catch (err: any) {
    toast.error(err.errors?.[0]?.message || 'Error en formulario');
  }
};

const editar = (a: any) => {
  form.value = { ...a };
  editId.value = a.ID_arreglo;
  editando.value = true;
};

const eliminar = async (id: number) => {
  await api.delete(`/arreglos/${id}`);
  toast.success('Arreglo eliminado');
  cargar();
};

const tipoTexto = (val: string | number) => {
  const tipos = { 1: 'Ramo', 2: 'Centro de mesa', 3: 'Corona', 4: 'Mixto' };
  return tipos[val as keyof typeof tipos] || 'Desconocido';
};

const estatusTexto = (val: string | number) => (val == '1' ? 'Vigente' : 'No vigente');

onMounted(cargar);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
form input, form select {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
