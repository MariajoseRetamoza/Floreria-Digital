import { Request, Response } from 'express';

export const getAllClientes = (req: Request, res: Response) => {
  res.send('Obtener listado de clientes');
};

export const createCliente = (req: Request, res: Response) => {
  res.send('Crear nuevo cliente');
};

export const updateCliente = (req: Request, res: Response) => {
  res.send(`Actualizar cliente con ID ${req.params.id}`);
};

export const deleteCliente = (req: Request, res: Response) => {
  res.send(`Eliminar cliente con ID ${req.params.id}`);
};
