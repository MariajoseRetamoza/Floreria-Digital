import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateSchema = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({
      error: 'Error de validación',
      detalles: err.errors
    });
  }
};