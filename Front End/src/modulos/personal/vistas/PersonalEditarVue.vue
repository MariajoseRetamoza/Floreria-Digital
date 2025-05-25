<template>
  <div class="container mt-5" v-if="personal[0]">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Agregar Personal</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos actualizados con exito
      </div>
      <div class="card-body">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="personal[0].id"
          disabled
        />
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].nombre"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Dirección</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].direccion"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].telefono"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Estatus</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].estatus"
          />
        </div>
        <div class="text-end">
          <button
            class="btn btn-success"
            @click="actualizarPersonal(personal[0])"
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { usePersonal } from "../controladores/usePersonal";
const { traePersonalPorId, mensaje, personal, actualizarPersonal } =
  usePersonal();
let idPersona = 0;
const route = useRoute();

onMounted(async () => {
  idPersona = Number(route.params.id);
  await traePersonalPorId(Number(idPersona));
});
</script>

<style lang="scss" scoped></style>
