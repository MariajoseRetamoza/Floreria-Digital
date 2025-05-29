<template>
  <div class="container mt-5" v-if="pedido">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Editar Pedido</h4>
      </div>

      <div v-if="mensaje === 1" class="alert alert-success" role="alert">
        Datos actualizados con éxito
      </div>

      <div class="card-body">
        <label class="form-label">Folio</label>
        <input
          type="text"
          class="form-control mb-3"
          v-model="pedido.folio"
          disabled
        />

        <Form :validation-schema="PedidosSchema" @submit="onSubmit">
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <Field
              name="descripcion"
              type="text"
              class="form-control"
              v-model="pedido.descripcion"
            />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">Fecha y Hora Pedido</label>
            <Field
              name="fecha_hora_pedido"
              type="datetime-local"
              class="form-control"
              v-model="pedido.fecha_hora_pedido"
            />
            <ErrorMessage name="fecha_hora_pedido" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">Fecha y Hora Entrega</label>
            <Field
              name="fecha_hora_entrega"
              type="datetime-local"
              class="form-control"
              v-model="pedido.fecha_hora_entrega"
            />
            <ErrorMessage name="fecha_hora_entrega" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">Precio Sugerido</label>
            <Field
              name="precio_sugerido"
              type="number"
              step="0.01"
              class="form-control"
              v-model.number="pedido.precio_sugerido"
            />
            <ErrorMessage name="precio_sugerido" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">ID Cliente</label>
            <Field
              name="ID_Cliente"
              type="number"
              class="form-control"
              v-model.number="pedido.ID_Cliente"
            />
            <ErrorMessage name="ID_Cliente" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">ID Arreglo</label>
            <Field
              name="ID_Arreglo"
              type="number"
              class="form-control"
              v-model.number="pedido.ID_Arreglo"
            />
            <ErrorMessage name="ID_Arreglo" class="errorValidacion" />
          </div>

          <div class="mb-3">
            <label class="form-label">ID Personal</label>
            <Field
              name="ID_personal"
              type="number"
              class="form-control"
              v-model.number="pedido.ID_personal"
            />
            <ErrorMessage name="ID_personal" class="errorValidacion" />
          </div>

          <!-- CAMBIO: Entregado como campo numérico -->
          <div class="mb-3">
            <label class="form-label">Entregado</label>
            <Field
              name="entregado"
              type="number"
              class="form-control"
              v-model.number="pedido.entregado"
            />
            <ErrorMessage name="entregado" class="errorValidacion" />
          </div>

          <!-- CAMBIO: Pagado como campo numérico -->
          <div class="mb-3">
            <label class="form-label">Pagado</label>
            <Field
              name="pagado"
              type="number"
              class="form-control"
              v-model.number="pedido.pagado"
            />
            <ErrorMessage name="pagado" class="errorValidacion" />
          </div>

          <div class="text-end">
            <button class="btn btn-success" type="submit">Modificar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>

  <div v-else class="text-center mt-5">
    <p>Cargando datos del pedido...</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePedidos } from "../controladores/usePedidos";
import { PedidosSchema } from "../schemas/PedidosSchema";
import { Field, Form, ErrorMessage } from "vee-validate";

const { traePedidosPorFolio, mensaje, pedido, actualizarPedidos } =
  usePedidos();
const route = useRoute();

onMounted(async () => {
  const folioPedido = Number(route.params.folio);
  await traePedidosPorFolio(folioPedido);
});

const onSubmit = async () => {
  if (pedido.value) {
    await actualizarPedidos(pedido.value);
  }
};
</script>

<style scoped lang="scss">
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
