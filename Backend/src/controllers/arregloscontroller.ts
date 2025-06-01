import { Request, Response } from 'express';

export const getAllArreglos = (req: Request, res: Response) => {
  res.send('Obtener listado de arreglos');
};

export const createArreglo = (req: Request, res: Response) => {
  res.send('Crear nuevo arreglo');
};

export const updateArreglo = (req: Request, res: Response) => {
  res.send(`Actualizar arreglo con ID ${req.params.id}`);
};

export const deleteArreglo = (req: Request, res: Response) => {
  res.send(`Eliminar arreglo con ID ${req.params.id}`);
};
