<template>
  <div class="container mt-5" v-if="personal[0]">
    <div class="card shadow rounded-3">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Borrar Personal</h4>
      </div>
      <div class="alert alert-warning" role="alert">
        ¿Está seguro de que desea borrar la informacion?
        <i class="fa fa-warning"></i>
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
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Dirección</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].direccion"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].telefono"
            disabled
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Estatus</label>
          <input
            type="text"
            class="form-control"
            v-model="personal[0].estatus"
            disabled
          />
        </div>
        <div class="text-end">
          <button class="btn btn-danger" @click="borrarPersonal(personal[0])">
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
import { usePersonal } from "../controladores/usePersonal";
const { traePersonalPorId, mensaje, personal, borrarPersonal } = usePersonal();
let idPersona = 0;
//para los parametros de la url
const route = useRoute();
//para moverme de la url
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newId) => {
    routeRedirect.push("/personal");
  }
);
onMounted(async () => {
  idPersona = Number(route.params.id);
  await traePersonalPorId(Number(idPersona));
});
</script>

<style lang="scss" scoped></style>
