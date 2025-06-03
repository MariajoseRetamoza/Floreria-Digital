<template>
  <div class="container">
    <h2>Gestión de Personal</h2>

    <form @submit.prevent="guardarPersonal">
      <input v-model="form.nombre_completo" placeholder="Nombre completo" />
      <input v-model="form.direccion" placeholder="Dirección" />
      <input v-model="form.telefono" placeholder="Teléfono" />
      <select v-model="form.estatus">
        <option value="1">Vigente</option>
        <option value="2">Baja</option>
      </select>
      <button>{{ editando ? 'Actualizar' : 'Agregar' }}</button>
    </form>

    <ul>
      <li v-for="p in personal" :key="p.ID">
        {{ p.nombre_completo }} - {{ p.telefono }} ({{ estatusTexto(p.estatus) }})
        <button @click="editar(p)">Editar</button>
        <button @click="eliminar(p.ID)">Eliminar</button>
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

const PersonalSchema = z.object({
  nombre_completo: z.string().min(3),
  direccion: z.string().min(5),
  telefono: z.string().min(7),
  estatus: z.union([z.literal('1'), z.literal('2')])
});

const personal = ref<any[]>([]);
const form = ref({ nombre_completo: '', direccion: '', telefono: '', estatus: '1' });
const editando = ref(false);
const editId = ref<number | null>(null);

const cargar = async () => {
  const { data } = await api.get('/personal');
  personal.value = data;
};

const guardarPersonal = async () => {
  try {
    PersonalSchema.parse(form.value);
    if (editando.value) {
      await api.put(`/personal/${editId.value}`, form.value);
      toast.success('Personal actualizado');
    } else {
      await api.post('/personal', form.value);
      toast.success('Personal agregado');
    }
    form.value = { nombre_completo: '', direccion: '', telefono: '', estatus: '1' };
    editando.value = false;
    editId.value = null;
    cargar();
  } catch (err: any) {
    toast.error(err.errors?.[0]?.message || 'Error en formulario');
  }
};

const editar = (p: any) => {
  form.value = { ...p };
  editId.value = p.ID;
  editando.value = true;
};

const eliminar = async (id: number) => {
  await api.delete(`/personal/${id}`);
  toast.success('Personal eliminado');
  cargar();
};

const estatusTexto = (valor: string | number) => {
  return valor == '1' ? 'Vigente' : 'Baja';
};

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
