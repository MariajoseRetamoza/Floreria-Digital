<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text">
        <h1>Lovely Flowers Shop</h1>
        <p>Encuentra el ramo perfecto para cada ocasión.</p>
        <button @click="irAProductos">Ver productos →</button>
      </div>
      <div class="hero-image">
        <img src="/img/hero-flor.jpg" alt="Flor principal" />
      </div>
    </section>

    <section class="our-values">
      <div class="text">
        <h2>Ramos personalizados</h2>
        <p>Floristas expertos listos para ayudarte a elegir el ramo ideal.</p>
        <h2>Precios accesibles</h2>
        <p>Gran calidad sin afectar tu bolsillo.</p>
      </div>
      <div class="images">
        <img src="/img/bouquet1.jpg" alt="Bouquet 1" />
        <img src="/img/bouquet2.jpg" alt="Bouquet 2" />
      </div>
    </section>

    <section class="trending">
      <h2>Ramos populares</h2>
      <div class="grid">
        <div v-for="i in 6" :key="i" class="bouquet">
          <img :src="`/img/bouquet${(i % 3) + 1}.jpg`" alt="Bouquet" />
          <span>{{ (25 + i * 2).toFixed(2) }} $</span>
        </div>
      </div>
    </section>

    <section class="why-us">
      <h2>¿Por qué elegirnos?</h2>
      <div class="reasons">
        <div class="reason">
          <i class="icon">🏪</i>
          <p>15 sucursales en la ciudad</p>
        </div>
        <div class="reason">
          <i class="icon">🚚</i>
          <p>Envíos rápidos en menos de 1 hora</p>
        </div>
        <div class="reason">
          <i class="icon">📷</i>
          <p>Vista previa del ramo antes de entregar</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const irAProductos = () => {
  // Aquí puedes redirigir a la vista de productos si la tienes
  // Por ejemplo: router.push("/arreglos")
}
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
  color: #333;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
}

.hero-image img {
  width: 100%;
  border-radius: 1rem;
}

.hero-text h1 {
  font-size: 3rem;
  color: #e91e63;
}

.hero-text p {
  font-size: 1.2rem;
}

.hero-text button {
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  border: none;
  background-color: #e91e63;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
}

.our-values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #fff0f5;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.our-values .images img {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.trending .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.bouquet {
  text-align: center;
}

.bouquet img {
  width: 100%;
  border-radius: 0.5rem;
}

.bouquet span {
  display: block;
  margin-top: 0.5rem;
  color: #e91e63;
  font-weight: bold;
}

.why-us {
  background: #fff0f5;
  padding: 2rem;
  margin-top: 3rem;
  border-radius: 1rem;
}

.why-us .reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-around;
  margin-top: 1rem;
}

.reason {
  text-align: center;
  max-width: 200px;
}

.icon {
  font-size: 2rem;
}
</style>
