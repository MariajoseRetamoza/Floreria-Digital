<template>
  <div class="container">
    <h2>Gestión de Clientes</h2>

    <form @submit.prevent="guardarCliente">
      <input v-model="form.nombre_completo" placeholder="Nombre completo" />
      <input v-model="form.direccion" placeholder="Dirección" />
      <input v-model="form.telefono" placeholder="Teléfono" />
      <button>{{ editando ? 'Actualizar' : 'Agregar' }}</button>
    </form>

    <ul>
      <li v-for="cliente in clientes" :key="cliente.ID_cliente">
        {{ cliente.nombre_completo }} - {{ cliente.telefono }}
        <button @click="editar(cliente)">Editar</button>
        <button @click="eliminar(cliente.ID_cliente)">Eliminar</button>
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

const ClienteSchema = z.object({
  nombre_completo: z.string().min(3),
  direccion: z.string().min(5),
  telefono: z.string().min(7)
});

const clientes = ref<any[]>([]);
const form = ref({ nombre_completo: '', direccion: '', telefono: '' });
const editando = ref(false);
const editId = ref<number | null>(null);

const cargar = async () => {
  const { data } = await api.get('/clientes');
  clientes.value = data;
};

const guardarCliente = async () => {
  try {
    ClienteSchema.parse(form.value);
    if (editando.value) {
      await api.put(`/clientes/${editId.value}`, form.value);
      toast.success('Cliente actualizado');
    } else {
      await api.post('/clientes', form.value);
      toast.success('Cliente agregado');
    }
    form.value = { nombre_completo: '', direccion: '', telefono: '' };
    editando.value = false;
    editId.value = null;
    cargar();
  } catch (err: any) {
    toast.error(err.errors?.[0]?.message || 'Error en formulario');
  }
};

const editar = (cliente: any) => {
  form.value = { ...cliente };
  editId.value = cliente.ID_cliente;
  editando.value = true;
};

const eliminar = async (id: number) => {
  await api.delete(`/clientes/${id}`);
  toast.success('Cliente eliminado');
  cargar();
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
form input {
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
