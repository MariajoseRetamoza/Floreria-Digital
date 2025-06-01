import { Request, Response } from 'express';

export const getAllPedidos = (req: Request, res: Response) => {
  res.send('Obtener listado de pedidos');
};

export const createPedido = (req: Request, res: Response) => {
  res.send('Crear nuevo pedido');
};

export const updatePedido = (req: Request, res: Response) => {
  res.send(`Actualizar pedido con ID ${req.params.id}`);
};

export const deletePedido = (req: Request, res: Response) => {
  res.send(`Eliminar pedido con ID ${req.params.id}`);
};
