<template>
  <section>
    <h3></h3>
    <h3>Pedidos</h3>
    <div>
      <Router-Link :to="{ path: '/pedidos' + '/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar
          <i class="fa fa-plus"></i>
        </button>
      </Router-Link>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Folio</th>
        <th>Id Cliente</th>
        <th>Id arreglos</th>
        <th>Descripcion</th>
        <th>Fecha del pedido</th>
        <th>Fecha de la entrega</th>
        <th>Precio Sugerido</th>
        <th>Id Personal</th>
        <th>Entregado</th>
        <th>Pagado</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- Si no hay personal, muestra este solo renglón -->
      <tr v-if="pedidos.length == 0">
        <td colspan="5" class="centrado">Sin pedidos registrado</td>
      </tr>

      <!-- Si hay personal, muestra la lista -->
      <tr v-else v-for="(pedido, index) in pedidos" :key="index">
        <td>{{ pedido.folio }}</td>
        <td>{{ pedido.ID_Cliente }}</td>
        <td>{{ pedido.ID_Arreglo }}</td>
        <td>{{ pedido.descripcion }}</td>
        <td>{{ pedido.fecha_hora_pedido }}</td>
        <td>{{ pedido.fecha_hora_entrega }}</td>
        <td>{{ pedido.precio_sugerido }}</td>
        <td>{{ pedido.ID_personal }}</td>
        <td>{{ pedido.entregado }}</td>
        <td>{{ pedido.pagado }}</td>
        <td class="centrado">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button type="button" class="btn btn-sm btn-outline-primary">
              <Router-Link
                class="nav-link item"
                :to="{ path: '/pedidos/' + pedido.folio + '/editar' }"
                ><i class="fa fa-pencil"></i
              ></Router-Link>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <Router-Link
                class="nav-link item"
                :to="{ path: '/pedidos/' + pedido.folio + '/borrar' }"
                ><i class="fa fa-trash"></i
              ></Router-Link>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePedidos } from "../controladores/usePedidos.ts";
const { traePedidos, pedidos } = usePedidos();

//cuando la pagina es visible y esta cargada
onMounted(async () => {
  await traePedidos();
});

// //load <--- carga, en memooria
// //mounted <---- cargada y se ve en la pantalla
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 20px;
}
.centrado {
  text-align: center;
}
</style>
