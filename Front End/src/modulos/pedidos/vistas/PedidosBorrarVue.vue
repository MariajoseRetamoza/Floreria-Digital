<template>
  <div class="container mt-5" v-if="pedido">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Borrar Pedido</h4>
      </div>
      <div class="alert alert-warning" role="alert">
        ¿Está seguro de que desea borrar la informacion?
        <i class="fa fa-warning"></i>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Folio</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.folio"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">ID Cliente</label>
          <input
            type="number"
            class="form-control"
            v-model="pedido.ID_Cliente"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">ID Arreglo</label>
          <input
            type="number"
            class="form-control"
            v-model="pedido.ID_Arreglo"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.descripcion"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Fecha y Hora Pedido</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.fecha_hora_pedido"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Fecha y Hora Entrega</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.fecha_hora_entrega"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Precio Sugerido</label>
          <input
            type="number"
            class="form-control"
            v-model="pedido.precio_sugerido"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">ID Personal</label>
          <input
            type="number"
            class="form-control"
            v-model="pedido.ID_personal"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Entregado</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.entregado"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Pagado</label>
          <input
            type="text"
            class="form-control"
            v-model="pedido.pagado"
            disabled
          />
        </div>
        <div class="text-end">
          <button class="btn btn-danger" @click="borrarPedidos(pedido)">
            Borrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePedidos } from "../controladores/usePedidos";
const { traePedidosPorFolio, mensaje, pedido, borrarPedidos } = usePedidos();
let folioPedido = 0;
//para los parametros de la url
const route = useRoute();
//para moverme de la url
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newId) => {
    routeRedirect.push("/pedidos");
  }
);
onMounted(async () => {
  folioPedido = Number(route.params.folio);
  await traePedidosPorFolio(Number(folioPedido));
});
</script>

<style lang="scss" scoped></style>
