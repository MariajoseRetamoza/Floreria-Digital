import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error detectado:', err);

  // Si el error tiene un status, úsalo; si no, 500
  const statusCode = err.status || 500;

  // Devuelve un JSON claro con mensaje de error
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    // Para debugging (en producción puedes omitir)
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
