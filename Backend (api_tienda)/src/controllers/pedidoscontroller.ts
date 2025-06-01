import { Request, Response } from 'express';
import { pedidosService } from '../services/pedidos.service';

export const getAllPedidos = async (_req: Request, res: Response) => {
  const pedidos = await pedidosService.getAll();
  res.json(pedidos);
};

export const getPedidoByFolio = async (req: Request, res: Response) => {
  const folio = parseInt(req.params.folio);
  const pedido = await pedidosService.getByFolio(folio);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).send('Pedido no encontrado');
  }
};

export const createPedido = async (req: Request, res: Response) => {
  const nuevo = await pedidosService.create(req.body);
  res.status(201).json(nuevo);
};

export const updatePedido = async (req: Request, res: Response) => {
  const folio = parseInt(req.params.folio);
  const actualizado = await pedidosService.update(folio, req.body);
  if (actualizado) {
    res.json(actualizado);
  } else {
    res.status(404).send('Pedido no encontrado');
  }
};

export const deletePedido = async (req: Request, res: Response) => {
  const folio = parseInt(req.params.folio);
  const eliminado = await pedidosService.delete(folio);
  res.status(204).send();
};
