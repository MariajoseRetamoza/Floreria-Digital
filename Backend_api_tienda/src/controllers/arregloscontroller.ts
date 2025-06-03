import { Request, Response } from 'express';
import { arreglosService } from '../services/arreglosservice';

export const getAllArreglos = async (_req: Request, res: Response) => {
  const arreglos = await arreglosService.getAll();
  res.json(arreglos);
};

export const getArregloById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const arreglo = await arreglosService.getById(id);
  if (arreglo) {
    res.json(arreglo);
  } else {
    res.status(404).send('Arreglo no encontrado');
  }
};

export const createArreglo = async (req: Request, res: Response) => {
  const nuevo = await arreglosService.create(req.body);
  res.status(201).json(nuevo);
};

export const updateArreglo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const actualizado = await arreglosService.update(id, req.body);
  if (actualizado) {
    res.json(actualizado);
  } else {
    res.status(404).send('Arreglo no encontrado');
  }
};

export const deleteArreglo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const eliminado = await arreglosService.delete(id);
  res.status(204).send();
};
