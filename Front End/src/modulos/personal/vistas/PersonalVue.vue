<template>
  <section>
    <h3></h3>
    <h3>Personal</h3>
    <div>
      <Router-Link :to="{ path: '/personal' + '/agregar' }">
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
        <th>Clave</th>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Estatus</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- Si no hay personal, muestra este solo renglón -->
      <tr v-if="personal.length == 0">
        <td colspan="5" class="centrado">Sin personal registrado</td>
      </tr>

      <!-- Si hay personal, muestra la lista -->
      <tr v-else v-for="(persona, index) in personal" :key="index">
        <td>{{ persona.id }}</td>
        <td>{{ persona.nombre }}</td>
        <td>{{ persona.direccion }}</td>
        <td>{{ persona.telefono }}</td>
        <td>{{ persona.estatus }}</td>
        <td class="centrado">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button type="button" class="btn btn-sm btn-outline-primary">
              <Router-Link
                class="nav-link item"
                :to="{ path: '/personal/' + persona.id + '/editar' }"
                ><i class="fa fa-pencil"></i
              ></Router-Link>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <Router-Link
                class="nav-link item"
                :to="{ path: '/personal/' + persona.id + '/borrar' }"
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
import { usePersonal } from "../controladores/usePersonal.ts";
const { traePersonal, personal } = usePersonal();

//cuando la pagina es visible y esta cargada
onMounted(async () => {
  await traePersonal();
});

//load <--- carga, en memooria
//mounted <---- cargada y se ve en la pantalla
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
