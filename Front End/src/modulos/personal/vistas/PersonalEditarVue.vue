<template>
  <div class="container mt-5" v-if="personal[0]">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Editar Personal</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos actualizados con éxito
      </div>

      <div class="card-body">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control mb-3"
          v-model="personal[0].id"
          disabled
        />

        <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <Field
              name="nombre"
              type="text"
              class="form-control"
              v-model="personal[0].nombre"
            />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <Field
              name="direccion"
              type="text"
              class="form-control"
              v-model="personal[0].direccion"
            />
            <ErrorMessage name="direccion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <Field
              name="telefono"
              type="text"
              class="form-control"
              v-model="personal[0].telefono"
            />
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Estatus</label>
            <Field
              name="estatus"
              type="number"
              class="form-control"
              v-model.number="personal[0].estatus"
            />
            <ErrorMessage name="estatus" class="errorValidacion" />
          </div>
          <div class="text-end">
            <button class="btn btn-success" type="submit">Modificar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePersonal } from "../controladores/usePersonal";
import { PersonalSchema } from "../schemas/PersonalSchema";
import { Field, Form, ErrorMessage } from "vee-validate";

const { traePersonalPorId, mensaje, personal, actualizarPersonal } =
  usePersonal();
const route = useRoute();

onMounted(async () => {
  const idPersona = Number(route.params.id);
  await traePersonalPorId(idPersona);
});

const onTodoBien = async () => {
  await actualizarPersonal(personal.value[0]);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
