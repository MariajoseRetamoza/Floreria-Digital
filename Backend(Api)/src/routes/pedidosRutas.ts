// pedidosRutas.ts

import express, { Request, Response } from "express";
import * as pedidosServices from "../services/pedidosServices";

// Activamos las rutas
const router = express.Router();

// GET todos los pedidos - http://localhost:3002/pedidos/
router.get("/", async (_req: Request, res: Response) => {
  const pedidos = await pedidosServices.obtienePedidos();
  res.send(pedidos);
});

// GET pedido por folio - http://localhost:3002/pedidos/1
router.get("/:folio", async (req: Request, res: Response) => {
  const pedido = await pedidosServices.encuentraPedido(
    Number(req.params.folio)
  );
  res.send(pedido);
});

// POST insertar pedido
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      ID_Cliente,
      ID_Arreglo,
      descripcion,
      fecha_hora_pedido,
      fecha_hora_entrega,
      precio_sugerido,
      ID_personal,
      entregado,
      pagado,
    } = req.body;

    const nuevo = await pedidosServices.agregaPedido({
      ID_Cliente,
      ID_Arreglo,
      descripcion,
      fecha_hora_pedido,
      fecha_hora_entrega,
      precio_sugerido,
      ID_personal,
      entregado,
      pagado,
    });

    res.send(nuevo);
  } catch (e) {
    res.status(400).send("No se puede agregar el pedido");
  }
});

// PUT modificar pedido
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      folio,
      ID_Cliente,
      ID_Arreglo,
      descripcion,
      fecha_hora_pedido,
      fecha_hora_entrega,
      precio_sugerido,
      ID_personal,
      entregado,
      pagado,
    } = req.body;

    const modificado = await pedidosServices.modificarPedido({
      folio,
      ID_Cliente,
      ID_Arreglo,
      descripcion,
      fecha_hora_pedido,
      fecha_hora_entrega,
      precio_sugerido,
      ID_personal,
      entregado,
      pagado,
    });

    res.send(modificado);
  } catch (e) {
    res.status(400).send("Error al modificar el pedido");
  }
});

// DELETE eliminar pedido
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { folio } = req.body;
    const eliminado = await pedidosServices.eliminaPedido(Number(folio));
    res.send(eliminado);
  } catch (e) {
    res.status(400).send("Error al eliminar el pedido");
  }
});

export default router;
