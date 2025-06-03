import { Request, Response } from 'express';
import { clientesService } from '../services/clientesservice';

export const getAllClientes = async (_req: Request, res: Response) => {
  const clientes = await clientesService.getAll();
  res.json(clientes);
};

export const getClienteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const cliente = await clientesService.getById(id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const nuevo = await clientesService.create(req.body);
  res.status(201).json(nuevo);
};

export const updateCliente = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const actualizado = await clientesService.update(id, req.body);
  if (actualizado) {
    res.json(actualizado);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const eliminado = await clientesService.delete(id);
  res.status(204).send();
};
