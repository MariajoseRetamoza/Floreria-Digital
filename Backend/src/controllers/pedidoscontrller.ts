import { Request, Response } from 'express';

export const getAllPedidos = (req: Request, res: Response) => {
  res.send('Obtener listado completo de pedidos.');
};

export const getPedidoByFilters = (req: Request, res: Response) => {
  // Filtros: estatus, fechas, entregado, pagado, pedidos por persona
  res.send('Obtener pedidos con filtros (estatus, fechas, entregado, pagado, por persona).');
};

export const createPedido = (req: Request, res: Response) => {
  // Campos: ID Cliente, ID Arreglo, Descripción, Fechas, Dirección, Precio sugerido, ID Personal, Entregado, Pagado
  res.send('Registrar nuevo pedido.');
};

export const updatePedido = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Editar información del pedido con Folio ${id}.`);
};

export const deletePedido = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Eliminar pedido con Folio ${id}.`);
};
