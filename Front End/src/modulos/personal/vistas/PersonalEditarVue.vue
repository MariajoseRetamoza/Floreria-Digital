<template>
  <div class="container mt-5" v-if="personal">
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
          v-model="personal.id"
          disabled
        />

        <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <Field
              name="nombre"
              type="text"
              class="form-control"
              v-model="personal.nombre"
            />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <Field
              name="direccion"
              type="text"
              class="form-control"
              v-model="personal.direccion"
            />
            <ErrorMessage name="direccion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <Field
              name="telefono"
              type="text"
              class="form-control"
              v-model="personal.telefono"
            />
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label class="form-label">Estatus</label>
            <Field
              name="estatus"
              type="number"
              class="form-control"
              v-model.number="personal.estatus"
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
  if (personal.value) {
    await actualizarPersonal(personal.value);
  }
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
