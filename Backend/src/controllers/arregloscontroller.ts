import { Request, Response } from 'express';

export const getAllArreglos = (req: Request, res: Response) => {
  res.send('Obtener listado completo de arreglos florales, con opción por tipo.');
};

export const createArreglo = (req: Request, res: Response) => {
  // Campos: Descripción, Tipo de arreglo, Estatus
  res.send('Registrar nuevo arreglo floral.');
};

export const updateArreglo = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Editar información del arreglo floral con ID ${id}.`);
};

export const deleteArreglo = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Eliminar arreglo floral con ID ${id}.`);
};
