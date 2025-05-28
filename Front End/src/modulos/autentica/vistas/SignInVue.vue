<template>
  <div class="contenedor">
    <form @submit.prevent="entradaUsuario" class="formulario">
      <h2>Validacion De usuario</h2>
      <div class="grupo">
        <label>Correo:</label>
        <input type="email" v-model="correo" required />
      </div>
      <div class="grupo">
        <label>Contraseña:</label>
        <input type="password" v-model="clave" required />
      </div>
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import "../../../firebase/config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const correo = ref("");
const clave = ref("");
const error = ref(null);
const router = useRouter();
const route = useRoute();

const entradaUsuario = async () => {
  error.value = null;
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, correo.value, clave.value);
    const redirect = route.query.redirect || "/bienvenida";
    router.push(redirect);
  } catch (err) {
    switch (err.code) {
      case "auth/user-not-found":
        error.value = "No se encontró un usuario con este correo electrónico.";
        break;
      case "auth/wrong-password":
        error.value = "La contraseña es incorrecta.";
        break;
      default:
        error.value = "Ocurrió un error al iniciar sesion";
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.contenedor {
  max-width: 400px;
  margin: 0px auto;
  padding: 20px;
}
.formulario {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.grupo {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 0.5em;
}
input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
