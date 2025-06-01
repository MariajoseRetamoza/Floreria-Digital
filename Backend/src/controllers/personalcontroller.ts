import { Request, Response } from 'express';

export const getAllPersonal = (req: Request, res: Response) => {
  res.send('Obtener listado de personal');
};

export const createPersonal = (req: Request, res: Response) => {
  res.send('Crear nuevo personal');
};

export const updatePersonal = (req: Request, res: Response) => {
  res.send(`Actualizar personal con ID ${req.params.id}`);
};

export const deletePersonal = (req: Request, res: Response) => {
  res.send(`Eliminar personal con ID ${req.params.id}`);
};
