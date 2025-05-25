<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand text-white fw-bold" href="#">Tienda</a>
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
            <Router-Link class="nav-link text-white fw-semibold" to="/clientes">
              Clientes
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link class="nav-link text-white fw-semibold" to="/personal">
              Personal
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link
              class="nav-link text-white fw-semibold"
              to="/articulos"
            >
              Artículos
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link class="nav-link text-white fw-semibold" to="/ventas">
              Ventas
            </Router-Link>
          </li>
          <li class="nav-item">
            <Router-Link
              class="nav-link text-white fw-semibold"
              to="/clientes/registro"
            >
              Registro
            </Router-Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
