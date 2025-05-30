<template>
  <nav class="navbar navbar-expand-lg color-nav navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand titulo fw-bold" href="/bienvenida"
        >Floreria Digital</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Router-Link class="nav-link letra fw-semibold" to="/personal">
              Personal
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link class="nav-link letra fw-semibold" to="/clientes">
              Clientes
            </Router-Link>
          </li>

          <li class="nav-item">
            <Router-Link
              class="nav-link letra fw-semibold"
              to="/arreglos-florales"
            >
              Arreglos Florales
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link class="nav-link letra fw-semibold" to="/pedidos">
              Pedidos
            </Router-Link>
          </li>

          <li class="nav-item" v-if="usuarioAutenticado">
            <button @click.prevent="cerrarSesion" class="nav-link btn btn-link">
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const usuarioAutenticado = ref(false);
const auth = getAuth();
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    usuarioAutenticado.value = !!user;
  });
});

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push("/bienvenida");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
</script>

<style lang="scss" scoped>
.color-nav {
  background-color: transparent !important;
  box-shadow: none;
  border: none;
}

.navbar-nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-nav .nav-item {
  margin: 0 18px;
}

.navbar-nav .nav-link.letra {
  color: #312736 !important;
  background: none !important;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s, border-bottom 0.2s;
  padding: 8px 18px;
  border-bottom: 2px solid transparent;
}

.navbar-nav .nav-link.letra.router-link-active {
  color: #c71c1c !important;
  border-bottom: 2px solid #c71c1c;
  background: #f0f4f8 !important;
}

.navbar-nav .nav-link.letra:hover:not(.router-link-active) {
  background: #f0f4f8 !important;
  color: #c71c1c !important;
}

.titulo,
.titulo:visited,
.titulo:focus,
.titulo:hover,
.titulo:active {
  color: #c62828 !important;
  background: transparent !important;
  text-decoration: none !important;
}
</style>
