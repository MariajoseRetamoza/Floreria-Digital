import { Request, Response } from 'express';

export const getAllPersonal = (req: Request, res: Response) => {
  res.send('Obtener listado completo del personal, con estatus y detalles.');
};

export const getPersonalById = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Obtener detalles del personal con ID ${id}, incluyendo sus pedidos.`);
};

export const createPersonal = (req: Request, res: Response) => {
  // Campos: Nombre completo, Dirección, Teléfono, Estatus
  res.send('Registrar nuevo personal.');
};

export const updatePersonal = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Editar información del personal con ID ${id}.`);
};

export const deletePersonal = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Realizar baja lógica del personal con ID ${id}.`);
};
