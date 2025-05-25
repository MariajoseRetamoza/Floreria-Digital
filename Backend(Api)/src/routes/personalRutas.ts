import express, { Request, Response } from "express";
import * as personalServices from "../services/personalServices";

//activamos las rutas
const router = express.Router();

//llamada a http://localhost:3002/personal/
router.get("/", async (_req: Request, res: Response) => {
  let personal = await personalServices.obtienePersonal();
  res.send(personal);
});

//llamada a http://localhost:3002/personal/1 <---numero de id del personal
router.get("/:id", async (req: Request, res: Response) => {
  let personal = await personalServices.encuentraPersonal(
    Number(req.params.id)
  );
  res.send(personal);
});

//llamada a http://localhost:3002/personal/1234567890 <---numero de telefono del personal
router.get("/telefono/:telefono", async (req: Request, res: Response) => {
  let personal = await personalServices.encuentraPersonalTelefono(
    req.params.telefono
  );
  res.send(personal);
});

//insertar datos
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, telefono, estatus } = req.body;
    const nuevo = await personalServices.agregaPersonal({
      nombre,
      direccion,
      telefono,
      estatus,
    });
    res.send(nuevo);
  } catch (e) {
    res.status(400).send("No se puede agregar el personal");
  }
});

//modificar datos
router.put("/", async (req: Request, res: Response) => {
  try {
    const { id, nombre, direccion, telefono, estatus } = req.body;
    const modificado = await personalServices.modificarPersonal({
      id,
      nombre,
      direccion,
      telefono,
      estatus,
    });
    res.send(modificado);
  } catch (e) {
    res.status(400).send("Error al modificar el personal");
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const eliminado = await personalServices.eliminaPersonal(Number(id));
    res.send(eliminado);
  } catch (e) {
    res.status(400).send("Error al eliminar el personal");
  }
});

export default router;

// router.get("/debug", async (_req: Request, res: Response) => {
//   try {
//     const personal = await personalServices.obtienePersonal();
//     console.log("Resultado desde base de datos:", personal);
//     res.json(personal);
//   } catch (error) {
//     console.error("Error en /debug:", error);
//     res.status(500).send("Error interno");
//   }
// });
