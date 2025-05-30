<template>
  <div class="contenedor">
    <article class="art1">
      <h1>¡Bienvenido al sistema de administración de tu florería digital!</h1>
      <p></p>
      <span
        >Este sistema está diseñado para facilitar la administración integral de
        la florería, permitiendo un control eficiente de pedidos, clientes,
        personal y arreglos florales. A través de esta plataforma, podrás
        registrar y consultar información clave, generar reportes detallados,
        dar seguimiento a entregas y pagos, así como mantener actualizada la
        base de datos de productos y servicios ofrecidos. Nuestro objetivo es
        brindarte una herramienta intuitiva, rápida y segura para optimizar los
        procesos operativos de la florería, centralizando toda la información en
        un solo lugar.</span
      >
    </article>
    <article class="art2">
      <img src="../img/flores2.avif" alt="maceta" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 10px;
  margin: 0;
  display: block;
}

.contenedor {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100dvh;
  background: #f0f4f8;
  overflow: hidden;
}

.art1,
.art2 {
  flex: 1 1 50%;
  display: flex;
  height: 100dvh; // También aquí
  box-sizing: border-box;
}

.art1 {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 250px;
  padding-left: 40px;
  color: #312736;
  background: white;
}

.art2 {
  justify-content: flex-end;
  align-items: flex-start;
  background: white;
  padding: 0;
}

@media (max-width: 768px) {
  .contenedor {
    flex-direction: column;
    height: auto;
  }
  .art1,
  .art2 {
    flex: 1 1 100%;
    height: auto;
  }
  img {
    max-width: 100%;
  }
}
</style>
