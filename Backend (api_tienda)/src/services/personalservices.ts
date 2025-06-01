import { db } from '../config/db';
import { Personal } from '../models/personal.model';

export const personalService = {
  getAll: async (): Promise<Personal[]> => {
    const [rows] = await db.query('SELECT * FROM personal');
    return rows as Personal[];
  },

  getById: async (id: number): Promise<Personal | null> => {
    const [rows] = await db.query('SELECT * FROM personal WHERE id = ?', [id]);
    const result = rows as Personal[];
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Personal, 'id'>): Promise<Personal> => {
    const { nombreCompleto, direccion, telefono, estatus } = data;
    const [result]: any = await db.query(
      'INSERT INTO personal (nombre, direccion, telefono, estatus) VALUES (?, ?, ?, ?)',
      [nombreCompleto, direccion, telefono, estatus]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id: number, data: Partial<Omit<Personal, 'id'>>): Promise<Personal | null> => {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE personal SET ${fields} WHERE id = ?`, [...values, id]);
    return personalService.getById(id);
  },

  delete: async (id: number): Promise<boolean> => {
    await db.query('DELETE FROM personal WHERE id = ?', [id]);
    return true;
  }
};
