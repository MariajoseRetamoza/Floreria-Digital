<template>
  <div class="container mt-5">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Agregar Personal</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos agregados con exito
      </div>

      <div class="card-body">
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
            <button class="btn btn-success" type="submit">Agregar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PersonalAgregar } from "../interfaces/personal-interface";
import { usePersonal } from "../controladores/usePersonal";
const { agregarPersonal, mensaje } = usePersonal();
import { PersonalSchema } from "../schemas/PersonalSchema";
import { Field, Form, ErrorMessage } from "vee-validate";

let personal = ref<PersonalAgregar>({
  nombre: "",
  direccion: "",
  telefono: "",
  estatus: 0,
});

const onTodoBien = async () => {
  await agregarPersonal(personal.value);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
