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
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="personal.nombre" />
        </div>
        <div class="mb-3">
          <label class="form-label">Dirección</label>
          <input
            type="text"
            class="form-control"
            v-model="personal.direccion"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" v-model="personal.telefono" />
        </div>
        <div class="mb-3">
          <label class="form-label">Estatus</label>
          <input type="text" class="form-control" v-model="personal.estatus" />
        </div>
        <div class="text-end">
          <button class="btn btn-success" @click="agregarPersonal(personal)">
            Agregar
          </button>
        </div>
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
import {Field,Form,ErrorMessage} from "vee-validate";

let personal = ref<PersonalAgregar>({
  nombre: "",
  direccion: "",
  telefono: "",
  estatus: 0,
});
</script>

<style lang="scss" scoped></style>
