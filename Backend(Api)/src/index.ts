import express from "express";
import cors from "cors";

//creamos la aplicacion a traves del paquete express
//y llamamos a su constructor
const app = express();
//configurar rutas para el acceso apersonal
import personalRutas from "./routes/personalRutas";

//todo lo que se regresa al usuario es tipo JSON
app.use(express.json());
app.use(cors());
//Puerto para escuchar la peticion del frontend
const PUERTO = 3002;

//activar la ruta base
app.use("/api/personal", personalRutas);

// app.get("/hola", (_req, res) => {
//   let fecha = new Date().toString();
//   res.send(`Hola desde el navolato, la fecha es: ${fecha}`);
// });

//Encendemos el servidor y lo ponemos en escucha
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

// console.log("🟡 Iniciando servidor...");
// app.listen(PUERTO, () => {
//   console.log(`✅ Servidor escuchando en el puerto ${PUERTO}`);
// });
// console.log("🟢 app.listen ejecutado");
