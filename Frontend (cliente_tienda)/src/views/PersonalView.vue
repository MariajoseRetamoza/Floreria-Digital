<template>
  <div class="container">
    <h2>Gestión de Personal</h2>
    <form @submit.prevent="crearPersonal" class="form">
      <input v-model="nuevo.nombre" placeholder="Nombre" required />
      <input v-model="nuevo.direccion" placeholder="Dirección" required />
      <input v-model="nuevo.telefono" placeholder="Teléfono" required />
      <select v-model="nuevo.estatus" required>
        <option value="1">Vigente</option>
        <option value="2">Baja</option>
      </select>
      <button>Agregar</button>
    </form>

    <div class="cards">
      <div v-for="p in personal" :key="p.id" class="card">
        <p>{{ p.nombre }} - {{ p.estatus }}</p>
        <button @click="eliminarPersonal(p.id)">Eliminar</button>
        <button @click="editarPersonal(p)">Editar</button>
      </div>
    </div>

    <div v-if="editando" class="edit">
      <h3>Editar</h3>
      <form @submit.prevent="actualizarPersonal">
        <input v-model="editado.nombre" placeholder="Nombre" required />
        <input v-model="editado.direccion" placeholder="Dirección" required />
        <input v-model="editado.telefono" placeholder="Teléfono" required />
        <select v-model="editado.estatus" required>
          <option value="1">Vigente</option>
          <option value="2">Baja</option>
        </select>
        <button>Actualizar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.form, .edit form {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
}
.card {
  border: 1px solid #ccc;
  padding: 1em;
  background-color: #f9f9f9;
}
</style>
