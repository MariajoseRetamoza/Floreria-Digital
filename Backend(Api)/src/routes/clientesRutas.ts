// clientesRutas.ts

import express, { Request, Response } from "express";
import * as clientesServices from "../services/clientesServices";

const router = express.Router();

// GET todos los clientes - http://localhost:3002/clientes/
router.get("/", async (_req: Request, res: Response) => {
  const clientes = await clientesServices.obtieneClientes();
  res.send(clientes);
});

// GET cliente por id - http://localhost:3002/clientes/1
router.get("/:ID_cliente", async (req: Request, res: Response) => {
  const ID_cliente = req.params.ID_cliente; 
  const cliente = await clientesServices.obtieneClientePorId(Number(ID_cliente));  
  res.send([cliente]); 
});


// POST insertar pedido
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Datos recibidos en backend:", req.body); // 👈 esto

    const {
      ID_Cliente,
      Nombre_completo,
      Direccion,
      Telefono
    } = req.body;

    const nuevo = await clientesServices.agregaCliente({
      ID_Cliente,
      Nombre_completo,
      Direccion,
      Telefono
    });
    res.send(nuevo);
  } catch (e) {
    console.error("Error al dar de lata cliente:", e); 
    res.status(400).send({ error: "No se puede dar de alta nuevo cliente" });
  }
});


// PUT modificar cliente
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      ID_Cliente,
      Nombre_completo,
      Direccion,
      Telefono
     
    } = req.body;

    const modificado = await clientesServices.modificarCliente({
      ID_Cliente,
      Nombre_completo,
      Direccion,
      Telefono
    });

    res.send(modificado);
  } catch (e) {
    res.status(400).send("Error al modificar el cliente");
  }
});


// DELETE eliminar cliente
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { ID_Cliente } = req.body;
    const eliminado = await clientesServices.eliminaCliente(Number(ID_Cliente));
    res.send(eliminado);
  } catch (e) {
    res.status(400).send("Error al eliminar el cliente");
  }
});

export default router;