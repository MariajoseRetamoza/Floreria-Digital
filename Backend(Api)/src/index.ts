import express from "express";
import cors from "cors";

// Creamos la aplicación con Express
const app = express();

// Importamos las rutas
import personalRutas from "./routes/personalRutas";
import pedidosRutas from "./routes/pedidosRutas";
import clientesRutas from "./routes/clientesRutas"; // ✅ Nueva ruta activa

// Middleware para parsear JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Puerto del servidor
const PUERTO = 3002;

// Activamos las rutas
app.use("/api/personal", personalRutas);
app.use("/api/pedidos", pedidosRutas);
app.use("/api/clientes", clientesRutas);

// Encendemos el servidor
app.listen(PUERTO, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PUERTO}`);
});
