<template>
  <div class="container mt-5">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Agregar Pedido</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Pedido agregado con éxito
      </div>
      <div class="card-body">
        <Form :validation-schema="PedidosSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label class="form-label">ID Cliente</label>
            <Field
              name="ID_Cliente"
              type="number"
              class="form-control"
              v-model.number="pedidos.ID_Cliente"
            />
            <ErrorMessage name="ID_Cliente" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">ID Arreglo</label>
            <Field
              name="ID_Arreglo"
              type="number"
              class="form-control"
              v-model.number="pedidos.ID_Arreglo"
            />
            <ErrorMessage name="ID_Arreglo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <Field
              name="descripcion"
              type="text"
              class="form-control"
              v-model="pedidos.descripcion"
            />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Fecha y hora del pedido</label>
            <Field
              name="fecha_hora_pedido"
              type="datetime-local"
              class="form-control"
              v-model="pedidos.fecha_hora_pedido"
            />
            <ErrorMessage name="fecha_hora_pedido" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Fecha y hora de entrega</label>
            <Field
              name="fecha_hora_entrega"
              type="datetime-local"
              class="form-control"
              v-model="pedidos.fecha_hora_entrega"
            />
            <ErrorMessage name="fecha_hora_entrega" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Precio sugerido</label>
            <Field
              name="precio_sugerido"
              type="number"
              class="form-control"
              v-model.number="pedidos.precio_sugerido"
            />
            <ErrorMessage name="precio_sugerido" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">ID Personal</label>
            <Field
              name="ID_personal"
              type="number"
              class="form-control"
              v-model.number="pedidos.ID_personal"
            />
            <ErrorMessage name="ID_personal" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Entregado</label>
            <Field
              name="entregado"
              type="number"
              class="form-control"
              v-model="pedidos.entregado"
            />
            <ErrorMessage name="entregado" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Pagado</label>
            <Field
              name="pagado"
              type="number"
              class="form-control"
              v-model="pedidos.pagado"
            />
            <ErrorMessage name="pagado" class="errorValidacion" />
          </div>
          <div class="text-end">
            <button class="btn btn-success" type="submit">
              Agregar Pedido
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PedidosAgregar } from "../interfaces/pedidos-interface";
import { usePedidos } from "../controladores/usePedidos";
const { agregarPedidos, mensaje } = usePedidos();
import { PedidosSchema } from "../schemas/PedidosSchema";
import { Field, Form, ErrorMessage } from "vee-validate";

let pedidos = ref<PedidosAgregar>({
  ID_Cliente: 0,
  ID_Arreglo: 0,
  descripcion: "",
  fecha_hora_pedido: "",
  fecha_hora_entrega: "",
  precio_sugerido: 0,
  ID_personal: 0,
  entregado: 0,
  pagado: 0,
});

const onTodoBien = async () => {
  await agregarPedidos(pedidos.value);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
