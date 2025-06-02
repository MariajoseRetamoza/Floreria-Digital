<template>
  <div>
    <h2>Gestión de Pedidos</h2>

    <div>
      <input v-model="nuevo.ID_Cliente" placeholder="ID Cliente" type="number" />
      <input v-model="nuevo.ID_Arreglo" placeholder="ID Arreglo" type="number" />
      <input v-model="nuevo.descripcion" placeholder="Descripción" />
      <input v-model="nuevo.fecha_hora_pedido" placeholder="Fecha Pedido" />
      <input v-model="nuevo.fecha_hora_entrega" placeholder="Fecha Entrega" />
      <input v-model="nuevo.precio_sugerido" placeholder="Precio Sugerido" type="number" />
      <input v-model="nuevo.ID_personal" placeholder="ID Personal" type="number" />
      <select v-model="nuevo.entregado">
        <option value="1">Sí</option>
        <option value="2">No</option>
      </select>
      <select v-model="nuevo.pagado">
        <option value="1">Sí</option>
        <option value="2">No</option>
      </select>
      <button @click="crearPedido">Agregar</button>
    </div>

    <ul>
      <li v-for="p in pedidos" :key="p.folio">
        {{ p.descripcion }} - {{ p.precio_sugerido }}
        <button @click="eliminarPedido(p.folio)">Eliminar</button>
        <button @click="editarPedido(p)">Editar</button>
      </li>
    </ul>

    <div v-if="editando">
      <h3>Editar Pedido</h3>
      <input v-model="editado.ID_Cliente" placeholder="ID Cliente" type="number" />
      <input v-model="editado.ID_Arreglo" placeholder="ID Arreglo" type="number" />
      <input v-model="editado.descripcion" placeholder="Descripción" />
      <input v-model="editado.fecha_hora_pedido" placeholder="Fecha Pedido" />
      <input v-model="editado.fecha_hora_entrega" placeholder="Fecha Entrega" />
      <input v-model="editado.precio_sugerido" placeholder="Precio Sugerido" type="number" />
      <input v-model="editado.ID_personal" placeholder="ID Personal" type="number" />
      <select v-model="editado.entregado">
        <option value="1">Sí</option>
        <option value="2">No</option>
      </select>
      <select v-model="editado.pagado">
        <option value="1">Sí</option>
        <option value="2">No</option>
      </select>
      <button @click="actualizarPedido">Actualizar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const pedidos = ref([]);
const nuevo = ref({
  ID_Cliente: '', ID_Arreglo: '', descripcion: '', fecha_hora_pedido: '', fecha_hora_entrega: '',
  precio_sugerido: 0, ID_personal: '', entregado: '2', pagado: '2'
});
const editando = ref(false);
const editado = ref({ folio: 0, ...nuevo.value });

const cargarPedidos = async () => {
  const res = await api.get('/pedidos');
  pedidos.value = res.data;
};

const crearPedido = async () => {
  await api.post('/pedidos', nuevo.value);
  await cargarPedidos();
  nuevo.value = { ...nuevo.value, ID_Cliente: '', ID_Arreglo: '', descripcion: '', fecha_hora_pedido: '', fecha_hora_entrega: '', precio_sugerido: 0, ID_personal: '' };
};

const eliminarPedido = async (folio: number) => {
  await api.delete(`/pedidos/${folio}`);
  await cargarPedidos();
};

const editarPedido = (p) => {
  editando.value = true;
  editado.value = { ...p };
};

const actualizarPedido = async () => {
  await api.put(`/pedidos/${editado.value.folio}`, editado.value);
  await cargarPedidos();
  editando.value = false;
};
onMounted(() => {
  cargarPedidos();
});
</script>
