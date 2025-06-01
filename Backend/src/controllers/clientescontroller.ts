import { Request, Response } from 'express';

export const getAllClientes = (req: Request, res: Response) => {
  res.send('Obtener listado completo de clientes.');
};

export const createCliente = (req: Request, res: Response) => {
  // Campos: Nombre completo, Dirección, Teléfono
  res.send('Registrar nuevo cliente.');
};

export const updateCliente = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Editar información del cliente con ID ${id}.`);
};

export const deleteCliente = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Eliminar cliente con ID ${id}.`);
};
