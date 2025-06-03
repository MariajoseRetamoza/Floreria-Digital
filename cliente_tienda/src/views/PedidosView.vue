<template>
  <div class="container">
    <h2>Gestión de Pedidos</h2>

    <form @submit.prevent="guardarPedido">
      <input v-model="form.ID_Cliente" placeholder="ID Cliente" type="number" />
      <input v-model="form.ID_Arreglo" placeholder="ID Arreglo" type="number" />
      <textarea v-model="form.descripcion" placeholder="Descripción"></textarea>
      <input v-model="form.fecha_hora_pedido" type="datetime-local" />
      <input v-model="form.fecha_hora_entrega" type="datetime-local" />
      <input v-model="form.direccion_entrega" placeholder="Dirección de entrega" />
      <input v-model="form.precio_sugerido" placeholder="Precio" type="number" />
      <input v-model="form.ID_personal" placeholder="ID Personal" type="number" />
      <select v-model="form.entregado">
        <option value="1">Entregado</option>
        <option value="2">No entregado</option>
      </select>
      <select v-model="form.pagado">
        <option value="1">Pagado</option>
        <option value="2">No pagado</option>
      </select>
      <button>{{ editando ? 'Actualizar' : 'Agregar' }}</button>
    </form>

    <ul>
      <li v-for="p in pedidos" :key="p.folio">
        {{ p.descripcion }} - ${{ p.precio_sugerido }} ({{ estadoTexto(p.entregado) }}, {{ pagoTexto(p.pagado) }})
        <button @click="editar(p)">Editar</button>
        <button @click="eliminar(p.folio)">Eliminar</button>
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

const PedidoSchema = z.object({
  ID_Cliente: z.string().min(1),
  ID_Arreglo: z.string().min(1),
  descripcion: z.string().min(5),
  fecha_hora_pedido: z.string(),
  fecha_hora_entrega: z.string(),
  direccion_entrega: z.string().min(5),
  precio_sugerido: z.string().min(1),
  ID_personal: z.string().min(1),
  entregado: z.string(),
  pagado: z.string()
});

const pedidos = ref<any[]>([]);
const form = ref({
  ID_Cliente: '',
  ID_Arreglo: '',
  descripcion: '',
  fecha_hora_pedido: '',
  fecha_hora_entrega: '',
  direccion_entrega: '',
  precio_sugerido: '',
  ID_personal: '',
  entregado: '2',
  pagado: '2'
});
const editando = ref(false);
const editFolio = ref<number | null>(null);

const cargar = async () => {
  const { data } = await api.get('/pedidos');
  pedidos.value = data;
};

const guardarPedido = async () => {
  try {
    PedidoSchema.parse(form.value);
    if (editando.value) {
      await api.put(`/pedidos/${editFolio.value}`, form.value);
      toast.success('Pedido actualizado');
    } else {
      await api.post('/pedidos', form.value);
      toast.success('Pedido agregado');
    }
    resetearFormulario();
    cargar();
  } catch (err: any) {
    toast.error(err.errors?.[0]?.message || 'Error en formulario');
  }
};

const editar = (p: any) => {
  form.value = { ...p };
  editFolio.value = p.folio;
  editando.value = true;
};

const eliminar = async (folio: number) => {
  await api.delete(`/pedidos/${folio}`);
  toast.success('Pedido eliminado');
  cargar();
};

const resetearFormulario = () => {
  form.value = {
    ID_Cliente: '',
    ID_Arreglo: '',
    descripcion: '',
    fecha_hora_pedido: '',
    fecha_hora_entrega: '',
    direccion_entrega: '',
    precio_sugerido: '',
    ID_personal: '',
    entregado: '2',
    pagado: '2'
  };
  editando.value = false;
  editFolio.value = null;
};

const estadoTexto = (val: string | number) => (val == '1' ? 'Entregado' : 'No entregado');
const pagoTexto = (val: string | number) => (val == '1' ? 'Pagado' : 'No pagado');

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
form input,
form textarea,
form select {
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
